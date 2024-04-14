import { Op } from 'sequelize';
import { MovieAttributes, MovieModel } from './movie-model';

export class MovieDAO {
  public static async getMovies() {
    console.log(`MovieDAO.getMovies is called`);
    const movies = await MovieModel.findAll();
    return movies.map((movie) => movie.get());
  }

  public static async getMovieById(id: number) {
    console.log(`MovieDAO.getMovieById is called`);
    const movie = await MovieModel.findOne({
      where: {
        movie_id: id,
      },
    });
    return movie;
  }

  public static async getMoviesByIdArray(
    idArray: number[],
  ): Promise<MovieAttributes[]> {
    console.log(`MovieDAO.getMoviesByIdArray is called`);
    const movies = await MovieModel.findAll({
      where: {
        movie_id: {
          [Op.in]: idArray,
        },
      },
    });
    return movies.map((movie) => movie.get());
  }
}
