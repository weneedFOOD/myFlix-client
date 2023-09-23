import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import "./movie-view.css";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();

    const movie = movies.find((m) => m._id === movieId);
    
    return (
        <>
          <Row className="h-100  movie-view gy-5">

            <Col md={6} sm={12} className="text-center gy-5 px-4">
                <img src={movie?.ImagePath} className="poster-image" />
            </Col>

            <Col md={6} sm={12} className="movie-info px-4">
                <div>
                    <h1>{movie?.Title}</h1>
                </div>
                <div className="description-section">
                    <p>{movie?.Description}</p>
                </div>
                <div className='details-section'>
                    <span className='fw-bold'>Genre: </span>
                    <span>{movie?.Genre}</span>
                </div>
                <div>
                    <span className='fw-bold'>Release year: </span>
                    <span>{movie?.ReleaseYear}</span>
                </div>
                <div>
                    <Link to={`/`}>
                        <Button variant='danger' className="back-button">Back</Button>
                    </Link>
                </div>
            </Col>
          </Row>
       </>
    );
};  