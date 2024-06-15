import Carousel from 'react-multi-carousel';
import MovieCarouselItem from './MovieCarouselItem';
import { MovieDTO } from '../../models/MovieModel';
import { CustomCarouselButtonGroup } from './MovieCarouselCustomElements';

const MovieCarousel = ({
  header,
  movies,
}: {
  header: string;
  movies: MovieDTO[];
}) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 9999, min: 1024 },
      items: 6,
      slidesToSlide: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 800 },
      items: 4,
      slidesToSlide: 4,
    },
    small_tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="movie-carousel__container">
      <h2 className="movie-carousel__header">{header}</h2>
      <Carousel
        className={'movie-carousel'}
        responsive={responsive}
        showDots={true}
        renderButtonGroupOutside={true}
        customButtonGroup={<CustomCarouselButtonGroup />}
      >
        {movies.map((movie, index) => (
          <MovieCarouselItem
            key={index}
            movie={movie}
            image={`./hacker-havock-${getIndex(index)}.jpg`}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default MovieCarousel;

// Because I only generated 6 pics we need to get somehow the index of the image
// because image URI is like this: hacker-havock-{index}.jpg
function getIndex(index: number): number {
  let idx = index + 1;
  if (idx > 6) {
    idx = idx - 6;
  }
  return idx % 7;
}
