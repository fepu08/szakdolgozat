const cookieName = 'jwt';

export function setUpJwtCookie(userId: number, res: Response) {
	if (!process.env.JWT_SECRET) {
		throw new MissingEnvVarError('JWT_SECRET');
	}
	
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: process.env.NODE_ENV === 'production' ? '1h' : '30d',
	});
	
	res.cookie(cookieName, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
    	maxAge: process.env.NODE_ENV === 'production' ? 3_600_000 : 2_592_000_000,
	});
}