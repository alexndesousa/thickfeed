import * as React from 'react';

export interface RedditData {
  permalink: string,
  title: string,
  subredditNamePrefixed: string,
  width: number,
  height?: number,
}

export const RedditCard = ({
  permalink, title, subredditNamePrefixed, width,
}: RedditData): JSX.Element => {
  const baseUrl = 'https://www.reddit.com';
  const postLink = `${baseUrl}${permalink}`;
  const postTitle = title;
  const prefixedSubreddit = subredditNamePrefixed;
  const subredditLink = `${baseUrl}${prefixedSubreddit}`;

  return (
    <div style={{ maxWidth: width }}>
      <blockquote className="reddit-card">
        <a href={postLink}>
          {postTitle}
        </a>
        from
        <a href={subredditLink}>
          {prefixedSubreddit}
        </a>
      </blockquote>

    </div>
  );
};
