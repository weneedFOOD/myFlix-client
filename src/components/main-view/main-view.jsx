import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("https://hora-flix-f4f11200119c.herokuapp.com/movies")
          .then((response) => response.json())
          .then((data) => {
            console.log("movies from api:", data);
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
    }, []);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        let similarMovies = movies.filter(/* Complete the logic of filtering */) ;
        return (
           <> 
            <MovieView movie={selectedMovie} onBackClick={() => { setSelectedMovie(null); }} />
            <hr />
            <h2>Similar Movies</h2>
            {similarMovies.map(/* Complete the logic to render a MovieCard for each movie object in the array */ )}
           </> 
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
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
