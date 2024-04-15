import pandas as pd
from collections import defaultdict
from data_handler import DataHandler
from metrics.prediction_evaluation import Metrics
from utils.top_n import get_top_n
from utils.benchmark import TimeBenchmark

class AlgorithmEvaluator:
	def __init__(self, data_handler: DataHandler):
		self.data_handler = data_handler
		self.time_benchmark = TimeBenchmark()
  
	def evaluate_algorithms(self, algorithms, top_n=True, n=10, print_result=True, save_results=True, save_to="comparing-algorithms.csv"):
		# ...

	def print_metrics(self, metrics):
		# ...
	
	def save_metrics_to_csv(self, metrics, path):
		# ...
		
	def __prepare_metrics_df(self, metrics):
		# ...