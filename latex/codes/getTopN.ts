const getTopN = async () => {
	const savedRecommendation = localStorage.getItem('recommendations');
	try {
		let topN: MovieDTO[];
		if (savedRecommendation) {
			topN = JSON.parse(savedRecommendation);
		} else {
			topN = await Movies.getTopN();
			localStorage.setItem('recommendations', JSON.stringify(topN));
	}
	
		dispatch({
			type: ActionTypes.RECOMMENDATION,
			movies: topN,
		});
	} catch (err) {
		const error = handleError(err);
		dispatch({ type: ActionTypes.ERROR, error });
	}
};