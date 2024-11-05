class UserToken {
	private token: string | null = null;

	/**
	 * Sets the authentication token for the user.
	 * @param token The token to set for authenticated requests.
	 */
	setToken(token: string) {
		this.token = token;
	}

	/**
	 * Gets the authentication token for the user.
	 * @returns The token for authenticated requests, or null if it is unset.
	 */
	getToken(): string | null {
		return this.token;
	}
}

const userToken = new UserToken();

export default userToken;
