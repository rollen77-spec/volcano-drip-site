#!/usr/bin/env node
/**
 * One-time sync: fetch Google reviews and print JSON for pasting into src/data/reviews.js
 *
 * Usage:
 *   GOOGLE_PLACES_API_KEY=your_key node scripts/sync-google-reviews.mjs
 *
 * Optional:
 *   GOOGLE_PLACE_ID=ChIJ...
 *   GOOGLE_PLACE_QUERY="Volcano Drip Coffee"
 */

const apiKey = process.env.GOOGLE_PLACES_API_KEY;
const placeIdEnv = process.env.GOOGLE_PLACE_ID;
const query = process.env.GOOGLE_PLACE_QUERY || 'Volcano Drip Coffee';

if (!apiKey) {
  console.error('Set GOOGLE_PLACES_API_KEY to run this script.');
  process.exit(1);
}

function slugify(value) {
  return String(value || 'review')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
}

async function resolvePlaceId() {
  if (placeIdEnv) return placeIdEnv;

  const params = new URLSearchParams({
    input: query,
    inputtype: 'textquery',
    fields: 'place_id,name',
    key: apiKey,
  });

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?${params}`,
  );
  const data = await res.json();
  if (data.status !== 'OK' || !data.candidates?.[0]?.place_id) {
    throw new Error(data.error_message || data.status || 'Place not found');
  }

  console.error(`Resolved place: ${data.candidates[0].name} (${data.candidates[0].place_id})`);
  return data.candidates[0].place_id;
}

async function main() {
  const placeId = await resolvePlaceId();
  const params = new URLSearchParams({
    place_id: placeId,
    fields: 'reviews,rating,user_ratings_total',
    reviews_sort: 'newest',
    key: apiKey,
  });

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?${params}`,
  );
  const data = await res.json();
  if (data.status !== 'OK') {
    throw new Error(data.error_message || data.status || 'Failed to load reviews');
  }

  const reviews = (data.result?.reviews || [])
    .filter((review) => review?.text?.trim())
    .map((review, index) => ({
      id: `google-${slugify(review.author_name)}-${index}`,
      name: review.author_name || 'Google reviewer',
      location: 'Google review',
      content: review.text.trim(),
      rating: Number(review.rating) || 5,
      source: 'google',
    }));

  console.log(JSON.stringify(reviews, null, 2));
  console.error(`\n${reviews.length} reviews (${data.result?.user_ratings_total ?? '?'} total on Google)`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
