import * as React from 'react';

interface TwitterData {
  text: string,
  url: string,
  displayName: string,
  username: string,
  created: string,
  width: number,
  height?: number
}

const createEmbeddedTwitter = (props: TwitterData): JSX.Element => {
  const fullName = `${props.displayName} (@${props.username})`;

  return (
    <div>
      <blockquote className="twitter-tweet" data-width={props.width}>
        <p lang="en" dir="ltr">
          {props.text}
        </p>
        {fullName}
        <a href={props.url}>
          {props.created}
        </a>
      </blockquote>
      <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8" />
    </div>
  );
};

export default createEmbeddedTwitter;
