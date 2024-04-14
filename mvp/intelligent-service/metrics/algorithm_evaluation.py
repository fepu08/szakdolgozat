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

    def evaluate_algorithms(
        self,
        algorithms,
        top_n=True,
        n=10,
        print_result=True,
        save_results=True,
        save_to="comparing-algorithms.csv",
    ):
        """
        Evaluates multiple recommendation algorithms and calculates metrics for each.

        Args:
                        algorithms: A list of dictionaries, each containing an 'algorithm' object and its name.
                        print_results (bool, optional): If True, print the metrics using pandas DataFrame. Defaults to True.

        Returns:
                        A dictionary where each key is the algorithm name and its value is another dictionary
                                containing the metrics for that algorithm.
        """
        metrics = defaultdict(dict)
        for algo in algorithms:
            algo_name = algo["name"]
            algorithm = algo["algorithm"]

            print(f"Evaluating {algo_name}...")
            self.time_benchmark.start()
            print("Fitting split validation trainset on algorithm...")
            algorithm.fit(self.data_handler.get_trainset())
            predictions = algorithm.test(self.data_handler.get_testset())

            print("Calculating MAE...")
            mae = Metrics.mean_absolute_error(predictions)
            print("Calculating MSE...")
            mse = Metrics.mean_squared_error(predictions)
            print("Calculating RMSE...")
            rmse = Metrics.root_mean_squared_error(predictions)
            metrics[algo_name] = {"MAE": mae, "MSE": mse, "RMSE": rmse}

            if top_n:
                print("\tUsing top-N")
                print("\tFitting leave on out trainset on algorithm...")
                algorithm.fit(self.data_handler.get_leave_one_out_trainset())

                print("\tGetting predictions for LOOCV testset...")
                predictions_for_left_out_items = algorithm.test(
                    self.data_handler.get_leave_one_out_testset()
                )

                print("\tGetting predictions for generating Top-N recommendations...")
                predictions_for_anti_testset = algorithm.test(
                    self.data_handler.get_leave_one_out_anti_testset()
                )

                print("\tGetting top-N recommendations...")
                top_n_predictions = get_top_n(predictions_for_anti_testset, n)

                print("\tCalculating Hit Rate...")
                hit_rate = Metrics.hit_rate(
                    top_n_predictions, predictions_for_left_out_items
                )
                print("\tCalculating Novelty...")
                system_novelty, _ = Metrics.novelty(
                    top_n_predictions, self.data_handler.get_popularity_rankings()
                )

                metrics[algo_name]["Hit-Rate"] = hit_rate
                metrics[algo_name]["Novelty"] = system_novelty

            self.time_benchmark.stop()
            metrics[algo_name][
                "Time Elapsed (seconds)"
            ] = self.time_benchmark.elapsed_time
            metrics[algo_name]["Time Elapsed (minutes)"] = (
                self.time_benchmark.elapsed_time / 60
            )

        if print_result:
            self.print_metrics(metrics)
        if save_results:
            self.save_metrics_to_csv(metrics, save_to)
        return metrics

    def print_metrics(self, metrics):
        print("###############\n")
        metrics_df = self.__prepare_metrics_df(metrics)
        print(metrics_df)

    def save_metrics_to_csv(self, metrics, path):
        metrics_df = self.__prepare_metrics_df(metrics)
        metrics_df.to_csv(path, index=False)

    def __prepare_metrics_df(self, metrics):
        metrics_df = pd.DataFrame(metrics).T.reset_index()
        metrics_df.rename(columns={"index": "Algorithm Name"}, inplace=True)
        return metrics_df
