import * as React from 'react';
// import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuBar from './components/MenuBar';
// import { getFeed } from './services/feedService';
import thickfeedLogo from './assets/thickfeed cropped.jpg';
import './App.css';
import useScript from './hooks/useScript';
import Feed from './components/Feed';

const App = (): JSX.Element => {
  const [loaded, setLoaded] = React.useState(false);
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

  useScript('https://embed.redditmedia.com/widgets/platform.js');
  return (
    <div className="App">

      <header className="App-header">
        <img src={thickfeedLogo} className="App-logo" alt="logo" />
        <MenuBar setFeedOptions={setFeedOptions} setLoaded={setLoaded} />
      </header>

      {loaded
        ? null
        : <div className="App-body" style={{ marginTop: '10vh' }}><CircularProgress /></div>}

      <Feed feedOptions={feedOptions} loaded={loaded} setLoaded={setLoaded} />

    </div>
  );
};
export default App;
