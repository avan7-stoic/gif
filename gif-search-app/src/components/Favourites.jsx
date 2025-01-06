import React from 'react';

const Favorites = ({ favorites, onRemove }) => {
  return (
    <div className="favorites">
      <h2>Favorites</h2>
      {favorites.map((gif) => (
        <div key={gif.id} className="favorite-item">
          <img src={gif.images.fixed_height.url} alt={gif.title} />
          <button onClick={() => onRemove(gif.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
