import numpy as np

class Metrics:
	# ...
	@staticmethod
	def novelty(recommendations, popularity_rankings):
		number_of_recommendations = len(next(iter(recommendations.values())))
		total_occurrences_of_all_items = sum(popularity_rankings.values())
		mean_self_information = []

		for userID, sublist in recommendations.items():
			self_information = 0
			for itemID in sublist:
				item_popularity = popularity_rankings.get(itemID, 1) / total_occurrences_of_all_items
				self_information += -np.log2(item_popularity)
			mean_self_information.append(self_information / number_of_recommendations)
	
		system_level_novelty = np.mean(mean_self_information)
		return system_level_novelty, mean_self_information