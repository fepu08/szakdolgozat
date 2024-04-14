from collections import defaultdict


def get_top_n(predictions, n=10, rating_threshold=4.0):
    """
    Picks the best movie recommendations for each user.

                Args:
                        predictions: A list where each item is a prediction. Each prediction includes
                                a user's ID, a movie's ID, the actual rating, and the predicted rating.
                        n: How many top items to pick for each user (default is 10).
                        rating_threshold: The lowest rating a movie can have to be considered (default is 4.0).

    Returns:
                        A defaultdict of top N items for each user. For each user, the list includes items' IDs
                                and their predicted ratings, sorted from most liked to least.
    """
    top_n = defaultdict(list)

    for user_id, item_id, true_rating, estimated_rating, _ in predictions:
        if user_id not in top_n:
            top_n[user_id] = []

        if estimated_rating >= rating_threshold:
            top_n[user_id].append((item_id, estimated_rating))

    for user_id, user_ratings in top_n.items():
        user_ratings.sort(key=lambda x: x[1], reverse=True)
        top_n[user_id] = user_ratings[:n]

    return top_n


def get_top_n_as_movie_dict(predictions, n=10, rating_threshold=4.0):
    top_n = get_top_n(predictions, n, rating_threshold)
    top_n_dict = defaultdict(list)
    for user_id, tuples_list in top_n.items():
        top_n_dict[user_id] = [
            {"movieID": item_id, "estimation": estimated_rating}
            for item_id, estimated_rating in tuples_list
        ]
    return top_n_dict
