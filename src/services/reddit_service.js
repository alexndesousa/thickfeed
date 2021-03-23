const fetch = require('node-fetch');

/**
 * Retrieve hot posts in the given subreddit
 * @param {string} subreddit - The subreddit to retrieve hot posts from
 * @param {string} after - Used for retrieving the next page
 * @param {number} limit - The maximum number of posts to retrieve
 * @returns A promised JSON response
 */
const getHot = (subreddit = 'popular', after = '', limit = 10, countryCode = 'GLOBAL') => {
  if (after === null) {
    after = '';
  }
  const baseUrl = `https://www.reddit.com/r/${subreddit}/hot.json`;
  const parameterisedUrl = `${baseUrl}?after=${after}&limit=${limit}&geo_filter=${countryCode}`;

  return fetch(parameterisedUrl)
    .then((res) => res.json());
};

/**
 * Converts a t3 (what reddit calls a posts data in the response body) into an embeddable link
 * @param {json} t3 - The information relating to a specific post
 * @returns A string containing the embeddable HTML
 */
const createEmbeddedReddit = (t3) => {
  const baseUrl = 'https://www.reddit.com';
  const postLink = `${baseUrl}${t3.data.permalink}`;
  const postTitle = t3.title;
  const prefixedSubreddit = t3.data.subreddit_name_prefixed;
  const subredditLink = `${baseUrl}${prefixedSubreddit}`;
  const embeddedPost = `<blockquote class="reddit-card"><a href="${postLink}">${postTitle}</a> from <a href="${subredditLink}">${prefixedSubreddit}</a></blockquote><script async src="//embed.redditmedia.com/widgets/platform.js" charset="UTF-8"></script>`;

  return embeddedPost;
};

module.exports = {
  getHot,
  createEmbeddedReddit,
};
