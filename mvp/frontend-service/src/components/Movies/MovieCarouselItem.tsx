import { MovieItem } from '../../models/MovieModel';
import { Card } from 'react-bootstrap';
import { getNiceTitle } from '../../utils';

type MovieCarouselItemProps = {
  movie: MovieItem;
  image: string;
};

const MovieCarouselItem = ({ movie, image }: MovieCarouselItemProps) => {
  const niceTitle = getNiceTitle(movie.title);
  return (
    <Card className="movie-carousel__item">
      <Card.Img variant="top" src={image} alt={niceTitle} />
      <Card.Body>
        <Card.Title>{niceTitle}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default MovieCarouselItem;
