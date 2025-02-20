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
  const parameterisedUrl = `${baseUrl}?max_id=${maxId}&q=${encodedSearchTerm}&result_type=${type}&count=${limit}&lang=${language}&tweet_mode=extended`;
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
 * Retrieves embedded popular tweets with the given offset and limit for the given country
 * @param {number} offset - The amount to offset results by
 * @param {number} limit - The maximum amount of tweets to retrieve
 * @param {string} countryCode - The country for which we wish to retrieve popular tweets from
 * @returns An Array containing stringified embeddable tweets
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

    const tweetInfo = await statuses.map((status) => JSON.stringify({
      id: status.id_str,
      imageWidth: status.entities.media[0].sizes.large.w || 0,
      imageHeight: status.entities.media[0].sizes.large.h || 0,
    }));

    // const embeddedTweets = await Promise.all(tweetInfo);

    return tweetInfo;
  } catch (error) {
    return [];
  }
};

module.exports = {
  getTrendingTopics,
  searchTweets,
  getTrendingTweets,
};
