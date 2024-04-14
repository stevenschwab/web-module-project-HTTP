import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';
import EditMovieForm from "./components/EditMovieForm";
import AddMovieForm from "./components/AddMovieForm";
import MovieHeader from './components/MovieHeader';
import FavoriteMovieList from './components/FavoriteMovieList';
import axios from 'axios';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:9000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id) => {
    axios.delete(`http://localhost:9000/api/movies/${id}`)
      .then(res => {
        setMovies(res.data)
        navigate('/movies')
      })
      .catch(err => {
        console.log(err)
      })
  }

  const addToFavorites = (id, title) => {
    if ( favoriteMovies.find(movie => movie.id === id) === undefined ) {
      setFavoriteMovies([...favoriteMovies, { id, title }])
    }
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" > HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader />
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Routes>
            <Route path="movies/add" element={<AddMovieForm setMovies={setMovies} />} />

            <Route path="movies/edit/:id" element={<EditMovieForm setMovies={setMovies} />} />

            <Route path="movies/:id" element={<Movie deleteMovie={deleteMovie} addToFavorites={addToFavorites} />} />

            <Route path="movies" element={<MovieList movies={movies} />} />

            <Route path="/" element={<Navigate to="/movies" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};


export default App;
