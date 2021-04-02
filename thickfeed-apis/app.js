require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { fetchAndStoreFeeds, getFeed } = require('./src/controllers/trending_feed_controller');

const app = express();
const port = 3001;

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

app.get('/test', getFeed);

app.listen(port, () => {
  console.log(`thickfeed listening at http://localhost:${port}`);
});

fetchAndStoreFeeds();
