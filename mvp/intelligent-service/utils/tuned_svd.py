from surprise.prediction_algorithms import SVD

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


def get_tuned_svd() -> SVD:
    return SVD(
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
    )
