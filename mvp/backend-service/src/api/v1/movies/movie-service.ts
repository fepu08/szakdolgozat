import ServiceError from '../../../errors/service-error';
import {
  mapMovieAttributesToDTO,
  rethrowSequelizeConnectionRefusedError,
  validateNumberParam,
} from '../../../utils';
import { MovieDAO } from './movie-dao';
import { MovieDTO } from './movie-dto';

export class MovieService {
  public static async getMovies(): Promise<MovieDTO[]> {
    console.log('MovieService.getMovies is called');
    const movies = await MovieDAO.getMovies();
    return movies.map((movie) => mapMovieAttributesToDTO(movie));
  }

  public static async getMoviesByArrayOfId(ids: number[]): Promise<MovieDTO[]> {
    console.log(
      `MovieService.getMoviesByArrayOfId is called with ${JSON.stringify(ids)}`,
    );
    try {
      const validParams = ids.map((id) => validateNumberParam(id));
      return (await MovieDAO.getMoviesByIdArray(validParams)).map((movie) =>
        mapMovieAttributesToDTO(movie),
      );
    } catch (err) {
      if (err instanceof TypeError) {
        throw new ServiceError('Provided array should only contains numbers');
      }
      rethrowSequelizeConnectionRefusedError(err);
      throw err;
    }
  }

  public static async getMovieById(id: number) {
    console.log(`MovieService.getMovieById is called with ${id}`);
    try {
      const validatedId = validateNumberParam(id);
      return await MovieDAO.getMovieById(validatedId);
    } catch (err) {
      if (err instanceof TypeError) {
        throw new ServiceError(`Provided movie id is not a number: ${id}`);
      }
      rethrowSequelizeConnectionRefusedError(err);
      throw err;
    }
  }
}
