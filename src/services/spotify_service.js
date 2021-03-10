const fetch = require('node-fetch');
const { URLSearchParams } = require('url');
/**
 * Retrieve a client bearer access token to authorize requests to spotify
 * @returns A promised string
 */
const getAccessToken = () => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const baseUrl = 'https://accounts.spotify.com/api/token';

  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');

  const encodedIdAndSecret = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const options = {
    method: 'POST',
    body: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${encodedIdAndSecret}`,
    },
  };

  return fetch(baseUrl, options)
    .then((res) => res.json())
    .then((res) => res.access_token);
};

/**
 * Retrieve the new releases in a given country
 * @param {string} countryCode - The country for which we want to find new releases for
 * @param {number} offset - The amount we want to offset the results by; used for pagination
 * @param {number} limit - The maximum amount of releases we want to retreive
 * @param {*} accessToken - The access token to authenticate the request
 * @returns A promised JSON response
 */
const getNewReleases = (countryCode = 'GB', offset = 0, limit = 10, accessToken) => {
  const baseUrl = 'https://api.spotify.com/v1/browse/new-releases';
  const parameterisedUrl = `${baseUrl}?country=${countryCode}&limit=${limit}&offset=${offset}`;

  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return fetch(parameterisedUrl, options)
    .then((res) => res.json());
};

module.exports = {
  getAccessToken,
  getNewReleases,
};
