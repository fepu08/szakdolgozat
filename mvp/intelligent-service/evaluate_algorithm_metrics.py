from utils.db_config import get_db_config
from data_handler import DataHandler
from data_provider.pg_data_provider import PGDataProvider
from surprise import SVD, NormalPredictor, KNNBasic, SVDpp
from metrics.algorithm_evaluation import AlgorithmEvaluator

import random
import numpy as np

np.random.seed(0)
random.seed(0)

print("Get parameters for DB connection...")
db_config = get_db_config()

print("Get DataHandler...")
data_handler = DataHandler(PGDataProvider(db_config))

evaluator = AlgorithmEvaluator(data_handler)
# Result of hyperparameter_optimization.py
tuned_params = {
    "n_factors": 150,
    "n_epochs": 20,
    "lr_all": 0.007,
    "reg_all": 0.02,
    "lr_bu": 0.005,
    "lr_bi": 0.005,
    "reg_bu": 0.05,
    "reg_bi": 0.05,
    "reg_pu": 0.05,
    "reg_qi": 0.05,
}

algorithms = [
    {"algorithm": NormalPredictor(), "name": "Random"},
    {"algorithm": KNNBasic(), "name": "KNNBasic"},
    {"algorithm": SVD(), "name": "SVD"},
    {
        "algorithm": SVD(
            n_factors=tuned_params["n_factors"],
            n_epochs=tuned_params["n_epochs"],
            lr_all=tuned_params["lr_all"],
            reg_all=tuned_params["reg_all"],
            lr_bu=tuned_params["lr_bu"],
            lr_bi=tuned_params["lr_bi"],
            reg_bu=tuned_params["reg_bu"],
            reg_bi=tuned_params["reg_bi"],
            reg_pu=tuned_params["reg_pu"],
            reg_qi=tuned_params["reg_qi"],
        ),
        "name": "Tuned SVD",
    },
    {"algorithm": SVDpp(), "name": "SVDpp"},
]

metrics = evaluator.evaluate_algorithms(algorithms)
