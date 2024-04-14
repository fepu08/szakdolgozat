import psycopg2
from typing import List
from models.movie_model import MovieModel
from models.rating_model import RatingModel


class PGDataProvider:
    def __init__(self, db_config):
        self.__conn = psycopg2.connect(
            host=db_config["host"],
            port=db_config["port"],
            user=db_config["user"],
            password=db_config["password"],
            dbname=db_config["db_name"],
        )
        print("Database connection established")

    def __del__(self):
        self.__conn.close()
        print("Database connection closed")

    def get_movie_data(self) -> List[MovieModel]:
        movies = []
        with self.__conn.cursor() as cur:
            print("Getting movies data from DB...")
            cur.execute(
                """
            SELECT m.movie_id, m.title, m.release_year, array_agg(g.name) as genres
            FROM movies m
            LEFT JOIN movie_genres mg ON m.movie_id = mg.movie_id
            LEFT JOIN genres g ON mg.genre_id = g.genre_id
            GROUP BY m.movie_id
            """
            )

            for row in cur.fetchall():
                movie_id, title, release_year, genres = row
                movies.append(MovieModel(movie_id, title, release_year, genres))
        if len(movies) == 0:
            raise Exception("Movies table is empty")
        return movies

    def get_rating_data(self) -> List[RatingModel]:
        with self.__conn.cursor() as cur:
            print("Getting ratings data from DB...")
            cur.execute(
                """
            SELECT user_id, movie_id, rating, timestamp 
            FROM ratings"""
            )
            ratings = [
                RatingModel(row[0], row[1], row[2], row[3]) for row in cur.fetchall()
            ]
        if len(ratings) == 0:
            raise Exception("Ratings table is empty")
        return ratings
