import random
import numpy as np
from utils.db_config import get_db_config
from utils.tuned_svd import get_tuned_svd
from surprise.dump import dump
from data_handler import DataHandler
from data_provider.pg_data_provider import PGDataProvider

""" 
  This script trains a tuned SVD model on LOOCV testset using tuned parameters and 
    	- generates predictions using LOOCV anti testset
    	- and dump both algorithm and predictions using surprise.dump and save it into 'dumped_predictions_and_algorithm' file
"""

np.random.seed(0)
random.seed(0)

print("Get parameters for DB connection...")
db_config = get_db_config()

print("Get DataHandler...")
data_handler = DataHandler(PGDataProvider(db_config))

print("Get data...")
trainset = data_handler.get_leave_one_out_trainset()
anti_testset = data_handler.get_leave_one_out_anti_testset()

print("Set up algorithm...")
tunedSVD = get_tuned_svd()

print("Train tuned SVD...")
tunedSVD.fit(trainset)

print("Generate predictions...")
predictions = tunedSVD.test(anti_testset)

print("Dump predictions and algorithm...")
dump("dumped_tuned_svd_algorithm_and_predictions", predictions, tunedSVD, 1)

print("Finished.")
