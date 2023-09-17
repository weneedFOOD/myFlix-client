import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.css";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();

    const movie = movies.find((m) => m.id === movieId);
    
    return (
        <div>
            <div>
                <img className="w-100" src={movie.image}/>
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>ReleaseYear: </span>
                <span>{movie.ReleaseYear}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Name}</span>
            </div>
            <div>
                <span>Bio: </span>
                <span>{movie.Bio}</span>
            </div>
            <div>
                <span>Birth: </span>
                <span>{movie.Birth}</span>
            </div>
            <Link to={`/`}>
                <button className="back-button">Back</button>
            </Link>
        </div>    
    );
};