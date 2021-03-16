const fetch = require('node-fetch');
const { URLSearchParams } = require('url');
const { setAuthToken, getAuthToken } = require('../db/redis_db');

/**
 * Retrieve a client bearer access token to authorize requests to spotify
 * @returns A string containing the access token
 */
const getAccessToken = async () => {
  // if the token exists in redis, lets retrieve it from there instead
  const authToken = await getAuthToken('spotify');
  if (authToken !== null) {
    return authToken;
  }

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

  const res = await fetch(baseUrl, options);
  const resJSON = await res.json();
  await setAuthToken('spotify', resJSON.access_token, resJSON.expires_in);
  return resJSON.access_token;
};

/**
 * Retrieve the new releases in a given country
 * @param {string} countryCode - The country for which we want to find new releases for
 * @param {number} offset - The amount we want to offset the results by; used for pagination
 * @param {number} limit - The maximum amount of releases we want to retreive
 * @param {string} accessToken - The access token to authenticate the request
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

/**
 * Creates an embeddable iFrame for a given album
 * @param {JSON} album - Json containing all the album information
 * @param {number} width - The width of the embedded album
 * @param {number} height - The height of the embedded album
 * @returns A string containing the embeddable html
 */
const createEmbeddedSpotify = (album, width = 300, height = 380) => {
  const baseUrl = 'https://open.spotify.com/embed/album/';
  const embedLink = `${baseUrl}${album.id}`;
  const embeddedAlbum = `<iframe src="${embedLink}" width="${width}" height="${height}" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
  return embeddedAlbum;
};

module.exports = {
  getAccessToken,
  getNewReleases,
  createEmbeddedSpotify,
};
