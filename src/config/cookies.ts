export const cookieOptions = {
	httpOnly: true,
	secure: true,
	sameSite: 'strict',
	maxAge: 60 * 60 * 1000
};

export const accessTokenCookieOptions = {
	...cookieOptions,
	maxAge: 15 * 60 * 1000
};
