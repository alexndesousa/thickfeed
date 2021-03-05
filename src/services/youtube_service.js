const fetch = require('node-fetch');
const fs = require('fs')

// Loads the youtube API key into memory
const apiKey = fs.readFileSync('../keys/youtube_api_key.txt', 'utf-8')

const getTrending = (countryCode = 'GB', page = '', limit = 10) => {
    const baseUrl = 'https://youtube.googleapis.com/youtube/v3/videos'
    return fetch(`${baseUrl}?part=player&chart=mostPopular&regionCode=${countryCode}&key=${apiKey}&maxResults=${limit}&pageToken=${page}`)
    .then(res => res.json())
}

module.exports = {
    getTrending
}