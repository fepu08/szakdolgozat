import pandas as pd
from surprise.dump import load
from data_handler import DataHandler
from data_provider.pg_data_provider import PGDataProvider
from utils.db_config import get_db_config
from utils.benchmark import TimeBenchmark
from utils.top_n import get_top_n_as_movie_dict
from utils.tuned_svd import get_tuned_svd

cold_start_timer = TimeBenchmark()
dump_timer = TimeBenchmark()

print("Get top-n from dump file...")
dump_timer.start()
(predictions, algorithm) = load("dumped_tuned_svd_algorithm_and_predictions")
top_n = get_top_n_as_movie_dict(predictions)
dump_timer.stop()

print("Get top-n w cold start...")
cold_start_timer.start()

print("Get data...")
data_handler = DataHandler(PGDataProvider(get_db_config()))
trainset = data_handler.get_leave_one_out_trainset()
anti_testset = data_handler.get_leave_one_out_anti_testset()

print("Train algorithm...")
tunedSVD = get_tuned_svd()
tunedSVD.fit(trainset)

print("Get predictions...")
cold_start_predictions = tunedSVD.test(anti_testset)

print("Get top-n from predictions...")
cold_start_top_n = get_top_n_as_movie_dict(cold_start_predictions)
cold_start_timer.stop()

benchmark_df = pd.DataFrame(
    {
        "Elapsed time in seconds": [
            dump_timer.elapsed_time,
            cold_start_timer.elapsed_time,
        ]
    },
    index=["Loaded data", "Cold Start"],
)
benchmark_df.to_csv("benchmark-loaded-and-fresh-model.csv", index=True)
print(benchmark_df)
