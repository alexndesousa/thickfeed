const fetch = require('node-fetch');
const { URLSearchParams } = require('url');
/**
 *
 * @returns
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

getAccessToken();
