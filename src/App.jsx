
import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import Movie from './components/Movie';
import Cat from './cat.png';

const API_URL = `http://www.omdbapi.com/?i=${process.env.REACT_APP_I}&apikey=${process.env.REACT_APP_API_KEY}`;


function App() {
  const [movies,setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async(title) =>{
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      setMovies(data.Search);
  }

  useEffect(()=>{
      searchMovies('Spiderman');
  },[]);
  return (
    <div className="app">
      <h1>MovieCat </h1>
      <img src={Cat} style={{ height: '50px' }} alt="fireSpot" />

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <Movie movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
