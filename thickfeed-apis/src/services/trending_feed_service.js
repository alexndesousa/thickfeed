require('dotenv').config({ path: '../../.env' });

const { getPopularRedditPosts } = require('./reddit_service');
const { getNewSpotifyReleases } = require('./spotify_service');
const { getTrendingTweets } = require('./twitter_service');
const { getTrendingYoutubeVideos } = require('./youtube_service');
const { getBBCNewsFeed } = require('./bbc_service');
const { addElementsToFeedList } = require('../db/redis_db');

/**
 * Retrieves data for all of the popular/trending posts on each of the provided platforms and stores
 * each platforms data separately within redis
 * @param {Object} options - Contains information on desired platforms and pagination/offsets
 * @param {boolean} options.spotify_enabled - True if we want to receive spotify songs/albums
 * @param {number} options.spotify_offset - Used to retrieve the next page of songs/albums
 * @param {boolean} options.twitter_enabled - True if we want to receive tweets
 * @param {number} options.twitter_offset - Used to retrieve the next page of tweets
 * @param {boolean} options.reddit_enabled - True if we want to receive reddit posts
 * @param {string} options.reddit_offset - Used to retrieve the next page of reddit posts
 * @param {boolean} options.youtube_enabled - True if we want to receive youtube videos
 * @param {string} options.youtube_offset - Used to retrieve the next page of youtube videos
 * @param {boolean} options.bbc_enabled - True if we want to receive bbc articles
 * @param {string} options.bbc_offset - Used to retrieve the next page of bbc articles
 * @param {string} options.country_code - Used to retrieve results for the given country
 */
const generateTrendingFeed = async (options) => {
  // I need to have varying frequencies, e.g., spotify should show up every 50 scrolls for example
  let spotifySongs = [];
  let twitterTweets = [];
  let redditPosts = [];
  let youtubeVideos = [];
  let bbcArticles = [];

  if (options.spotify_enabled) {
    spotifySongs = getNewSpotifyReleases(options.country_code, options.spotify_offset, 10);
  }
  if (options.twitter_enabled) {
    twitterTweets = getTrendingTweets(options.twitter_offset, 30, options.country_code);
  }
  if (options.reddit_enabled) {
    redditPosts = getPopularRedditPosts('popular', options.reddit_offset, 30);
  }
  if (options.youtube_enabled) {
    youtubeVideos = getTrendingYoutubeVideos(options.country_code, options.youtube_offset, 10);
  }
  if (options.bbc_enabled) {
    bbcArticles = getBBCNewsFeed('top');
  }

  // await all of the promised platform feeds
  [spotifySongs, twitterTweets, redditPosts, youtubeVideos, bbcArticles] = await
  Promise.all([spotifySongs, twitterTweets, redditPosts, youtubeVideos, bbcArticles]);

  // store the feeds in redis
  await addElementsToFeedList('spotify', spotifySongs);
  await addElementsToFeedList('twitter', twitterTweets);
  await addElementsToFeedList('reddit', redditPosts);
  await addElementsToFeedList('youtube', youtubeVideos);
  await addElementsToFeedList('bbc', bbcArticles);
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
// generateTrendingFeed(option).then((body) => console.log(body));

module.exports = {
  generateTrendingFeed,
};
