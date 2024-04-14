import express from 'express';
import { protect } from '../../../middlewares/auth-middleware';
import RecommendationController from './recommendation-controller';

const recommendationRouter = express.Router();

recommendationRouter
  .route('/')
  .get(protect, RecommendationController.getTopNRecommendationForLoggedInUser);

export default recommendationRouter;
