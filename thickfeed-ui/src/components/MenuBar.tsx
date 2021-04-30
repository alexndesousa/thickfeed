import * as React from 'react';

import Grid from '@material-ui/core/Grid';
import MenuToggleButton from './MenuToggleButton';

export interface FeedOptions {
  spotify: boolean,
  reddit: boolean,
  twitter: boolean,
  youtube: boolean,
  bbc: boolean,
}

interface FeedOptionsData {
  setFeedOptions: React.Dispatch<React.SetStateAction<FeedOptions>>,
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>
}

const MenuBar = ({ setFeedOptions, setLoaded }: FeedOptionsData): JSX.Element => {
  const [reddit, setReddit] = React.useState<Array<string>>([]);
  const [youtube, setYoutube] = React.useState<Array<string>>([]);
  const [twitter, setTwitter] = React.useState<Array<string>>([]);
  const [spotify, setSpotify] = React.useState<Array<string>>([]);
  const [bbc, setBbc] = React.useState<Array<string>>([]);

  React.useEffect(() => {
    const options = {
      reddit: reddit.length >= 1,
      youtube: youtube.length >= 1,
      twitter: twitter.length >= 1,
      spotify: spotify.length >= 1,
      bbc: bbc.length >= 1,
    };
    setFeedOptions(options);
    setLoaded(false);
  }, [spotify, twitter, reddit, youtube, bbc]);
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <Grid container spacing={1} style={{ flexGrow: 1 }}>
        <Grid item>
          <MenuToggleButton text="reddit" childButtonNames={['hot']} setPlatform={setReddit} disabled={false} />
        </Grid>
        <Grid item>
          <MenuToggleButton text="youtube" childButtonNames={['trending']} setPlatform={setYoutube} disabled={false} />
        </Grid>
        <Grid item>
          <MenuToggleButton text="spotify" childButtonNames={['new']} setPlatform={setSpotify} disabled={false} />
        </Grid>
        <Grid item>
          <MenuToggleButton text="twitter" childButtonNames={['trending', 'science', 'news']} setPlatform={setTwitter} disabled />
        </Grid>
        <Grid item>
          <MenuToggleButton text="news" childButtonNames={['UK', 'technology', 'world', 'europe']} setPlatform={setBbc} disabled />
        </Grid>
      </Grid>
    </div>
  );
};

export default MenuBar;
