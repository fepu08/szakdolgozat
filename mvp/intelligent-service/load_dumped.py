from surprise.dump import load
from utils.top_n import get_top_n_as_movie_dict

print("Start recommender engine...")
print("Load predictions and algorithm...")
model_path = "dumped_tuned_svd_algorithm_and_predictions"
(predictions, algo) = load(model_path)
print("Algorithm and predictions are successfully loaded.")


def get_top_n(n: int, threshold: float):
    return get_top_n_as_movie_dict(predictions, n, threshold)
