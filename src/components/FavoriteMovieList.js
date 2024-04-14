import React from 'react';
import { Link } from 'react-router-dom';

const FavoriteMovieList = ({ favoriteMovies }) => {
  return (
    <div className="col-xs savedContainer">
      <h5>Favorite Movies</h5>
      {Array.from(favoriteMovies, ([id, title]) => (
        <Link key={id} className='btn btn-light savedButton' to={`/movies/${id}`}>{title}</Link>
      ))}
    </div>
  );
};

export default FavoriteMovieList;
