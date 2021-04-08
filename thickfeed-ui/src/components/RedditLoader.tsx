import * as React from 'react';
import ContentLoader from 'react-content-loader';
import { useInView } from 'react-intersection-observer';

interface RedditLoaderData {
  characterCount: number,
  togglePlaceholder: () => void,
}

export const RedditLoader = ({
  characterCount, togglePlaceholder,
}: RedditLoaderData): JSX.Element => {
  const height = characterCount * 0.18;

  // the reason im handling this in here instead of in RedditCard is that the reddit blockquote
  // evaluates to an empty iframe with no src prop, making it so theres way to  call an onload prop
  // instead i just need to hope that its finished loading by the time its on screen
  const { ref, inView } = useInView({
    threshold: 0,
  });

  React.useEffect(() => {
    if (inView) {
      togglePlaceholder();
    }
  }, [inView]);

  return (
    <div ref={ref}>
      <ContentLoader
        speed={2}
        width={302}
        height={74 + height}
        viewBox={`0 0 302 ${74 + height}`}
        backgroundColor="#ffffff"
        foregroundColor="#c0c0c0"
        className="reddit-post"
        style={{ width: '100%' }}
      >
        <rect x="1" y="1" rx="3" ry="3" width="260" height="8" />
        <rect x="1" y="19" rx="3" ry="3" width="220" height="8" />
        {/** this is the footer stuff, all needs to shift down by height */}
        <rect x="1" y="37" rx="3" ry="3" width="300" height={`${height}`} />
        <circle cx="15" cy={`${57 + height}`} r="14" />
        <rect x="35" y={`${50 + height}`} rx="3" ry="3" width="45" height="6" />
        <rect x="91" y={`${50 + height}`} rx="3" ry="3" width="37" height="6" />
        <rect x="139" y={`${50 + height}`} rx="3" ry="3" width="20" height="6" />
        <rect x="78" y={`${60 + height}`} rx="3" ry="3" width="37" height="6" />
        <rect x="35" y={`${60 + height}`} rx="3" ry="3" width="32" height="6" />
        <circle cx="134" cy={`${53 + height}`} r="2" />
        <circle cx="86" cy={`${53 + height}`} r="2" />
        <circle cx="73" cy={`${63 + height}`} r="2" />
      </ContentLoader>

    </div>
  );
};

interface RedditLoaderMediaData {
  resolution: number,
  togglePlaceholder: () => void,
}

export const RedditLoaderMedia = ({
  resolution, togglePlaceholder,
}: RedditLoaderMediaData): JSX.Element => {
  const width = 302;
  const height = 302 / resolution;

  const { ref, inView } = useInView({
    threshold: 0,
  });

  React.useEffect(() => {
    if (inView) {
      togglePlaceholder();
    }
  }, [inView]);
  return (
    <div ref={ref}>
      <ContentLoader
        speed={2}
        width={width}
        height={74 + height}
        viewBox={`0 0 302 ${74 + height}`}
        backgroundColor="#ffffff"
        foregroundColor="#c0c0c0"
        className="reddit-post"
        style={{ width: '100%' }}
      >
        <rect x="1" y="1" rx="3" ry="3" width="260" height="8" />
        <rect x="1" y="19" rx="3" ry="3" width="220" height="8" />
        <rect x="1" y="37" rx="3" ry="3" width="300" height={`${height}`} />
        <circle cx="15" cy={`${57 + height}`} r="14" />
        <rect x="35" y={`${50 + height}`} rx="3" ry="3" width="45" height="6" />
        <rect x="91" y={`${50 + height}`} rx="3" ry="3" width="37" height="6" />
        <rect x="139" y={`${50 + height}`} rx="3" ry="3" width="20" height="6" />
        <rect x="78" y={`${60 + height}`} rx="3" ry="3" width="37" height="6" />
        <rect x="35" y={`${60 + height}`} rx="3" ry="3" width="32" height="6" />
        <circle cx="134" cy={`${53 + height}`} r="2" />
        <circle cx="86" cy={`${53 + height}`} r="2" />
        <circle cx="73" cy={`${63 + height}`} r="2" />
      </ContentLoader>
    </div>
  );
};
