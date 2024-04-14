from typing import List
from models.movie_model import MovieModel
from models.rating_model import RatingModel


class DataProviderBase(object):
    def get_movie_data(self) -> List[MovieModel]:
        """Returns a List of MovieModel objects from the data source"""
        print("Retrieve movies from datasource...")
        raise NotImplementedError("get_data method must be implemented in subclasses")

    def get_rating_data(self) -> List[RatingModel]:
        """Returns a List of RatingModel objects from the data source"""
        print("Retrieve ratings from datasource...")
        raise NotImplementedError(
            "get_rating_data method must be implemented in subclasses"
        )
