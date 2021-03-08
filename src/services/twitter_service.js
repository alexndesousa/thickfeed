const fetch = require('node-fetch');

/**
 * Retrieve the top trending hashtags in the given region
 * @param {number} countryWOEID - Where On Earth ID to determine region to search in
 * @returns A promised JSON response 
 */
const getTrendingTopics = (countryWOEID = 1) => {
    const baseUrl = 'https://api.twitter.com/1.1/trends/place.json'
    const parameterisedUrl = `${baseUrl}?id=${countryWOEID}`
    const bearerToken = process.env.TWITTER_BEARER_TOKEN
    const options = {
        headers: {'Authorization': `Bearer ${bearerToken}`}
    }

    return fetch(parameterisedUrl, options)
    .then(res => res.json())
}


const getWOEID = (countryCode = null) => {
    // if no countryCode is provided we'll provide the worldwide woeid
    if (countryCode === null) {
        return 1;
    }

    const baseUrl = 'https://api.twitter.com/1.1/trends/available.json'
    const bearerToken = process.env.TWITTER_BEARER_TOKEN
    const options = {
        headers: {'Authorization': `Bearer ${bearerToken}`}
    }

    return fetch(baseUrl, options)
    .then(res => res.json())
    .then(body => {
        for (i=0; i<body.length; i++) {
            if (body[i].countryCode == countryCode) {
                console.log(body[i].parentid)
                return body[i].parentid;
            }
        }
    })
}

module.exports = {
    getTrendingTopics
}