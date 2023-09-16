// Here you import the PropTypes library
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-card.css";

// The MovieCard function component
export const MovieCard = ({ movie, user, token, setUser }) => {

  const [isFavorite, setIsFavorite] = useState (
    user.addFavoriteMovie.includes(movie._id)
  )
    
  const addFavoriteMovie = () => {
    fetch(
      `https://hora-flix-f4f11200119c.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert('Failed');
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert('successfully added to favorites');
          localStorage.setItem("user", JSON.stringify(user)); // updating user on local storage
          setUser(user); // updating the react application
          setIsFavorite(true);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  const removeFavoriteMovie = () => {
    fetch(
      `https://hora-flix-f4f11200119c.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert("Successfully deleted from favorites");
          localStorage.setItem("user", JSON.stringify(user)); // updating user on local storage
          setUser(user); // updating the react application
          setIsFavorite(false);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

    return (
      <>
        <Card className="h-100">
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
              {isFavorite ? (
                <Button variant="Danger" onClick={removeFavoriteMovie}>
                  Remove from favorites
                </Button>
              ) : (
                <Button variant="primary" onClick={addFavoriteMovie}>
                  Add to favorites
                </Button>
              )}
            </Card.Body>

            <Card.Body>
               <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                <Button className="info-button" variant="outline-light">Info</Button>
               </Link>
             </Card.Body>
         </Card>
      </>    
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