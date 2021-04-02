import * as React from 'react';

export interface YoutubeData {
  id: string,
  width: number,
  height: number
}

export const YoutubeCard = ({ id, width, height }: YoutubeData): JSX.Element => {
  const baseUrl = `https://www.youtube.com/embed/${id}?modestbranding=1`;

  return (
    <div>
      <iframe
        id="ytplayer"
        title="Youtube Video Player"
        width={width}
        src={baseUrl}
        height={height}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};
