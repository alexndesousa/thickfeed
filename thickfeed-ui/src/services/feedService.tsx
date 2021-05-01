import * as React from 'react';
import { RedditData, RedditCard } from '../components/RedditCard';
import { SpotifyData, SpotifyCard } from '../components/SpotifyCard';
import { TwitterData, TwitterCard } from '../components/TwitterCard';
import { YoutubeData, YoutubeCard } from '../components/YoutubeCard';
import { shuffle } from '../utils/utils';

interface FeedOptions {
  offset: number,
  limit: number,
  spotify: boolean,
  reddit: boolean,
  twitter: boolean,
  youtube: boolean,
  bbc: boolean,
}

export interface FeedData {
  body: {
    spotify: Array<SpotifyData>,
    twitter: Array<TwitterData>,
    reddit: Array<RedditData>,
    youtube: Array<YoutubeData>,
    bbc: Array<JSON>
  }
}

export const getRawFeedData = async (props: FeedOptions): Promise<FeedData> => {
  const apiHost: string = process.env.REACT_APP_FEED_API_HOST || '';
  const apiPort: string = process.env.REACT_APP_FEED_API_PORT || '';

  const queryParams = `offset=${props.offset}&limit=${props.limit}&spotify=${props.spotify}&reddit=${props.reddit}&twitter=${props.twitter}&youtube=${props.youtube}&bbc=${props.bbc}`;
  const requestUrl = `https://${apiHost}:${apiPort}/test?${queryParams}`;
  const feedData: Response = await fetch(requestUrl);
  const feedDataJSON: FeedData = await feedData.json();
  return feedDataJSON;
};

const createEmbeddedFeedElements = (
  props: FeedData, cardWidth: number, cardHeight: number,
): Array<JSX.Element> => {
  let feed: Array<JSX.Element> = [];

  const spotifyCards = props.body.spotify?.map(
    (element) => (
      <SpotifyCard
        id={element.id}
        key={element.id}
        imageUrl={element.imageUrl}
        width={cardWidth}
        height={cardHeight}
      />
    ),
  );

  const twitterCards = props.body.twitter?.map(
    (element) => (
      <TwitterCard
        id={element.id}
        imageWidth={element.imageWidth}
        width={cardWidth}
      />
    ),
  );

  const redditCards = props.body.reddit?.map(
    (element) => (
      <RedditCard
        selftext={element.selftext}
        author={element.author}
        createdUtc={element.createdUtc}
        ups={element.ups}
        numComments={element.numComments}
        urlOverridenByDest={element.urlOverridenByDest}
        permalink={element.permalink}
        title={element.title}
        subredditNamePrefixed={element.subredditNamePrefixed}
        postHint={element.postHint}
        width={cardWidth}
        key={element.permalink}
        imageWidth={element.imageWidth}
        imageHeight={element.imageHeight}
      />
    ),
  );

  const youtubeCards = props.body.youtube?.map(
    (element) => (
      <YoutubeCard
        id={element.id}
        key={element.id}
        width={cardWidth}
        height={cardHeight}
      />
    ),
  );

  // add everything to the feed array
  feed = feed.concat(spotifyCards);
  feed = feed.concat(twitterCards);
  feed = feed.concat(redditCards);
  feed = feed.concat(youtubeCards);

  // shuffle everything
  const shuffledFeed = shuffle(feed);
  // return everything
  return shuffledFeed;
};

export const getFeed = async (
  feedOptions: FeedOptions, cardWidth: number, cardHeight: number,
): Promise<Array<JSX.Element>> => {
  const rawFeedData: FeedData = await getRawFeedData(feedOptions);
  const feed = await createEmbeddedFeedElements(rawFeedData, cardWidth, cardHeight);
  return feed;
};
