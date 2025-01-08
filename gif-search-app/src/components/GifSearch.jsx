// src/components/GifSearch.jsx
import React, { useState } from 'react';
import { fetchGifs } from '../utils/api';

const GifSearch = () => {
  const [query, setQuery] = useState('');
  const [gifs, setGifs] = useState([]);

  const handleSearch = async () => {
    const results = await fetchGifs(query);
    setGifs(results);
  };

  return (
    <div>
      <h1>GIF Search App</h1>
      <input
        type="text"
        placeholder="Search for GIFs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
        {gifs.map((gif) => (
          <div key={gif.id} style={{ margin: '10px' }}>
            <img src={gif.images.fixed_height.url} alt={gif.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GifSearch;
