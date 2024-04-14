# Intelligent Service

## Prerequisites

Python3 is available on your computer, use [this](https://www.python.org/downloads/) link to download.

## Virtual environment

My recommendation is to use virtual environment for running any of the scripts.
To achieve this, first time you need to create a virtual environment and install packages. After this you can just activate the virtual environment using `source venv/Scripts/activate` command and you are ready to use any scripts in this service. To deactivate run `deactivate` command.

### Activating virtual environment and install packages

1. `python -m pip install --upgrade pip`
2. `python -m venv venv`
3. Activate _venv_, if you use UNIX like operating systems or GitBash on Windows: `source venv/Scripts/activate`
4. `pip install -r requirements.txt`

## Start app (for development)

This service is a part of an application, so it only makes sense to run with other services as well. You can do it by using **Docker Compose**. Find more information in the parent's `README.md`. However, if you'd like, you can run Flask app separately.

### On your host machine

Run `python -m flask run --host=0.0.0.0` in your terminal.

### With Docker

Run the following commands in your terminal:

1. `docker build -t <image-name> .`
2. `docker run -d˙<image-name>`

## [Required] Pre-create and save trained algorithm and prediction

To be able to use the flask app, first you need to run either script:

- `recommender.py`: It trains _tuned SVD_ algorithm and generates predictions. Saves both.
- `recommender-svdpp.py`: It trains _SVD++_ algorithm and generates predictions. Saves both.

After this, you need to provide generated file's path to `load_dumped.py` script for the load function `(predictions, algo) = load(model_path)`

## Benchmark of dumped and freshly trained model time consumption

In order to create a time benchmark of dumped and freshly trained model you can use one of the provided scripts :

- `benchmark-loaded-and-fresh-model.py`: It checks _Tuned SVD_ algorithm. Also it requires to run `recommender.py` script first.
- `benchmark-loaded-and-fresh-model-svdpp.py`: It _checks SVD++_ algorithm. Also it requires to run `recommender-svdpp.py` script first.

or create your own, based on these.

These benchmarks gives you the time it takes to get a trained algorithm and a top-N prediction for every user in the dataset. The provided scripts use `surprise.dump` module to save and load the algorithms and predictions.
