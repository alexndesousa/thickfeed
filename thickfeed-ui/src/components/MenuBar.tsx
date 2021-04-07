import * as React from 'react';

import Grid from '@material-ui/core/Grid';
import MenuToggleButton from './MenuToggleButton';

interface FeedOptions {
  spotify: boolean,
  reddit: boolean,
  twitter: boolean,
  youtube: boolean,
  bbc: boolean,
}

interface FeedOptionsData {
  setFeedOptions: React.Dispatch<React.SetStateAction<FeedOptions>>
}

const MenuBar = ({ setFeedOptions }: FeedOptionsData): JSX.Element => {
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
  }, [spotify, twitter, reddit, youtube, bbc]);
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <Grid container spacing={1} style={{ flexGrow: 1 }}>
        <Grid item>
          <MenuToggleButton text="reddit" childButtonNames={['hot', 'technology', 'music', 'fashion']} setPlatform={setReddit} />
        </Grid>
        <Grid item>
          <MenuToggleButton text="youtube" childButtonNames={['trending', 'crafts', 'food']} setPlatform={setYoutube} />
        </Grid>
        <Grid item>
          <MenuToggleButton text="twitter" childButtonNames={['trending', 'science', 'news']} setPlatform={setTwitter} />
        </Grid>
        <Grid item>
          <MenuToggleButton text="spotify" childButtonNames={['new', 'rock', 'pop', 'rap']} setPlatform={setSpotify} />
        </Grid>
        <Grid item>
          <MenuToggleButton text="bbc" childButtonNames={['UK', 'technology', 'world', 'europe']} setPlatform={setBbc} />
        </Grid>
      </Grid>
    </div>
  );
};

export default MenuBar;
