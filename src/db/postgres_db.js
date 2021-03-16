require('dotenv').config({ path: '../../.env' });

const { Client } = require('pg');

/**
 * Creates a postgres Client with the details present in the .env
 * @returns A postgres Client()
 */
const newClient = () => {
  const client = new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });

  return client;
};

/**
 * Retrieves the WOEID for the given country code
 * @param {string} countryCode - An ISO 3166-1 alpha-2 country code
 * @returns A promised number
 */
const getWOEID = (countryCode) => {
  const client = newClient();
  const query = `SELECT woeid FROM thickfeed.woeid WHERE countrycode='${countryCode}'`;

  client.connect();

  return client.query(query)
    .then((res) => {
      client.end();
      return res.rows[0].woeid;
    })
    .catch((error) => console.error(error.stack));
};

module.exports = {
  getWOEID,
};
