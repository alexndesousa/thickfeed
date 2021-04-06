const { generateTrendingFeed } = require('../services/trending_feed_service');
const { getRangeOfFeedElements, getPlatformOffset } = require('../db/redis_db');

/**
 * Retrieves the desired elements from redis using the given offset and limit in the
 * requests query parameters.
 * @param {Express.Request} req - HTTP request
 * @param {Express.Response} res - HTTP response
 */
const getFeed = async (req, res) => {
  const offset = parseInt(req.query.offset, 10);
  const limit = parseInt(req.query.limit, 10);

  const feed = {};

  // this tells us the number of platforms they wish to receive data for
  const numberOfQueryParameters = Object.keys(req.query).length - 2;

  // this specifies the limit and offset for each individual platform
  const platformLimit = limit / numberOfQueryParameters;
  const platformOffset = offset / numberOfQueryParameters;

  // i should probably move the bodies of the if statements to a seperate function since they're all
  // pretty much identical
  if (req.query.spotify && req.query.spotify === 'true') {
    const spotifyFeedElements = await getRangeOfFeedElements('spotify', platformOffset, platformLimit);
    const spotifyFeedElementsJSON = spotifyFeedElements.map((element) => JSON.parse(element));

    feed.spotify = spotifyFeedElementsJSON;
  }
  if (req.query.twitter && req.query.twitter === 'true') {
    const twitterFeedElements = await getRangeOfFeedElements('twitter', platformOffset, platformLimit);
    const twitterFeedElementsJSON = twitterFeedElements.map((element) => JSON.parse(element));

    feed.twitter = twitterFeedElementsJSON;
  }
  if (req.query.reddit && req.query.reddit === 'true') {
    const redditFeedElements = await getRangeOfFeedElements('reddit', platformOffset, platformLimit);
    const redditFeedElementsJSON = await redditFeedElements.map((element) => JSON.parse(element));

    feed.reddit = redditFeedElementsJSON;
  }
  if (req.query.youtube && req.query.youtube === 'true') {
    const youtubeFeedElements = await getRangeOfFeedElements('youtube', platformOffset, platformLimit);
    const youtubeFeedElementsJSON = await youtubeFeedElements.map((element) => JSON.parse(element));

    feed.youtube = youtubeFeedElementsJSON;
  }
  if (req.query.bbc && req.query.bbc === 'true') {
    const bbcFeedElements = await getRangeOfFeedElements('bbc', platformOffset, platformLimit);
    const bbcFeedElementsJSON = await bbcFeedElements.map((element) => JSON.parse(element));

    feed.bbc = bbcFeedElementsJSON;
  }

  const response = {
    body: feed,
  };

  res.send(response);
};

/**
 * Retrieves the next batch of feed elements every 30 seconds using the pagination
 * offsets/pages from previous requests. It then stores these feed elements in redis.
 */
const fetchAndStoreFeeds = async () => {
  const condition = true;
  while (condition) {
    // retrieve the offsets from redis
    const spotifyOffset = await getPlatformOffset('spotify');
    const youtubeOffset = await getPlatformOffset('youtube');
    const twitterOffset = await getPlatformOffset('twitter');
    const redditOffset = await getPlatformOffset('reddit');

    // construct options object
    const options = {
      spotify_enabled: true,
      spotify_offset: spotifyOffset,
      twitter_enabled: true,
      twitter_offset: twitterOffset,
      reddit_enabled: true,
      reddit_offset: redditOffset,
      youtube_enabled: true,
      youtube_offset: youtubeOffset,
      bbc_enabled: true,
      country_code: 'GB',
    };

    // get and store the feeds
    await generateTrendingFeed(options);

    // delay for retrieving next batch of feed elements
    await new Promise((resolve) => setTimeout(resolve, 1000000));
  }
};

module.exports = {
  getFeed,
  fetchAndStoreFeeds,
};
