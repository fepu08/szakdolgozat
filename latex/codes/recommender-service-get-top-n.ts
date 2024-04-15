public static async getTopNRecommendationsForUserById(id: number): Promise<MovieDTO[]> {
	try {
		const validatedId = validateNumberParam(id);
		const user = await UserDAO.getUserById(validatedId);
		if (!user) {
			throw new NotFoundError(`User with ID ${validatedId} not found`);
		}
		const recommendations = await axios.get<RecommendationDTO[]>(
		`${intelligentServiceRecommendationsURL}/${validatedId}`,
		);
		const recIds: number[] = recommendations.data.map((rec) =>
		validateNumberParam(rec.movieID),
		);
		return MovieService.getMoviesByArrayOfId(recIds);
	} catch (err) {
		if (err instanceof TypeError) {
			throw new ServiceError(`Provided user id is not a number: ${id}`);
		}
		throw err;
	}
}