class MovieModel:
    def __init__(self, movieId, title, releaseYear, genres):
        self.movieId = movieId
        self.title = title
        self.releaseYear = releaseYear
        self.genres = genres

    def __str__(self):
        return f"MovieID: {self.movieId}, Title: {self.title}, Year: {self.releaseYear}, Genres: {self.genres}"
