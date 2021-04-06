import * as React from 'react';
import '../styles/cardsStyle.css';
import Card from '@material-ui/core/Card';
import { CardMedia } from '@material-ui/core';
import LazyLoad from 'react-lazyload';
import SpotifyLoader from './SpotifyLoader';
import spotifyAlbumPlaceholder from '../assets/spotifyalbumplaceholder.svg';

export interface SpotifyData {
  id: string,
  imageUrl: string,
  width: number,
  height: number,
}

export const SpotifyCard = ({
  id, imageUrl,
}: SpotifyData): JSX.Element => {
  const baseUrl = 'https://open.spotify.com/embed/album/';
  const embedLink = `${baseUrl}${id}`;

  return (
    <Card className="card-container-spotify">
      <LazyLoad placeholder={<img src={spotifyAlbumPlaceholder} alt="placeholder" />} offset={600}>
        <CardMedia
          alt="album artwork"
          src={imageUrl}
          component="img"
          style={{ filter: 'brightness(40%)' }}
        />
      </LazyLoad>
      <LazyLoad placeholder={<SpotifyLoader />} offset={600}>
        <iframe
          className="spotify-player"
          src={embedLink}
          title="Spotify Player"
          frameBorder="0"
          allow="encrypted-media"
          loading="lazy"
        />
      </LazyLoad>
    </Card>
  );
};
