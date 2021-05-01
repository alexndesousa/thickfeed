require('dotenv').config();
const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const { fetchAndStoreFeeds, getFeed } = require('./src/controllers/trending_feed_controller');

const key = fs.readFileSync(`${__dirname}/../certs/selfsigned.key`);
const cert = fs.readFileSync(`${__dirname}/../certs/selfsigned.crt`);
const options = {
  key,
  cert,
};

const app = express();
const port = 443;

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://localhost:3000',
    'http://localhost:5000',
    'https://alexndesousa.github.io',
    'https://thickfeed.co.uk'],
};

app.use(cors(corsOptions));

app.get('/test', getFeed);

const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`thickfeed listening at https://localhost:${port}`);
});

fetchAndStoreFeeds();
