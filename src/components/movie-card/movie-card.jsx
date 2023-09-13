// Here you import the PropTypes library
import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link, Button } from "react-router-dom";

import "./movie-card.css";

// The MovieCard function component
export const MovieCard = ({ movie, onMovieClick}) => {
    return (
        <Card>
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
               <Card.Title>{movie.Title}</Card.Title>
               <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                <Button variant="link">Open</Button>
               </Link>
             </Card.Body>
         </Card>  
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
    Genre: PropTypes.string
  }).isRequired
};