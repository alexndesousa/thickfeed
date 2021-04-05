import * as React from 'react';
import thickfeedLogo from './assets/thickfeed cropped.jpg';
import './App.css';
import { getFeed } from './services/feedService';
import MenuBar from './components/MenuBar';

const App = (): JSX.Element => {
  const [feed, setFeed] = React.useState<Array<JSX.Element>>([]);
  const [offset] = React.useState(0);
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
    getFeed({ ...{ offset, limit: 40 }, ...feedOptions }, 500, 500)
      .then((newFeed) => setFeed(newFeed));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={thickfeedLogo} className="App-logo" alt="logo" />

      </header>

      <body className="App-body">
        <MenuBar setFeedOptions={setFeedOptions} />
        {feed}
      </body>
    </div>
  );
};
export default App;
