import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import MenuBar from './components/MenuBar';
import { getFeed } from './services/feedService';
import thickfeedLogo from './assets/thickfeed cropped.jpg';
import './App.css';
import useScript from './hooks/useScript';

const App = (): JSX.Element => {
  const [feed, setFeed] = React.useState<Array<JSX.Element>>([]);
  const [offset, setOffset] = React.useState(0);
  const [feedOptions, setFeedOptions] = React.useState({
    spotify: true,
    // spotifyCategories?: [],
    reddit: true,
    // redditCategories?: [],
    twitter: true,
    // twitterCategories?: [],
    youtube: true,
    // youtubeCategories?: []
    bbc: true,
    // bbcCategories?: []
  });

  React.useEffect(() => {
    const limit = 40;
    getFeed({ ...{ offset, limit }, ...feedOptions }, 500, 500)
      .then((newFeed) => setFeed(feed.concat(newFeed)));
    setOffset(offset + limit);
  }, [feedOptions]);

  const fetchMoreData = () => {
    const limit = 40;
    getFeed({ ...{ offset, limit }, ...feedOptions }, 500, 500)
      .then((newFeed) => setFeed(feed.concat(newFeed)));
    setOffset(offset + limit);
  };
  useScript('https://embed.redditmedia.com/widgets/platform.js');
  return (
    <div className="App">

      <header className="App-header">
        <img src={thickfeedLogo} className="App-logo" alt="logo" />
      </header>

      <div className="App-body">
        <MenuBar setFeedOptions={setFeedOptions} />
      </div>

      <InfiniteScroll
        dataLength={feed.length}
        next={fetchMoreData}
        hasMore
        loader={<h4>loading....</h4>}
        className="App-body"
        style={{
          width: '100%',
        }}
      >
        {feed}
      </InfiniteScroll>

    </div>
  );
};
export default App;
