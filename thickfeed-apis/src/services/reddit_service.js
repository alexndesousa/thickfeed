const fetch = require('node-fetch');
const { setPlatformOffset } = require('../db/redis_db');

/**
 * Retrieve hot posts in the given subreddit
 * @param {string} subreddit - The subreddit to retrieve hot posts from
 * @param {string} after - Used for retrieving the next page
 * @param {number} limit - The maximum number of posts to retrieve
 * @param {string} countryCode - The country to retrieve popular posts from
 * @returns An Array containing stringified JSON of post information
 */
const getPopularRedditPosts = async (subreddit = 'popular', after = '', limit = 10, countryCode = 'GLOBAL') => {
  if (after === null) {
    after = '';
  }
  const baseUrl = `https://www.reddit.com/r/${subreddit}/hot.json`;
  const parameterisedUrl = `${baseUrl}?after=${after}&limit=${limit}&geo_filter=${countryCode}`;

  const popularPosts = await fetch(parameterisedUrl);

  const popularPostsJSON = await popularPosts.json();

  await setPlatformOffset('reddit', popularPostsJSON.data.after);

  const posts = popularPostsJSON.data.children;

  const postsInfo = await posts.map((post) => (JSON.stringify({
    permalink: post.data.permalink,
    title: post.title,
    subreddit: post.data.subreddit_name_prefixed,
  })));

  return postsInfo;
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
  getPopularRedditPosts,
  createEmbeddedReddit,
};
