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
    title: post.data.title,
    selftext: post.data.selftext,
    subredditNamePrefixed: post.data.subreddit_name_prefixed,
    author: post.data.author,
    createdUtc: post.data.created_utc,
    ups: post.data.ups,
    numComments: post.data.num_comments,
    urlOverridenByDest: post.data.url_overridden_by_dest || '',
    imageWidth: post.data.preview?.images[0].source.width || 0,
    imageHeight: post.data.preview?.images[0].source.height || 0,
    postHint: post.data.post_hint || '',
    permalink: post.data.permalink,
  })));

  return postsInfo;
};

module.exports = {
  getPopularRedditPosts,
};
