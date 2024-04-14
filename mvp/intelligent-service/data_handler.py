from surprise import Dataset, Reader, KNNBaseline
from surprise.model_selection import train_test_split, LeaveOneOut
import pandas as pd
from collections import defaultdict
from data_provider.data_provider_base import DataProviderBase


class DataHandler:
    __reader = Reader(rating_scale=(1, 5))

    def __init__(self, data_provider: DataProviderBase):
        self.__data_provider = data_provider
        self.__movie_data = self.__data_provider.get_movie_data()
        self.__ratings_data = self.__data_provider.get_rating_data()

        """
            - The training set is used for learning.
            - The anti-test set is used for predicting ratings of unknown user-item pairs, essential for generating recommendations.
            - The train/test split method evaluates model accuracy and generalization by comparing predicted ratings against actual ratings in the test set.
        """

        self.__ratings_dataset = self.get_ratings_dataset()
        self.__trainset, self.__testset = train_test_split(
            self.__ratings_dataset, test_size=0.25, random_state=1
        )
        self.__full_trainset = self.__ratings_dataset.build_full_trainset()
        self.__full_anti_testset = self.__full_trainset.build_anti_testset()

        # Build a "leave one out" train/test split for evaluating top-N recommenders
        # And build an anti-test-set for building predictions
        LOOCV = LeaveOneOut(n_splits=1, random_state=1)
        for train, test in LOOCV.split(self.__ratings_dataset):
            self.__LOOCV_trainset = train
            self.__LOOCV_testset = test

        self.__LOOCV_anti_testset = self.__LOOCV_trainset.build_anti_testset()

        self.__popularity_rankings = self.__get_popularity_rankings_for_movies()

    def get_trainset(self):
        return self.__trainset

    def get_testset(self):
        return self.__testset

    def get_full_trainset(self):
        return self.__full_trainset

    def get_full_anti_testset(self):
        return self.__full_anti_testset

    def get_leave_one_out_trainset(self):
        return self.__LOOCV_trainset

    def get_leave_one_out_testset(self):
        return self.__LOOCV_testset

    def get_leave_one_out_anti_testset(self):
        return self.__LOOCV_anti_testset

    def get_ratings_dataset(self):
        print("Get ratings dataset...")
        data = [
            (rating.userId, rating.movieId, rating.rating)
            for rating in self.__ratings_data
        ]
        df = pd.DataFrame(data, columns=["userId", "movieId", "rating"])
        return Dataset.load_from_df(
            pd.DataFrame(df, columns=["userId", "movieId", "rating"]),
            reader=self.__reader,
        )

    def get_user_ratings(self, user_id: int):
        print("Get user ratings...")
        user_ratings = []
        hit_user = False
        for rating in self.__ratings_data:
            if user_id == rating.userId:
                movieID = rating.movieId
                rating = rating.rating
                user_ratings.append((movieID, rating))
                hit_user = True
            if hit_user:
                break

        return user_ratings

    def get_popularity_rankings(self):
        return self.__popularity_rankings

    def __get_popularity_rankings_for_movies(self) -> defaultdict[int, int]:
        """
        Determines the popularity ranking of movies based on the number of ratings each movie received.

        Returns:
            defaultdict[int, int]: A defaultdict of int, where each key is a `movieId` and each value is the popularity rank
            of that movie. Movies with more ratings are ranked higher (i.e., have a lower rank number).
            The rankings are 1-based, meaning the most popular movie has a ranking of 1.
        """
        print("Get popularity rankings...")
        ratings = self.__get_number_of_ratings_for_movies()
        rankings = defaultdict(int)
        rank = 1

        for movie_id, _ in sorted(ratings.items(), key=lambda x: x[1], reverse=True):
            rankings[movie_id] = rank
            rank += 1

        return rankings

    def __get_number_of_ratings_for_movies(self) -> defaultdict[int, int]:
        """
        Calculates the number of ratings each movie has received.

        Returns:
            defaultdict[int, int]: A defaultdict of int, mapping each `movieId` to its corresponding count of ratings received.
            The default value for any movie not present in the data is set to 0.
        """
        num_of_ratings_for_movies = defaultdict(int)
        for rating in self.__ratings_data:
            num_of_ratings_for_movies[rating.movieId] += 1
        return num_of_ratings_for_movies
