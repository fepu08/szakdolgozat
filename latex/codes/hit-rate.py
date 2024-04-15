class Metrics:
	# ...
	@staticmethod
	def hit_rate(top_n_recommendations, predictions_for_left_out_items) -> float:
		num_of_hits = 0
		total = len(predictions_for_left_out_items)
		
		if(total < 1):
			return None

		for user_id, left_out_movie_id, r_ui, est, _ in predictions_for_left_out_items:
			predicted_movies = [movie_id for movie_id, _ in top_n_recommendations[user_id]]
			if left_out_movie_id in predicted_movies:
				num_of_hits += 1

		return num_of_hits / total