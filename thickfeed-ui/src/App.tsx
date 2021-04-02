import * as React from 'react';
import useScript from './hooks/useScript';
import logo from './logo.svg';
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
  // React.useEffect(() => {
  //   console.log(feed);
  // }, [feed]);
  useScript('https://embed.redditmedia.com/widgets/platform.js');
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
