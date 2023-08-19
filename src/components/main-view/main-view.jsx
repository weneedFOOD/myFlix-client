import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx";
import { Row, Col } from "react-bootstrap";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] =useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([0]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    
    useEffect(() => {
        if (!token) return;

        fetch("https://hora-flix-f4f11200119c.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
          .then((response) => response.json())
          .then((data) => {
            setMovies(movies);

            const moviesFromApi = data.map((movie) => {
                return {
                    _id: movie._id,
                    Title: movie.Title,
                    ImagePath: movie.ImagePath,
                    Director: {
                        Name: movie.Director.Name,
                        Bio: movie.Director.Bio,
                        Birth: movie.Director.Birth,
                        Death: movie.Director.Death
                    },
                    Description: movie.Description,
                    ReleaseYear: movie.ReleaseYear,
                    Genre: movie.Genre.Name
                };
            });

            setMovies(moviesFromApi);
          });
    }, [token]);

    return (
      <Row className="justify-content-md-center">
        {! user ? (
          <Col md={5}>
           <LoginView onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
           }} />
           or
           <SignupView />
          </Col>

        ) : selectedMovie ? (
         <Col md={8} style={{ border: "1px solid black" }}> 
           <MovieView
             style={{ border: "1px solid green"}}
             movie={selectedMovie}
             onBackClick={() => setSelectedMovie(null)}
           />
          </Col>

        ) : movie.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          <>
            {movie.map((movie) => (
             <Col className="mb-5" key={movie.id} md={3}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
              </Col>
            ))}
          </>
        )}
      </Row>
    );
  };