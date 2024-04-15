public static loginUser = asyncHandler(
	async (req: Request, res: Response, _next: NextFunction) => {
		const userDTO = validateRequestBody(req.body);
		const user = await UserService.loginUser(userDTO);
		
		if (user && user.id) {
			setUpJwtCookie(user.id, res);
			res.status(200).json(user);
			return;
		}
		
		throw new UnauthorizedError();
	},
);