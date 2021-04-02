import * as React from 'react';

export interface TwitterData {
  text: string,
  url: string,
  displayName: string,
  username: string,
  created: string,
  width: number,
  height?: number
}

export const TwitterCard = ({
  displayName, username, width, text, url, created,
}: TwitterData): JSX.Element => {
  const fullName = `${displayName} (@${username})`;

  return (
    <div>
      <blockquote className="twitter-tweet" data-width={width}>
        <p lang="en" dir="ltr">
          {text}
        </p>
        {fullName}
        <a href={url}>
          {created}
        </a>
      </blockquote>
      <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8" />
    </div>
  );
};
