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
        method = 'GET',
        headers: {'Authorization': `Bearer ${bearerToken}`}
    }

    return fetch(parameterisedUrl, options)
    .then(res => res.json())
}