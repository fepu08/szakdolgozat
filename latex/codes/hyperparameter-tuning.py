param_grid = {
	'n_factors': [50, 100, 150],
	'n_epochs': [5, 10, 20],
	'lr_all': [0.002, 0.005, 0.007],
	'reg_all': [0.02, 0.05, 0.1],
	'lr_bu': [0.002, 0.005],
	'lr_bi': [0.002, 0.005],
	'reg_bu': [0.02, 0.05],
	'reg_bi': [0.02, 0.05],
	'reg_pu': [0.02, 0.05],
	'reg_qi': [0.02, 0.05]
}
gs = GridSearchCV(SVD, param_grid, measures=["rmse", "mae"], cv=5)
gs.fit(dataset)

gs.best_score['rmse']
gs.best_params['rmse']