import csv
import os

from data_provider.data_provider_base import DataProviderBase
from models.movie_model import MovieModel
from models.rating_model import RatingModel

root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))


class CSVDataProvider(DataProviderBase):
    @staticmethod
    def __read_csv_data(self, file_path, model_class):
        data = []
        with open(file_path, "r", newline="", encoding="utf-8") as csvfile:
            reader = csv.DictReader(csvfile)

            for row in reader:
                item = model_class(**row)
                data.append(item)

        return data

    def get_movie_data(self):
        file_path = os.path.join(root_dir, "data", "ml-latest-small", "movies.csv")
        return self.__read_csv_data(file_path, MovieModel)

    def get_rating_data(self):
        file_path = os.path.join(root_dir, "data", "ml-latest-small", "ratings.csv")
        return self.__read_csv_data(file_path, RatingModel)
