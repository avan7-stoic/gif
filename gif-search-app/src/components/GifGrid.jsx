import React from 'react';
import GifCard from './GifCard';

const GifGrid = ({ gifs }) => {
  return (
    <div className="gif-grid">
      {gifs.map((gif) => (
        <GifCard key={gif.id} gif={gif} />
      ))}
    </div>
  );
};

export default GifGrid;
