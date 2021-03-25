const fetch = require('node-fetch');
const { setPlatformOffset } = require('../db/redis_db');
const { getWOEID } = require('../db/postgres_db');

/**
 * Retrieve the top trending hashtags in the given region
 * @param {number} countryWOEID - Where On Earth ID to determine region to search in
 * @returns A promised JSON response
 */
const getTrendingTopics = (countryWOEID = 1) => {
  const baseUrl = 'https://api.twitter.com/1.1/trends/place.json';
  const parameterisedUrl = `${baseUrl}?id=${countryWOEID}`;
  const bearerToken = process.env.TWITTER_BEARER_TOKEN;
  const options = {
    headers: { Authorization: `Bearer ${bearerToken}` },
  };

  return fetch(parameterisedUrl, options)
    .then((res) => res.json());
};

/**
 * Retrieve tweets that match the given search term
 * @param {string} searchTerm - What we want to search for, will typically be a hashtag
 * @param {string} type - The type of results we want to show; popular or recent or mixed
 * @param {number} limit - The max number of tweets to retrieve
 * @returns A promised JSON response
 */
const searchTweets = (searchTerm, type = 'popular', limit = 10, maxId = 0, language = 'en') => {
  if (maxId === null) {
    maxId = 0;
  }
  const encodedSearchTerm = encodeURIComponent(searchTerm);

  const baseUrl = 'https://api.twitter.com/1.1/search/tweets.json';
  const parameterisedUrl = `${baseUrl}?max_id=${maxId}&q=${encodedSearchTerm}&result_type=${type}&count=${limit}&lang=${language}`;
  const bearerToken = process.env.TWITTER_BEARER_TOKEN;
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  return fetch(parameterisedUrl, options)
    .then((res) => res.json());
};

/**
 * Retrieves popular tweets with the given offset and limit for the given country
 * @param {number} offset - The amount to offset results by
 * @param {number} limit - The maximum amount of tweets to retrieve
 * @param {string} countryCode - The country for which we wish to retrieve popular tweets from
 * @returns An Array containing stringified JSON of tweet information
 */
const getTrendingTweets = async (offset = 0, limit = 30, countryCode = 'GB') => {
  try {
    const WOEID = await getWOEID(countryCode);

    const trendingTopics = await getTrendingTopics(WOEID);

    const tweets = await searchTweets(trendingTopics[0].trends[0].name, 'popular', limit, offset);
    const regexpMaxId = /\?max_id=(\d+)&/;
    const match = regexpMaxId.exec(tweets.search_metadata.next_results);

    await setPlatformOffset('twitter', match[1]);

    const { statuses } = tweets;

    const tweetInfo = await statuses.map((status) => (JSON.stringify({
      screen_name: status.user.screen_name,
      id: status.id,
    })));

    return tweetInfo;
  } catch (error) {
    return [];
  }
};

/**
 * Retrieve the embeddable HTML for the tweet
 * @param {JSON} tweet - json containing all the information pertaining to a tweet
 * @param {number} maxWidth - The maximum width of the desired embedded tweet
 * @param {string} theme - The theme of the tweet; can either be 'light' or 'dark'
 * @returns A promised string containing HTML
 */
const createEmbeddedTwitter = (tweet, maxWidth = 300, theme = 'light') => {
  const sourceTweet = encodeURIComponent(`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`);

  const baseUrl = 'https://publish.twitter.com/oembed';
  const parameterisedUrl = `${baseUrl}?url=${sourceTweet}&maxwidth=${maxWidth}&theme=${theme}`;

  return fetch(parameterisedUrl)
    .then((res) => res.json())
    .then((body) => body.html);
};

module.exports = {
  getTrendingTopics,
  searchTweets,
  getTrendingTweets,
  createEmbeddedTwitter,
};
