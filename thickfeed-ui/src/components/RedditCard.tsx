import * as React from 'react';

interface RedditData {
  permalink: string,
  title: string,
  subredditNamePrefixed: string,
  width?: number,
  height?: number
}

const createEmbeddedReddit = (props: RedditData): JSX.Element => {
  const baseUrl = 'https://www.reddit.com';
  const postLink = `${baseUrl}${props.permalink}`;
  const postTitle = props.title;
  const prefixedSubreddit = props.subredditNamePrefixed;
  const subredditLink = `${baseUrl}${prefixedSubreddit}`;

  return (
    <div>
      <blockquote className="reddit-card">
        <a href={postLink}>
          {postTitle}
        </a>
        from
        <a href={subredditLink}>
          {prefixedSubreddit}
        </a>
      </blockquote>
      <script async src="//embed.redditmedia.com/widgets/platform.js" charSet="UTF-8" />
    </div>
  );
};

export default createEmbeddedReddit;
