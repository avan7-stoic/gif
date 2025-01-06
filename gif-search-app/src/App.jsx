import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import GifGrid from './components/GifGrid';
import Favorites from './components/Favorites';
import { fetchGifs } from './utils/api';
import './App.css';

function App() {
  const [gifs, setGifs] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handleSearch = async (query) => {
    const results = await fetchGifs(query);
    setGifs(results);
  };

  const addToFavorites = (gif) => {
    if (!favorites.some((fav) => fav.id === gif.id)) {
      setFavorites([...favorites, gif]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((gif) => gif.id !== id));
  };

  return (
    <div className="App">
      <h1>GIF Search App</h1>
      <SearchBar onSearch={handleSearch} />
      <GifGrid gifs={gifs} onFavorite={addToFavorites} />
      <Favorites favorites={favorites} onRemove={removeFromFavorites} />
    </div>
  );
}

export default App;
