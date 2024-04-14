import axios from 'axios';
import { RecommendationDTO } from './recommendation-dto';
import { UserDAO } from '../users/user-dao';
import { MovieService } from '../movies/movie-service';
import { MovieDTO } from '../movies/movie-dto';
import {
  intelligentServiceRecommendationsURL,
  validateNumberParam,
} from '../../../utils';
import NotFoundError from '../../../errors/not-found-error';
import ServiceError from '../../../errors/service-error';

export class RecommendationService {
  public static async getTopNRecommendationsForUserById(
    id: number,
  ): Promise<MovieDTO[]> {
    console.log(
      `RecommendationService.getTopNRecommendationsForUserById is called with ${id}`,
    );

    try {
      const validatedId = validateNumberParam(id);
      const user = await UserDAO.getUserById(validatedId);
      if (!user) {
        throw new NotFoundError(`User with ID ${validatedId} not found`);
      }
      const recommendations = await axios.get<RecommendationDTO[]>(
        `${intelligentServiceRecommendationsURL}/${validatedId}`,
      );
      const recIds: number[] = recommendations.data.map((rec) =>
        validateNumberParam(rec.movieID),
      );
      return MovieService.getMoviesByArrayOfId(recIds);
    } catch (err) {
      if (err instanceof TypeError) {
        throw new ServiceError(`Provided user id is not a number: ${id}`);
      }
      throw err;
    }
  }
}
