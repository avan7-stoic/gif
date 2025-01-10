import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Make sure you import your CSS file

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [gifs, setGifs] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Load favorites from local storage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  // Save favorites to local storage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Fetch GIFs from the API
  const fetchGifs = async () => {
    try {
      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&limit=10&api_key=${import.meta.env.VITE_GIPHY_API_KEY}`
      );
      setGifs(response.data.data);
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    }
  };

  // Add to favorites
  const addToFavorites = (gif) => {
    if (!favorites.find((fav) => fav.id === gif.id)) {
      setFavorites([...favorites, gif]);
    }
  };

  // Remove from favorites
  const removeFromFavorites = (gifId) => {
    setFavorites(favorites.filter((fav) => fav.id !== gifId));
  };

  return (
    <div>
      <h1>GIF Search App</h1>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for GIFs..."
        />
        <button onClick={fetchGifs}>Search</button>
      </div>

      {/* GIF Results */}
      <div className="results-container">
        {gifs.map((gif) => (
          <div className="gif-card" key={gif.id}>
            <img src={gif.images.fixed_height.url} alt={gif.title} />
            <button onClick={() => addToFavorites(gif)}>Add to Favorites</button>
          </div>
        ))}
      </div>

      {/* Favorites Section */}
      <div className="favorites-container">
        <h2>Your Favorites</h2>
        <div className="results-container">
          {favorites.map((gif) => (
            <div className="gif-card" key={gif.id}>
              <img src={gif.images.fixed_height.url} alt={gif.title} />
              <button onClick={() => removeFromFavorites(gif.id)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
