import * as React from 'react';
import LazyLoad from 'react-lazyload';
import '../styles/cardsStyle.css';
import YoutubeLoader from './YoutubeLoader';

export interface YoutubeData {
  id: string,
  width: number,
  height?: number
}

export const YoutubeCard = ({ id }: YoutubeData): JSX.Element => {
  const baseUrl = `https://www.youtube-nocookie.com/embed/${id}?modestbranding=1`;

  return (
    <div className="card-container-youtube">
      <LazyLoad placeholder={<YoutubeLoader />} offset={600}>
        <iframe
          className="responsive-card"
          id="ytplayer"
          title="Youtube Video Player"
          loading="lazy"
          src={baseUrl}
          frameBorder="0"
          allowFullScreen
          style={{ borderRadius: 10 }}
        />
      </LazyLoad>
    </div>

  );
};
