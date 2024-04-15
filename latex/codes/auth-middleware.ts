export const protect = asyncHandler(
	async (req: ExtendedRequest, _res: Response, next: NextFunction) => {
		if (!process.env.JWT_SECRET) {
			throw new MissingEnvVarError('JWT_SECRET');
		}
		
		const token = (req.cookies as { jwt?: string }).jwt;
		if (!token) {
			throw new UnauthorizedError('Not authorized, no token');
		}
		
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtAuthToken;
			if (!decoded.userId) {
				throw new Error('Missing field in token');
			}
			
			const user = await UserService.getUserById(decoded.userId);
			req.user = user;
			next();
		} catch (error) {
			throw new UnauthorizedError();
		}
	},
);
