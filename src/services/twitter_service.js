const fetch = require('node-fetch');

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
 * Retrieve the WOEID for the given country code
 * @param {string} countryCode - country code to find a WOEID for
 * @returns A promised integer
 */
const getWOEID = (countryCode = null) => {
  // if no countryCode is provided we'll provide the worldwide woeid
  if (countryCode === null) {
    return 1;
  }

  const baseUrl = 'https://api.twitter.com/1.1/trends/available.json';
  const bearerToken = process.env.TWITTER_BEARER_TOKEN;
  const options = {
    headers: { Authorization: `Bearer ${bearerToken}` },
  };

  return fetch(baseUrl, options)
    .then((res) => res.json())
    .then((body) => {
      for (i = 0; i < body.length; i++) {
        if (body[i].countryCode == countryCode) {
          console.log(body[i].parentid);
          return body[i].parentid;
        }
      }
    });
};

/**
 * Retrieve tweets that match the given search term
 * @param {string} searchTerm - What we want to search for, will typically be a hashtag
 * @param {string} type - The type of results we want to show; popular or recent or mixed
 * @param {number} limit - The max number of tweets to retrieve
 * @returns A promised JSON response
 */
const searchTweets = (searchTerm, type = 'popular', limit = 10) => {
  const encodedSearchTerm = encodeURI(searchTerm);

  const baseUrl = 'https://api.twitter.com/1.1/search/tweets.json';
  const parameterisedUrl = `${baseUrl}?q=${encodedSearchTerm}&result_type=${type}&count=${limit}`;
  const bearerToken = process.env.TWITTER_BEARER_TOKEN;
  const options = {
    headers: { Authorization: `Bearer ${bearerToken}` },
  };

  return fetch(parameterisedUrl, options)
    .then((res) => res.json());
};

module.exports = {
  getTrendingTopics,
  getWOEID,
  searchTweets,
};
