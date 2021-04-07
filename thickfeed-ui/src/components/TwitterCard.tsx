import * as React from 'react';
import LazyLoad from 'react-lazyload';
import { Tweet } from 'react-twitter-widgets';
import '../styles/cardsStyle.css';
import { TwitterLoader, TwitterLoaderMedia } from './TwitterLoader';

export interface TwitterData {
  id: string,
  imageWidth: number,
  imageHeight?: number,
  width: number,
  height?: number
}

export const TwitterCard = ({ id, imageWidth }: TwitterData): JSX.Element => {
  const [placeholder, setPlaceholder] = React.useState(true);

  const togglePlaceholder = () => {
    setPlaceholder(false);
  };
  return (

    <div className="card-container-twitter">

      <LazyLoad
        placeholder={imageWidth === 0 ? <TwitterLoader /> : <TwitterLoaderMedia />}
        offset={600}
        once
      >
        {/* eslint-disable-next-line no-nested-ternary */}
        {placeholder
          ? (imageWidth === 0
            ? <TwitterLoader />
            : <TwitterLoaderMedia />
          )
          : null }
        <Tweet tweetId={id} onLoad={togglePlaceholder} />
      </LazyLoad>
    </div>
  );
};
