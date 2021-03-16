const redis = require('redis');
const { promisify } = require('util');

/**
 * Creates a redis client with the specified environment variables
 * @returns A redis client
 */
const redisClient = () => redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

/**
 * Stores an auth token in the redis server for the given platform with the given timeout
 * then closes the connection
 * @param {string} platform - The platform for which the auth token belongs to
 * @param {string} authToken - The auth token used for authorizing requests
 * @param {number} timeout - The time in seconds that the auth token will remain valid for
 */
const setAuthToken = async (platform, authToken, timeout) => {
  const client = redisClient();
  const setAsync = promisify(client.set).bind(client);

  await setAsync(platform, authToken, 'EX', timeout);
  console.log(`stored ${platform} authentication token`);

  client.quit();
};

/**
 * Retrieves an auth token from the redis server for the given platform
 * @param {string} platform - The platform for which we want to retrieve an auth token for
 * @returns A string of the auth token
 */
const getAuthToken = async (platform) => {
  const client = redisClient();
  const getAsync = promisify(client.get).bind(client);

  const authToken = await getAsync(platform);
  if (authToken === null) {
    console.log(`${platform} authentication token doesnt exist in redis`);
  } else {
    console.log(`retrieved ${platform} authentication token from redis`);
  }

  client.quit();

  return authToken;
};

module.exports = {
  setAuthToken,
  getAuthToken,
};
