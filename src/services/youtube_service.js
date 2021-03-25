const fetch = require('node-fetch');
const { setPlatformOffset } = require('../db/redis_db');

/**
 * Retrieve trending videos for a given country and store the pagination offset in redis
 * @param {string} countryCode - The country to receive trending videos for
 * @param {string} page - Used for pagination
 * @param {number} limit - The max number of videos to retrieve
 * @returns An Array containing stringified JSON of video information
 */
const getTrendingYoutubeVideos = async (countryCode = 'GB', page = '', limit = 10) => {
  if (page === null) {
    page = '';
  }
  const apiKey = process.env.YOUTUBE_API_KEY;

  const baseUrl = 'https://youtube.googleapis.com/youtube/v3/videos';
  const parameterisedUrl = `${baseUrl}?part=player&chart=mostPopular&regionCode=${countryCode}&key=${apiKey}&maxResults=${limit}&pageToken=${page}`;

  const trendingVideos = await fetch(parameterisedUrl);

  const trendingVideosJSON = await trendingVideos.json();

  await setPlatformOffset('youtube', trendingVideosJSON.nextPageToken);

  const videos = trendingVideosJSON.items;
  const videoIds = await videos.map((video) => JSON.stringify({ id: video.id }));

  return videoIds;
};

/**
 * Creates an embeddable iframe for a given youtube video
 * @param {JSON} video - JSON containing information pertaning to a video
 * @param {number} width - The width of the embedded video
 * @param {number} height - The height of the embedded video
 * @returns A string containing the embeddable html
 */
const createEmbeddedYoutube = (video, width = 480, height = 270) => {
  const baseUrl = `https://www.youtube.com/embed/${video.id}?modestbranding=1`;
  const embeddableHtml = `<iframe id="ytplayer" type="text/html" width="${width}" height="${height}"src="${baseUrl}"frameborder="0"allowfullscreen="allowfullscreen"></iframe>`;

  return embeddableHtml;
};

module.exports = {
  getTrendingYoutubeVideos,
  createEmbeddedYoutube,
};
