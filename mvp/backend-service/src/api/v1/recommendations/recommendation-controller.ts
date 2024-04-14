import axios from 'axios';
import { Request, Response } from 'express';
import { RecommendationService } from './recommendation-service';
import asyncHandler from '../../../middlewares/async-handler-middleware';
import { ExtendedRequest } from '../../../models/extended-request-model';
import UnauthorizedError from '../../../errors/unauthorized-error';
import { intelligentServiceBaseURL } from '../../../utils';

export default class RecommendationController {
  /**
   * @desc 		Get Top-N Recommendation for logged in user using its ID
   * @route 	GET /api/v1/recommendations
   * @access 	Private
   */
  static getTopNRecommendationForLoggedInUser = asyncHandler(
    async (req: ExtendedRequest, res: Response) => {
      console.log(
        `RecommendationController.getTopNRecommendationForLoggedInUser is called`,
      );

      if (!req.user) {
        throw new UnauthorizedError('No user is logged in.');
      }

      const data =
        await RecommendationService.getTopNRecommendationsForUserById(
          req.user.user_id,
        );
      res.status(200).json(data);
    },
  );
}
