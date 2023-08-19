import { Col, Button } from "react-bootstrap";
import "./movie-view.css";

export const MovieView = ({ movie, onBackClick }) => {
    const {ImagePath, Title, Description, ReleaseYear, Genre, Director} = movie;
    const {Name, Bio, Birth} = Director;
    
    return (
        <Col>
            <div>
                <img src={ImagePath}/>
            </div>
            <div>
                <span>Title: </span>
                <span>{Title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{Description}</span>
            </div>
            <div>
                <span>ReleaseYear: </span>
                <span>{ReleaseYear}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{Genre}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{Name}</span>
            </div>
            <div>
                <span>Bio: </span>
                <span>{Bio}</span>
            </div>
            <div>
                <span>Birth: </span>
                <span>{Birth}</span>
            </div>
            <Button
              onClick={onBackClick}
              className="back-button"
              style={{ cursor: "pointer" }}
            >
              Back
            </Button>
        </Col>
    );
};