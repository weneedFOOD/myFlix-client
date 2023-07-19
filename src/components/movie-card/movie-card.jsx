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

// Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    }),
    Description: PropTypes.string,
    ReleaseYear: PropTypes.string,
    Genre: PropTypes.arrayOf(PropTypes.string).isRequired,
    Featured: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};