const Parser = require('rss-parser');

/**
 * Retrieves a BBC News RSS feed
 * @param {string} type - The type of new feed that should be retrieved (e.g. science or world news)
 * @returns An Array containing stringified JSON of article information
 */
const getBBCNewsFeed = async (type = 'top') => {
  const feeds = {
    top: '',
    world: '/world',
    africa: '/africa',
    asia: '/asia',
    europe: '/europe',
    latin: '/latin_america',
    middle_east: '/middle_east',
    us: '/us_and_canada',
    uk: '/uk',
    england: '/england',
    ireland: '/northern_ireland',
    scotland: '/scotland',
    wales: '/wales',
    business: '/business',
    politics: 'politics',
    health: '/health',
    education: '/education',
    science: '/science_and_environment',
    technology: '/technology',
    entertainment: '/entertainment_and_arts',
  };

  let directory = '';
  if (type in feeds) {
    directory = feeds[type];
  }

  const parser = new Parser();
  console.log('about to await parsing a url');
  const feed = await parser.parseURL(`http://feeds.bbci.co.uk/news${directory}/rss.xml`);

  const articles = feed.items;
  const articlesInfo = await articles.map((article) => (JSON.stringify({
    title: article.title,
    link: article.link,
    date: article.pubDate,
    snippet: article.contentSnippet,
  })));

  return articlesInfo;
};

module.exports = {
  getBBCNewsFeed,
};
