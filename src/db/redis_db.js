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
  const key = `${platform}_auth`;

  await setAsync(key, authToken, 'EX', timeout);
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
  const key = `${platform}_auth`;

  const authToken = await getAsync(key);
  if (authToken === null) {
    console.log(`${platform} authentication token doesnt exist in redis`);
  } else {
    console.log(`retrieved ${platform} authentication token from redis`);
  }

  client.quit();

  return authToken;
};

/**
 * Stores an array of feed elements (e.g. embeddables) in redis
 * @param {Array} elements - An array of feed elements
 */
const addElementsToFeedList = async (platform, elements) => {
  const client = redisClient();
  const setAsync = promisify(client.rpush).bind(client);
  const key = `${platform}_feed`;

  await setAsync(key, elements);
  console.log('stored new batch of feed elements');

  client.quit();
};

/**
 * Retrieves feed elements from the redis server with the given offset and limit
 * @param {number} offset - The amount to offset the list by
 * @param {number} limit - The amount of elements we want to retrieve
 * @returns An Array
 */
const getRangeOfFeedElements = async (platform, offset, limit) => {
  const client = redisClient();
  const getAsync = promisify(client.lrange).bind(client);
  const key = `${platform}_feed`;

  const elements = await getAsync(key, offset, offset + limit);
  if (elements === null) {
    console.log('unable to retrieve feed elements from redis');
  } else {
    console.log('successfully retrieved feed elements from redis');
  }

  client.quit();

  return elements;
};

/**
 * Stores the pagination offset for the given platform
 * @param {string} platform - The platform the offset belongs to
 * @param {string} offset - The pagination offset used to retrieve subsequent requests
 */
const setPlatformOffset = async (platform, offset) => {
  const client = redisClient();
  const key = `${platform}_offset`;

  if (platform === 'spotify') {
    const incrbyAsync = promisify(client.incrby).bind(client);
    const newOffset = await incrbyAsync(key, offset);
    console.log(`stored ${platform} with offset of ${newOffset}`);
  } else {
    const setAsync = promisify(client.set).bind(client);
    await setAsync(key, offset);
    console.log(`stored ${platform} with offset of ${offset}`);
  }

  client.quit();
};

/**
 * Retrieves an offset from the redis server for the given platform
 * @param {string} platform - The platform for which we want to retrieve an offset for
 * @returns A string or number of the offset
 */
const getPlatformOffset = async (platform) => {
  const client = redisClient();
  const getAsync = promisify(client.get).bind(client);
  const key = `${platform}_offset`;

  const authToken = await getAsync(key);
  if (authToken === null) {
    console.log(`${platform} offset doesnt exist`);
  } else {
    console.log(`retrieved ${platform} offset`);
  }

  client.quit();

  return authToken;
};

module.exports = {
  setAuthToken,
  getAuthToken,
  addElementsToFeedList,
  getRangeOfFeedElements,
  setPlatformOffset,
  getPlatformOffset,
};
