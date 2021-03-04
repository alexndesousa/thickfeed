const fetch = require('node-fetch');

const getHot = (subreddit = 'all', after = '', limit = 10) => {
    fetch(`https://www.reddit.com/r/${subreddit}/hot.json?after=${after}&limit=${limit}`)
        .then(res => res.text())
        .then(body => console.log(body))
}

module.exports = {
    getHot
}