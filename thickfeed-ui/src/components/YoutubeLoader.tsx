import * as React from 'react';
import ContentLoader from 'react-content-loader';

const YoutubeLoader = (): JSX.Element => (
  <ContentLoader
    speed={2}
    width={384}
    height={216}
    viewBox="0 0 384 216"
    backgroundColor="#ffffff"
    foregroundColor="#c0c0c0"
    className="responsive-card"
    style={{ width: '100%' }}
  >
    <path d="M 215.623 108.8 l -50.934 20.907 V 87.893 l 50.934 20.907 z" />
    <rect x="50" y="49" rx="0" ry="0" width="234" height="0" />
    <rect x="0" y="4" rx="0" ry="0" width="380" height="6" />
    <rect x="8" y="219" rx="0" ry="0" width="380" height="6" />
    <rect x="0" y="208" rx="0" ry="0" width="380" height="6" />
    <rect x="0" y="4" rx="0" ry="0" width="6" height="214" />
    <rect x="374" y="4" rx="0" ry="0" width="6" height="214" />
  </ContentLoader>
);

export default YoutubeLoader;
