// Here you import the PropTypes library
import PropTypes from "prop-types";

// The MovieCard function component
export const MovieCard = ({ movie, onMovieClick}) => {
    return (
        <div
         onClick={() => {
            onMovieClick(movie);
        }}
      >
        {movie.title}
      </div>  
    );
};

// Here is where we define all the props constraints for the BookCard
MovieCard.PropTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    director: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};