/**
 * Vercel Serverless: fetch Google reviews for the Volcano Drip Maps listing.
 *
 * Env (Vercel → Project → Environment Variables):
 *   GOOGLE_PLACES_API_KEY — Places API key with Place Details enabled
 *   GOOGLE_PLACE_ID — optional; resolved via text search if omitted
 *   GOOGLE_PLACE_QUERY — default "Volcano Drip Coffee"
 */

const DEFAULT_QUERY = 'Volcano Drip Coffee';
const CACHE_SECONDS = 60 * 60 * 6; // 6 hours

async function resolvePlaceId(apiKey, placeId, query) {
  if (placeId) return placeId;

  const params = new URLSearchParams({
    input: query,
    inputtype: 'textquery',
    fields: 'place_id',
    key: apiKey,
  });

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?${params}`,
  );
  const data = await res.json().catch(() => ({}));

  if (!res.ok || data.status !== 'OK' || !data.candidates?.[0]?.place_id) {
    throw new Error(data.error_message || data.status || 'Place not found');
  }

  return data.candidates[0].place_id;
}

function slugify(value) {
  return String(value || 'review')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
}

function normalizeReviews(reviews = []) {
  return reviews
    .filter((review) => review?.text?.trim())
    .map((review, index) => ({
      id: `google-${slugify(review.author_name)}-${index}`,
      name: review.author_name || 'Google reviewer',
      location: 'Google review',
      content: review.text.trim(),
      rating: Number(review.rating) || 5,
      source: 'google',
      image: review.profile_photo_url || undefined,
      relativeTime: review.relative_time_description || undefined,
    }));
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', `s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS}`);

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: 'Google Places API is not configured',
      reviews: [],
    });
  }

  try {
    const query = process.env.GOOGLE_PLACE_QUERY || DEFAULT_QUERY;
    const placeId = await resolvePlaceId(apiKey, process.env.GOOGLE_PLACE_ID, query);

    const params = new URLSearchParams({
      place_id: placeId,
      fields: 'reviews,rating,user_ratings_total',
      reviews_sort: 'newest',
      key: apiKey,
    });

    const detailsRes = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?${params}`,
    );
    const details = await detailsRes.json().catch(() => ({}));

    if (!detailsRes.ok || details.status !== 'OK') {
      throw new Error(details.error_message || details.status || 'Failed to load reviews');
    }

    const reviews = normalizeReviews(details.result?.reviews);

    return res.status(200).json({
      placeId,
      rating: details.result?.rating ?? null,
      userRatingCount: details.result?.user_ratings_total ?? null,
      reviews,
      syncedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('google-reviews:', error);
    return res.status(500).json({
      error: error.message || 'Failed to sync Google reviews',
      reviews: [],
    });
  }
}
