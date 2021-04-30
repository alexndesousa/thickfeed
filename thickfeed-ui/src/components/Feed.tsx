import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getFeed } from '../services/feedService';
import '../App.css';
import { FeedOptions } from './MenuBar';

interface FeedProps {
  feedOptions: FeedOptions,
  loaded: boolean,
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>
}

const Feed = ({ feedOptions, loaded, setLoaded }: FeedProps): JSX.Element => {
  const [feed, setFeed] = React.useState<Array<JSX.Element>>([]);
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    const limit = 40;
    getFeed({ ...{ offset, limit }, ...feedOptions }, 500, 500)
      .then((newFeed) => setFeed(newFeed));
    setOffset(limit);
  }, [feedOptions]);

  const toggleLoaded = () => {
    setTimeout(() => {
      setLoaded(true);
    }, 2500);
  };

  const fetchMoreData = () => {
    const limit = 40;
    getFeed({ ...{ offset, limit }, ...feedOptions }, 500, 500)
      .then((newFeed) => setFeed(feed.concat(newFeed)));
    setOffset(offset + limit);
  };
  return (
    <InfiniteScroll
      dataLength={feed.length}
      next={fetchMoreData}
      hasMore
      loader={<CircularProgress />}
      className="App-body"
      style={{
        width: '100%',
        overflow: 'hidden',
        display: loaded ? '' : 'none',
      }}
    >
      <div onLoad={() => toggleLoaded()} style={{ all: 'inherit' }}>
        {feed}
      </div>
    </InfiniteScroll>
  );
};

export default Feed;
