from utils.db_config import get_db_config
from data_handler import DataHandler
from data_provider.pg_data_provider import PGDataProvider
from surprise import SVD
from surprise.model_selection import GridSearchCV
from utils.benchmark import TimeBenchmark
import pandas as pd

import random
import numpy as np

np.random.seed(0)
random.seed(0)

time_benchmark = TimeBenchmark()

print("Get parameters for DB connection...")
db_config = get_db_config()

print("Get DataHandler...")
data_handler = DataHandler(PGDataProvider(db_config))

dataset = data_handler.get_ratings_dataset()
# Reference: https://surprise.readthedocs.io/en/stable/getting_started.html#tune-algorithm-parameters-with-gridsearchcv
print("Searching for the best parameters...")
param_grid = {
    "n_factors": [50, 100, 150],
    "n_epochs": [5, 10, 20],
    "lr_all": [0.002, 0.005, 0.007],
    "reg_all": [0.02, 0.05, 0.1],
    "lr_bu": [0.002, 0.005],
    "lr_bi": [0.002, 0.005],
    "reg_bu": [0.02, 0.05],
    "reg_bi": [0.02, 0.05],
    "reg_pu": [0.02, 0.05],
    "reg_qi": [0.02, 0.05],
}


time_benchmark.start()
gs = GridSearchCV(SVD, param_grid, measures=["rmse", "mae"], cv=5)
gs.fit(dataset)
time_benchmark.stop()

results_df = pd.DataFrame(
    {
        "Metric": ["rmse", "mae"],
        "Best Score": [gs.best_score["rmse"], gs.best_score["mae"]],
        "Best Parameters": [str(gs.best_params["rmse"]), str(gs.best_params["mae"])],
    }
)

print(results_df)

path = "hyperparameter-tuning-for-svd.csv"
results_df.to_csv(path, index=False)
print("Results saved to ", path)

with open(path, "a") as f:
    f.write(f"\nTime Elapsed (seconds),{time_benchmark.elapsed_time}")
