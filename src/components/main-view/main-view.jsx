import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("https://hora-flix-f4f11200119c.herokuapp.com/")
          .then((response) => response.json())
          .then((data) => {
            const moviesFromApi = data.map((movie) => {
                return {
                    _id: movie.key,
                    title: movie.title,
                    image: movie.image,
                    director: movie.director_name?.[0],
                    genre: movie.genre.map((genre) => genre.name)
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
                  key={movie.id}
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
               />  
            ))}
       </div>
    ); 
};
