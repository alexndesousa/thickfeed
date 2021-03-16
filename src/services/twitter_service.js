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
      for (let i = 0; i < body.length; i += 1) {
        if (body[i].countryCode === countryCode) {
          return body[i].parentid;
        }
      }
      return 1;
    });
};

/**
 * Retrieve tweets that match the given search term
 * @param {string} searchTerm - What we want to search for, will typically be a hashtag
 * @param {string} type - The type of results we want to show; popular or recent or mixed
 * @param {number} limit - The max number of tweets to retrieve
 * @returns A promised JSON response
 */
const searchTweets = (searchTerm, type = 'popular', limit = 10, maxId = 0, language = 'en') => {
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
  getWOEID,
  searchTweets,
  createEmbeddedTwitter,
};
