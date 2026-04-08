/**
 * Vercel Serverless: creates newsletter signups in your ESP or automation tool.
 * Configure ONE of: NEWSLETTER_WEBHOOK_URL | Mailchimp | Brevo (see .env.example).
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

async function sendBrevo({ email, name }, apiKey, listIds) {
  const body = {
    email,
    attributes: name ? { FIRSTNAME: name } : {},
    updateEnabled: true,
    listIds: listIds.length ? listIds : undefined,
  };
  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: { 'api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (data.code === 'duplicate_parameter') return;
    throw new Error(data.message || `Brevo ${res.status}`);
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

  const { email: rawEmail, name: rawName, consent } = req.body || {};
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

  const payload = {
    email,
    name,
    source: 'volcano-drip-offers',
    subscribedAt: new Date().toISOString(),
  };

  try {
    if (webhookUrl) {
      await sendWebhook(webhookUrl, payload);
    } else if (mcKey && mcAudience) {
      await sendMailchimp({ email, name }, mcKey, mcAudience);
    } else if (brevoKey) {
      await sendBrevo({ email, name }, brevoKey, brevoLists);
    } else {
      return res.status(501).json({
        error:
          'Newsletter backend not configured. Set NEWSLETTER_WEBHOOK_URL, or Mailchimp, or Brevo env vars in Vercel.',
      });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('[subscribe]', e.message);
    return res.status(500).json({ error: 'Subscribe failed. Please try again later.' });
  }
}
