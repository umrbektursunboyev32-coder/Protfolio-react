import React, { useState } from 'react';
import axios from 'axios';

function MovieSearch() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // Tanlangan kino tafsilotlari
  const [loading, setLoading] = useState(false);

  const API_KEY = "25453f18"; // O'zingizning API kalitingizni qo'ying

  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
      // https://www.omdbapi.com/?s=Marvel&apikey=25453f18
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // Kinoni ustiga bosganda to'liq ma'lumot olish funksiyasi
  const getMovieDetails = async (id) => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`)
      setSelectedMovie(response.data) // Modal oynada ko'rsatish uchun saqlaymiz
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2 style={{ textAlign: 'center' }}>🎬 Kino Portali</h2>
      
      {/* Qidiruv qismi */}
      <form onSubmit={searchMovies} style={{ display: 'flex', gap: '10px', marginBottom: '30px', justifyContent: 'center' }}>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Kino nomini yozing..." 
          style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 20px', background: '#27ae60', color: 'white', border: 'none', 
          borderRadius: '5px', cursor: 'pointer' }}>Qidirish</button>
      </form>

      {/* Kinolar ro'yxati */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {movies.map((movie) => (
          <div 
            key={movie.imdbID} 
            onClick={() => getMovieDetails(movie.imdbID)} // BOSILGANDA ISHLAYDI
            style={{ border: '1px solid #ddd', borderRadius: '10px', cursor: 'pointer', overflow: 'hidden', textAlign: 
              'center', transition: '0.3s' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img src={movie.Poster} alt={movie.Title} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
            <div style={{ padding: '10px' }}>
              <h4>{movie.Title}</h4>
              <p>{movie.Year}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedMovie && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white', padding: '20px', borderRadius: '15px', maxWidth: '600px', width: '90%',
            position: 'relative', display: 'flex', gap: '20px'
          }}>
            <button 
              onClick={() => setSelectedMovie(null)} 
              style={{ position: 'absolute', top: '10px', right: '15px', fontSize: '20px', cursor: 'pointer', border: 'none',
                 background: 'none' }}
            >✖️</button>
            
            <img src={selectedMovie.Poster} alt={selectedMovie.Title} style={{ width: '200px', borderRadius: '10px' }} />
            
            <div>
              <h3>{selectedMovie.Title}</h3>
              <p><strong>Yil:</strong> {selectedMovie.Year}</p>
              <p><strong>Reyting:</strong> ⭐️ {selectedMovie.imdbRating}</p>
              <p><strong>Janr:</strong> {selectedMovie.Genre}</p>
              <p><strong>Aktyorlar:</strong> {selectedMovie.Actors}</p>
              <p><strong>Haqida:</strong> {selectedMovie.Plot}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieSearch;