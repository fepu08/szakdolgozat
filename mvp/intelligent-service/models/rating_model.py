class RatingModel:
    def __init__(self, userId, movieId, rating: float, timestamp):
        self.userId = userId
        self.movieId = movieId
        self.rating = rating
        self.timestamp = timestamp

    def __str__(self):
        return f"UserId: {self.userId}, MovieId: {self.movieId}, Rating: {self.rating}, Timestamp: {self.timestamp}"
