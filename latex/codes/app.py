import os
from flask import Flask, jsonify, make_response
from load_dumped import get_top_n

app = Flask(__name__)

num_of_top_n = int(os.environ.get('NUM_OF_TOP_N_ITEMS', 10))
rating_threshold = float(os.environ.get('RATING_THRESHOLD', 4.0))

top_n = get_top_n(num_of_top_n, rating_threshold)

@app.route("/api/v1/predictions/<user_id>")
def get_top_n_prediction_for_user(user_id):
	user_ratings = top_n.get(int(user_id), None)
	if user_ratings is None:
		return make_response(jsonify({"message": f"No recommendations for user with id: {user_id}"}), 404)
	return make_response(jsonify(user_ratings), 200)

if __name__ == "__main__":
	app.run(debug=True)