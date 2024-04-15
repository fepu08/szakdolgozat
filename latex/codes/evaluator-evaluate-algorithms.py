import pandas as pd
from collections import defaultdict
from data_handler import DataHandler
from metrics.prediction_evaluation import Metrics
from utils.top_n import get_top_n
from utils.benchmark import TimeBenchmark

class AlgorithmEvaluator:
	# ...
	def evaluate_algorithms(self, algorithms, top_n=True, n=10, print_result=True, save_results=True, save_to="comparing-algorithms.csv"):
		metrics = defaultdict(dict)
		for algo in algorithms:
			algo_name = algo["name"]
			algorithm = algo["algorithm"]

			self.time_benchmark.start()
			algorithm.fit(self.data_handler.get_trainset())
			predictions = algorithm.test(self.data_handler.get_testset())

			mae = Metrics.mean_absolute_error(predictions)
			mse = Metrics.mean_squared_error(predictions)
			rmse = Metrics.root_mean_squared_error(predictions)
			metrics[algo_name] = {"MAE": mae, "MSE": mse, "RMSE": rmse}
		
			if top_n:
				algorithm.fit(self.data_handler.get_leave_one_out_trainset())
				predictions_for_left_out_items = algorithm.test(self.data_handler.get_leave_one_out_testset())        
				predictions_for_anti_testset = algorithm.test(self.data_handler.get_leave_one_out_anti_testset())
			
				top_n_predictions = get_top_n(predictions_for_anti_testset, n)

				hit_rate = Metrics.hit_rate(top_n_predictions, predictions_for_left_out_items)
				system_novelty, _ = Metrics.Novelty(top_n_predictions, self.data_handler.get_popularity_rankings())
			
				metrics[algo_name]["Hit-Rate"] = hit_rate
				metrics[algo_name]["Novelty"] = system_novelty
					
			self.time_benchmark.stop()
			metrics[algo_name]["Time Elapsed (seconds)"] = self.time_benchmark.elapsed_time
			metrics[algo_name]["Time Elapsed (minutes)"] = self.time_benchmark.elapsed_time / 60

		if print_result:
			self.print_metrics(metrics)
		if save_results:
			self.save_metrics_to_csv(metrics, save_to)
		return metrics
   
	# ...