import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MenuBar from './components/MenuBar';
import thickfeedLogo from './assets/thickfeed-header.png';
import './App.css';
import useScript from './hooks/useScript';
import Feed from './components/Feed';

const theme = createMuiTheme({
  typography: {
    fontFamily: "'Courier New', monospace",
  },
  palette: {
    primary: {
      main: '#8E7CC3',
    },
    secondary: {
      main: '#B9ADD8',
    },
  },
});

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
    <MuiThemeProvider theme={theme}>
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
    </MuiThemeProvider>
  );
};
export default App;
