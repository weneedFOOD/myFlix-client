import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Evil Dead II",
            image: "https://images.app.goo.gl/13CJrpyy3RPsK41K7",
            director: "Sam Raimi"
        },
        {
            id: 2,
            title: "It",
            image: "https://images.app.goo.gl/UshXHRQRU3hSCQmh6",
            director: "Andrés Muschietti"
        },
        {
            id: 3,
            title: "The Thing",
            image: "https://images.app.goo.gl/kN3cHdyjuLNoi7CS9",
            director: "John Carpenter"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
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
