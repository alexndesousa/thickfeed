import * as React from 'react';

interface YoutubeData {
  id: string,
  width: number,
  height: number
}

const createEmbeddedYoutube = (props: YoutubeData): JSX.Element => {
  const baseUrl = `https://www.youtube.com/embed/${props.id}?modestbranding=1`;

  return (
    <div>
      <iframe
        id="ytplayer"
        title="Youtube Video Player"
        width={props.width}
        src={baseUrl}
        height={props.height}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

export default createEmbeddedYoutube;
