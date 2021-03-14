require('dotenv').config({ path: '../../.env' });

const { getHot, createEmbeddedReddit } = require('./reddit_service');
const { getAccessToken, getNewReleases, createEmbeddedSpotify } = require('./spotify_service');
const {
  getWOEID, getTrendingTopics, searchTweets, createEmbeddedTwitter,
} = require('./twitter_service');
const { getTrendingVideos, createEmbeddedYoutube } = require('./youtube_service');

/**
 * Retrieves embeddable HTML for all of the popular/trending posts on each of the provided platforms
 * @param {Object} options - Contains information on desired platforms and pagination/offsets
 * @param {boolean} options.spotify_enabled - True if we want to receive spotify songs/albums
 * @param {number} options.spotify_offset - Used to retrieve the next page of songs/albums
 * @param {boolean} options.twitter_enabled - True if we want to receive tweets
 * @param {number} options.twitter_offset - Used to retrieve the next page of tweets
 * @param {boolean} options.reddit_enabled - True if we want to receive reddit posts
 * @param {string} options.reddit_offset - Used to retrieve the next page of reddit posts
 * @param {boolean} options.youtube_enabled - True if we want to receive youtube videos
 * @param {string} options.youtube_offset - Used to retrieve the next page of youtube videos
 * @param {string} options.country_code - Used to retrieve results for the given country
 * @returns An array containing the embeddable HTML for each of the provided platforms
 */
const getTrendingFeed = (options) => {
  // I need to have varying frequencies, e.g., spotify should show up every 50 scrolls for example
  const body = [];
  // placeholder for the database
  const pages = {
    spotify: 0,
    twitter: 0,
    reddit: '',
    youtube: '',
  };
  if (options.spotify_enabled) {
    getAccessToken()
      .then((token) => getNewReleases(options.country_code, options.spotify_offset, 2, token))
      .then((res) => {
        pages.spotify += parseInt(res.albums.limit, 10);
        return res.albums.items;
      })
      .then((albums) => albums.map((item) => createEmbeddedSpotify(item)))
      .then((embedded) => body.push(embedded));
  }
  if (options.twitter_enabled) {
    // getWOEID should be replaced with db calls
    getWOEID(options.country_code)
      .then((WOEID) => getTrendingTopics(WOEID))
      .then((topics) => topics[0].trends[0].name)
      .then((searchTerm) => searchTweets(searchTerm, 'popular', 30, options.twitter_offset))
      .then((res) => {
        // using regular expressions to extract the max_id (used for pagination) from the response
        const regexpMaxId = /\?max_id=(\d+)&/;
        const match = regexpMaxId.exec(res.search_metadata.next_results);
        [pages.twitter] = match;
        return res.statuses;
      })
      .then((tweets) => tweets.map((item) => createEmbeddedTwitter(item)))
      .then((embedded) => body.push(embedded));
  }
  if (options.reddit_enabled) {
    getHot('popular', options.reddit_offset, 20, options.country_code)
      .then((res) => {
        pages.reddit = res.data.after;
        return res.data.children;
      })
      .then((posts) => posts.map((item) => createEmbeddedReddit(item)))
      .then((embedded) => body.push(embedded));
  }
  if (options.youtube_enabled) {
    getTrendingVideos(options.country_code, options.youtube_offset, 3)
      .then((res) => {
        pages.youtube = res.nextPageToken;
        return res.items;
      })
      .then((videos) => videos.map((item) => createEmbeddedYoutube(item)))
      .then((embedded) => body.push(embedded));
  }

  return body;
};

// const option = {
//   spotify_enabled: true,
//   spotify_offset: 0,
//   twitter_enabled: true,
//   twitter_offset: 0,
//   reddit_enabled: true,
//   reddit_offset: '',
//   youtube_enabled: true,
//   youtube_offset: '',
//   country_code: 'GB',
// };

module.exports = {
  getTrendingFeed,
};
