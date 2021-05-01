require('dotenv').config();
const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const { fetchAndStoreFeeds, getFeed } = require('./src/controllers/trending_feed_controller');

const key = fs.readFileSync('/etc/letsencrypt/live/api.thickfeed.co.uk/privkey.pem', 'utf8');
const cert = fs.readFileSync('/etc/letsencrypt/live/api.thickfeed.co.uk/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/api.thickfeed.co.uk/chain.pem', 'utf8');
const options = {
  key,
  cert,
  ca,
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
