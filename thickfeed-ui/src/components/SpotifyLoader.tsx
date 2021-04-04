import * as React from 'react';
import ContentLoader from 'react-content-loader';

const SpotifyLoader = (): JSX.Element => (
  <ContentLoader
    speed={2}
    width={160}
    height={180}
    viewBox="0 0 160 180"
    backgroundColor="#ffffff"
    foregroundColor="#c0c0c0"
    className="spotify-player"
    style={{ width: '100%' }}
  >
    <rect x="44" y="25" rx="3" ry="3" width="60" height="6" />
    <rect x="44" y="11" rx="3" ry="3" width="80" height="6" />
    <circle cx="585" cy="195" r="20" />
    <circle cx="552" cy="253" r="76" />
    <rect x="529" y="159" rx="0" ry="0" width="120" height="74" />
    <rect x="2" y="10" rx="0" ry="0" width="38" height="36" />
    <circle cx="581" cy="222" r="49" />
    <rect x="45" y="39" rx="3" ry="3" width="105" height="6" />
    <rect x="2" y="60" rx="3" ry="3" width="150" height="6" />
    <rect x="2" y="74" rx="3" ry="3" width="150" height="6" />
    <rect x="2" y="88" rx="3" ry="3" width="150" height="6" />
    <rect x="2" y="102" rx="3" ry="3" width="150" height="6" />
    <rect x="2" y="116" rx="3" ry="3" width="150" height="6" />
    <rect x="2" y="130" rx="3" ry="3" width="150" height="6" />
    <rect x="2" y="144" rx="3" ry="3" width="150" height="6" />
    <rect x="2" y="158" rx="3" ry="3" width="150" height="6" />
    <rect x="2" y="172" rx="3" ry="3" width="150" height="6" />
  </ContentLoader>
);

export default SpotifyLoader;
