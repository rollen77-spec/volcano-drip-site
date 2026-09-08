/**
 * Vercel Serverless: creates newsletter signups in your ESP or automation tool.
 * Prefer Brevo when BREVO_API_KEY is set (see .env.example).
 * Otherwise: NEWSLETTER_WEBHOOK_URL | Mailchimp.
 */

async function postJson(url, body, headers = {}) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
}

async function sendWebhook(url, payload) {
  await postJson(url, payload);
}

async function sendMailchimp({ email, name }, apiKey, audienceId) {
  const dc = apiKey.includes('-') ? apiKey.split('-').pop() : '';
  if (!dc) throw new Error('Invalid Mailchimp API key format');

  const token = Buffer.from(`anystring:${apiKey}`).toString('base64');
  const res = await fetch(
    `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        merge_fields: { FNAME: name || '' },
      }),
    }
  );

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (data.title === 'Member Exists') return;
    throw new Error(data.detail || data.title || `Mailchimp ${res.status}`);
  }
}

function isBenignBrevoError(data) {
  const code = String(data?.code || '');
  const message = String(data?.message || '').toLowerCase();
  return (
    code === 'duplicate_parameter' ||
    message.includes('already exists') ||
    message.includes('already in list') ||
    message.includes('contact already in list')
  );
}

/**
 * Create/update contact, then ensure they land on the automation list(s).
 * List membership is what typically starts Brevo automations.
 * @see https://developers.brevo.com/reference/create-contact
 * @see https://developers.brevo.com/reference/add-contact-to-list
 */
async function sendBrevo({ email, name, source }, apiKey, listIds) {
  if (!listIds.length) {
    throw new Error(
      'BREVO_LIST_IDS is missing or invalid. Set it to the Brevo list that starts your newsletter automation (e.g. 2).'
    );
  }

  const createRes = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: { 'api-key': apiKey, 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      email,
      // Only use built-in FIRSTNAME — custom attributes (e.g. SOURCE) error if not defined in Brevo.
      attributes: name ? { FIRSTNAME: name } : {},
      listIds,
      updateEnabled: true,
      emailBlacklisted: false,
    }),
  });
  const createData = await createRes.json().catch(() => ({}));
  if (!createRes.ok && !isBenignBrevoError(createData)) {
    throw new Error(createData.message || createData.code || `Brevo create ${createRes.status}`);
  }

  // Explicit list add — reliable for existing contacts (updateEnabled alone can skip list joins).
  for (const listId of listIds) {
    const addRes = await fetch(`https://api.brevo.com/v3/contacts/lists/${listId}/contacts/add`, {
      method: 'POST',
      headers: { 'api-key': apiKey, 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ emails: [email] }),
    });
    const addData = await addRes.json().catch(() => ({}));
    if (!addRes.ok && !isBenignBrevoError(addData)) {
      // 400 with empty failure list sometimes means already on list — treat soft failures carefully.
      const failed = Array.isArray(addData?.failure) ? addData.failure : [];
      const onlyAlready =
        failed.length > 0 &&
        failed.every((f) => /already|exist/i.test(String(f?.message || f || '')));
      if (!onlyAlready) {
        throw new Error(addData.message || addData.code || `Brevo list ${listId} add ${addRes.status}`);
      }
    }
  }
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email: rawEmail, name: rawName, consent, source: rawSource } = req.body || {};
  const email = String(rawEmail || '').trim().toLowerCase();
  const name = String(rawName || '').trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email is required' });
  }
  if (!name) {
    return res.status(400).json({ error: 'First name is required' });
  }
  if (consent !== true) {
    return res.status(400).json({ error: 'Consent is required' });
  }

  const webhookUrl = process.env.NEWSLETTER_WEBHOOK_URL;
  const mcKey = process.env.MAILCHIMP_API_KEY;
  const mcAudience = process.env.MAILCHIMP_AUDIENCE_ID;
  const brevoKey = process.env.BREVO_API_KEY;
  const brevoLists = (process.env.BREVO_LIST_IDS || '')
    .split(',')
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !Number.isNaN(n));

  const source =
    typeof rawSource === 'string' && rawSource.trim() ? rawSource.trim() : 'volcano-drip-offers';

  const payload = {
    email,
    name,
    source,
    subscribedAt: new Date().toISOString(),
  };

  try {
    let provider = 'none';
    // Brevo first when configured — avoids a stale Zapier webhook blocking the real ESP.
    if (brevoKey) {
      provider = 'brevo';
      await sendBrevo({ email, name, source }, brevoKey, brevoLists);
    } else if (webhookUrl) {
      provider = 'webhook';
      await sendWebhook(webhookUrl, payload);
    } else if (mcKey && mcAudience) {
      provider = 'mailchimp';
      await sendMailchimp({ email, name }, mcKey, mcAudience);
    } else {
      return res.status(501).json({
        error:
          'Newsletter backend not configured. Set BREVO_API_KEY and BREVO_LIST_IDS in Vercel (see .env.example).',
      });
    }
    console.log('[subscribe] ok', {
      provider,
      source,
      listIds: provider === 'brevo' ? brevoLists : undefined,
      emailDomain: email.split('@')[1] || '',
    });
    return res.status(200).json({ ok: true });
  } catch (e) {
    const provider = brevoKey
      ? 'brevo'
      : webhookUrl
        ? 'webhook'
        : mcKey && mcAudience
          ? 'mailchimp'
          : 'unknown';
    console.error('[subscribe] failed', {
      provider,
      message: e?.message || String(e),
      source,
      listIds: provider === 'brevo' ? brevoLists : undefined,
    });
    const rawDetail = String(e?.message || e || '').slice(0, 300);
    // Safe to return: Brevo messages are like "Key not found" / "List ID does not exist" (no secrets).
    return res.status(500).json({
      error: 'Subscribe failed. Please try again later.',
      code: 'ESP_ERROR',
      provider,
      detail: rawDetail,
      listIds: provider === 'brevo' ? brevoLists : undefined,
    });
  }
}
