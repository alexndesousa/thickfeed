import * as React from 'react';
import LazyLoad from 'react-lazyload';
import { RedditLoader, RedditLoaderMedia } from './RedditLoader';
import '../styles/cardsStyle.css';

export interface RedditData {
  title: string,
  selftext: string,
  subredditNamePrefixed: string,
  author: string,
  createdUtc: number,
  ups: number,
  numComments: number,
  urlOverridenByDest: string,
  permalink: string,
  postHint: string,
  imageWidth: number,
  imageHeight: number,
  width: number,
  height?: number,
}

export const RedditCard = ({
  permalink, title, subredditNamePrefixed, imageHeight, imageWidth, postHint, selftext,
}: RedditData): JSX.Element => {
  const baseUrl = 'https://www.reddit.com';
  const postLink = `${baseUrl}${permalink}`;
  const postTitle = title;
  const prefixedSubreddit = subredditNamePrefixed;
  const subredditLink = `${baseUrl}${prefixedSubreddit}`;

  const imageResolution = imageWidth / imageHeight;
  const characterCount = selftext.length;

  const [placeholder, setPlaceholder] = React.useState(true);

  const togglePlaceholder = () => {
    setPlaceholder(false);
  };

  return (
    <div className="card-container-reddit" id={permalink}>
      <LazyLoad
        offset={800}
      >
        {/* eslint-disable-next-line no-nested-ternary */}
        {placeholder
          ? (imageHeight === 0 || ['self', 'link'].includes(postHint)
            ? (
              <RedditLoader
                characterCount={characterCount}
                togglePlaceholder={togglePlaceholder}
              />
            )
            : (
              <RedditLoaderMedia
                resolution={imageResolution}
                togglePlaceholder={togglePlaceholder}
              />
            )
          )
          : null }
        <blockquote
          className="reddit-card"
          style={{ padding: '-100px', margin: '-50px' }}
        >
          <a href={postLink}>
            {postTitle}
          </a>
          from
          <a href={subredditLink}>
            {prefixedSubreddit}
          </a>
        </blockquote>
      </LazyLoad>
    </div>
  );
};
