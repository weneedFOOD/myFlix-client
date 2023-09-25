import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx";
import { NavigationBar } from "../navigation-bar/navigation-bar.jsx";
import { ProfileView } from "../profile-view/profile-view.jsx";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] =useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        if (!token) {
          return;
        }

        fetch('https://hora-flix-f4f11200119c.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}`}
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
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
          })
          .catch((error) => {
            console.error(error);
          });
    }, [token]);

    return (
      <BrowserRouter>
        <NavigationBar
          user={user}
          onLoggedOut={() => {
           setUser(null);
           setToken(null);
           localStorage.clear();
        }}
      />

      <Row className='justify-content-md-center cards-container'>
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }}/>
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie._id} md={3}>
                        <MovieCard 
                           movie={movie}
                           user={user}
                           token={token}
                           setUser={setUser}
                          />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
               {!user ? (
                 <Navigate to="/login" replace />
               ) : (
                 <Col md={5}>
                  <ProfileView
                     movies={movies}
                     user={user}
                     token={token}
                     setUser={setUser}
                     />
                 </Col> 
               )}
              </>
            }
          />

        </Routes>

      </Row>
    </BrowserRouter>
  );
};