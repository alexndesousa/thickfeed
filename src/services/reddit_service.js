const fetch = require('node-fetch');

/**
 * Retrieve hot posts in the given subreddit
 * @param {string} subreddit - The subreddit to retrieve hot posts from
 * @param {string} after - Used for retrieving the next page
 * @param {number} limit - The maximum number of posts to retrieve
 * @returns A promised JSON response
 */
const getHot = (subreddit = 'all', after = '', limit = 10) => {
    return fetch(`https://www.reddit.com/r/${subreddit}/hot.json?after=${after}&limit=${limit}`)
        .then(res => res.json())
}

module.exports = {
    getHot
}