import * as React from 'react';
import thickfeedLogo from './assets/thickfeed cropped.jpg';
import './App.css';
import { getFeed } from './services/feedService';

const App = (): JSX.Element => {
  const [feed, setFeed] = React.useState<Array<JSX.Element>>([]);
  const [offset] = React.useState(0);
  const [feedOptions] = React.useState({
    offset,
    limit: 40,
    spotify: true,
    reddit: true,
    twitter: true,
    youtube: true,
    bbc: true,
  });
  React.useEffect(() => {
    getFeed(feedOptions, 500, 500)
      .then((newFeed) => setFeed(newFeed));
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={thickfeedLogo} className="App-logo" alt="logo" />
        {feed}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};
export default App;
