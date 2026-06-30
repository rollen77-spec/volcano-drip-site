/**
 * Site reviews shown in the home page testimonials section.
 *
 * Live Google reviews: when GOOGLE_PLACES_API_KEY is set on Vercel, the homepage
 * fetches the newest reviews from `/api/google-reviews` and uses those instead of
 * the static list below.
 *
 * Manual fallback: copy name, star rating, and text from your Maps listing,
 * then append an object to `googleReviews` (set source: 'google').
 * Curated customer quotes stay in `curatedReviews`.
 */

/** @typedef {'curated' | 'google'} ReviewSource */

/**
 * @typedef {Object} Review
 * @property {string} id
 * @property {string} name
 * @property {string} [location] — city or region
 * @property {string} [image] — optional avatar URL
 * @property {string} content
 * @property {number} rating — 1–5
 * @property {ReviewSource} source
 */

/** @type {Review[]} */
export const curatedReviews = [
  {
    id: 'santiago',
    name: 'Santiago C.',
    location: 'Mississauga',
    content:
      "I've tried a lot of small-batch coffees, but this one actually surprised me. The flavor is smooth but still bold, and it doesn't have that bitter aftertaste. You can tell there's real care behind it.",
    rating: 5,
    source: 'curated',
  },
  {
    id: 'siva',
    name: 'Siva.',
    location: 'Vancouver',
    content:
      "I signed up for the newsletter just out of curiosity, but ended up ordering a bag—and now I'm hooked. It's become part of my morning routine.",
    rating: 5,
    source: 'curated',
  },
  {
    id: 'hailey',
    name: 'Hailey S.',
    location: 'Toronto',
    content:
      "What stood out to me was the balance. It's rich without being overpowering. Definitely one of the better coffees I've had in a while.",
    rating: 5,
    source: 'curated',
  },
];

/**
 * Paste Google reviews here when you want them on the homepage grid.
 * @type {Review[]}
 */
export const googleReviews = [
  {
    id: 'google-sabrina-musilli',
    name: 'Sabrina Musilli',
    location: 'Google review',
    content:
      'Found my new morning coffee. Super fast shipping. Arrived in 2 days and got to enjoy it on my weekend morning. Ordered the Primera Luz. It was smooth with low acidity. An easy drinking coffee. A coffee that you can drink more than one cup for breakfast. Will order again.',
    rating: 5,
    source: 'google',
  },
  {
    id: 'google-samantha-andrade',
    name: 'Samantha Andrade',
    location: 'Google review',
    content:
      "Absolutely fantastic coffee. Whether you like dark, medium, or light roast, they have something for everyone! This is that cup of coffee that doesn't need any sugar or milk. It's perfect on its own.",
    rating: 5,
    source: 'google',
  },
  {
    id: 'google-cheryl-castator',
    name: 'Cheryl Castator',
    location: 'Google review',
    content:
      "We purchased the Primera Luz blend and absolutely loved it — delicious and perfectly balanced, with a smooth, rich flavour that tastes exceptionally well-crafted. We'll definitely buy more!!",
    rating: 5,
    source: 'google',
  },
  {
    id: 'google-anita',
    name: 'Anita',
    location: 'Google review',
    content:
      "I ordered two bags of Volcano Drip Coffee's Inca Ascent Percolator Medium Roast—one for home and one to keep at work. The online ordering process was simple and smooth, and my coffee arrived quickly. At work, my colleagues really enjoyed the coffee too. Overall, a great experience from start to finish. I'd definitely order again and recommend giving them a try.",
    rating: 5,
    source: 'google',
  },
  {
    id: 'google-a-l',
    name: 'A L',
    location: 'Google review',
    content:
      "Honestly one of the best coffees I've ever had. It is now our staple coffee for the family. Super fresh and rich and bold flavours. Love it!!!",
    rating: 5,
    source: 'google',
  },
  {
    id: 'google-eejenee',
    name: 'eejenee',
    location: 'Google review',
    content: 'Best coffee in town!! Would recommend it to all coffee lovers',
    rating: 5,
    source: 'google',
  },
  {
    id: 'google-trinity',
    name: 'Trinity',
    location: 'Google review',
    content: 'Delicious coffee! 🙌',
    rating: 5,
    source: 'google',
  },
];

/** Interleave curated + Google for balanced rotating groups. */
export function mixDisplayReviews(curated = curatedReviews, google = googleReviews) {
  const mixed = [];
  const max = Math.max(curated.length, google.length);
  for (let i = 0; i < max; i += 1) {
    if (i < curated.length) mixed.push(curated[i]);
    if (i < google.length) mixed.push(google[i]);
  }
  return mixed;
}

export function getAllDisplayReviews() {
  return mixDisplayReviews();
}
