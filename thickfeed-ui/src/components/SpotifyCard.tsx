import * as React from 'react';

export interface SpotifyData {
  id: string,
  width: number,
  height: number,
}

export const SpotifyCard = ({ id, width, height }: SpotifyData): JSX.Element => {
  const baseUrl = 'https://open.spotify.com/embed/album/';
  const embedLink = `${baseUrl}${id}`;
  return (
    <div>
      <iframe src={embedLink} title="Spotify Player" width={width} height={height} allow="encrypted-media" />
    </div>
  );
};
