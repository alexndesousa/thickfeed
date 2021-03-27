import * as React from 'react';

interface SpotifyData {
  id: string,
  width: number,
  height: number,
}

const createEmbeddedSpotify = (props: SpotifyData): JSX.Element => {
  const baseUrl = 'https://open.spotify.com/embed/album/';
  const embedLink = `${baseUrl}${props.id}`;

  return (
    <div>
      <iframe src={embedLink} title="Spotify Player" width={props.width} height={props.height} allow="encrypted-media" />
    </div>
  );
};

export default createEmbeddedSpotify;
