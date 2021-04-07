import * as React from 'react';
import ContentLoader from 'react-content-loader';

export const TwitterLoader = (): JSX.Element => (
  <ContentLoader
    speed={2}
    width={301}
    height={126}
    viewBox="0 0 301 126"
    backgroundColor="#ffffff"
    foregroundColor="#c0c0c0"
    className="twitter-tweet"
    style={{ width: '100%' }}
  >
    <rect x="49" y="10" rx="3" ry="3" width="95" height="6" />
    <rect x="0" y="55" rx="3" ry="3" width="280" height="6" />
    <circle cx="20" cy="20" r="20" />
    <rect x="49" y="22" rx="3" ry="3" width="75" height="6" />
    <rect x="0" y="70" rx="3" ry="3" width="300" height="6" />
    <rect x="0" y="85" rx="3" ry="3" width="250" height="6" />
    <rect x="0" y="105" rx="3" ry="3" width="90" height="6" />
    <rect x="0" y="119" rx="3" ry="3" width="25" height="6" />
    <rect x="35" y="119" rx="3" ry="3" width="25" height="6" />
    <rect x="70" y="119" rx="3" ry="3" width="50" height="6" />
  </ContentLoader>
);

export const TwitterLoaderMedia = (): JSX.Element => (
  <ContentLoader
    speed={2}
    width={301}
    height={273}
    viewBox="0 0 301 273"
    backgroundColor="#ffffff"
    foregroundColor="#c0c0c0"
    className="twitter-tweet"
    style={{ width: '100%' }}
  >
    <rect x="49" y="10" rx="3" ry="3" width="95" height="6" />
    <rect x="0" y="55" rx="3" ry="3" width="280" height="6" />
    <circle cx="20" cy="20" r="20" />
    <rect x="49" y="22" rx="3" ry="3" width="75" height="6" />
    <rect x="0" y="70" rx="3" ry="3" width="300" height="6" />
    <rect x="0" y="85" rx="3" ry="3" width="250" height="6" />
    <rect x="0" y="250" rx="3" ry="3" width="90" height="6" />
    <rect x="0" y="264" rx="3" ry="3" width="25" height="6" />
    <rect x="35" y="264" rx="3" ry="3" width="25" height="6" />
    <rect x="70" y="264" rx="3" ry="3" width="50" height="6" />
    <rect x="0" y="104" rx="0" ry="0" width="300" height="132" />
  </ContentLoader>
);
