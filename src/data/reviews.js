/**
 * Site reviews shown in the home page rotating banner.
 *
 * To add a Google review: copy name, star rating, and text from your Maps listing,
 * then append an object to `googleReviews` below (set source: 'google').
 * Curated customer quotes stay in `curatedReviews`.
 */

/** @typedef {'curated' | 'google'} ReviewSource */

/**
 * @typedef {Object} Review
 * @property {string} id
 * @property {string} name
 * @property {string} [location] — city or "Google review"
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
 * Paste Google reviews here when you want them on the homepage carousel.
 * @type {Review[]}
 */
export const googleReviews = [
  // Example:
  // {
  //   id: 'google-2025-01',
  //   name: 'Alex M.',
  //   location: 'Google review',
  //   content: 'Great coffee and fast shipping!',
  //   rating: 5,
  //   source: 'google',
  // },
];

export function getAllDisplayReviews() {
  return [...curatedReviews, ...googleReviews];
}
