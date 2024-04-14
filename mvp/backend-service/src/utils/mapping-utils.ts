import { MovieDTO } from '../api/v1/movies/movie-dto';
import { MovieAttributes } from '../api/v1/movies/movie-model';

export function mapMovieAttributesToDTO(movie: MovieAttributes): MovieDTO {
  return {
    id: movie.movie_id,
    title: movie.title,
    releaseYear: movie.releaseYear,
    createdAt: movie.createdAt?.toISOString(),
    updatedAt: movie.updatedAt?.toISOString(),
  };
}
