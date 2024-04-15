#!/bin/sh
if [ ! -f "./dumped_tuned_svd_algorithm_and_predictions" ]; then
  echo "dumped_tuned_svd_algorithm_and_predictions not found, running recommender.py..."
  python3 recommender.py
fi

exec "$@"
