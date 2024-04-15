from data_handler import DataHandler
from data_provider.pg_data_provider import PGDataProvider
from data_provider.csv_data_prodived import CSVDataProvider


pg_data_handler = DataHandler(PGDataProvider(db_config))
csv_data_handler = DataHandler(CSVDataProvider())

pg_evaluator = AlgorithmEvaluator(data_handler)
csv_evaluator = AlgorithmEvaluator(data_handler)