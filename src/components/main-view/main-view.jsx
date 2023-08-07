import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] =useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
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

    if (!user) {
        return (
          <>
            <LoginView onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }} />
            or
            <SignupView />
          </>
        );
    }

    if (selectedMovie) {
        return (
          <>
            <button
              onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}
            >
              Logout
            </button>  
            <MovieView
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)} 
            />
          </>
        );
    }

    if (movies.length === 0) {
        return (
            <>
              <button
                onClick={() => {
                  setUser(null);
                  setToken(null);
                  localStorage.clear();
                }}
               >
                Logout
              </button>
              <div>The list is empty!</div> 
            </>
        );
    }    

    return (
        <div>
            <button
              onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}
            >
              Logout  
            </button>
            {movies.map((movie) => (
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
               />  
            ))}
       </div>
    ); 
};
