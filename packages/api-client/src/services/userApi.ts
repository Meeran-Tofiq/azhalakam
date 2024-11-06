import { User } from "@prisma/client";
import userToken from "../utils/userToken";

export type RegisterUserInput = Omit<
	User,
	"bio" | "locationId" | "serviceProviderId" | "id"
> &
	Partial<Pick<User, "bio" | "locationId" | "serviceProviderId">>;

export type UpdateUserInput = Partial<Omit<User, "id">>;

export default class UserApi {
	private userUrl: String;

	constructor(baseUrl: String) {
		this.userUrl = baseUrl + "/users";
	}

	/**
	 * Asynchronously fetches all users from the API.
	 * @throws {Error} If the request fails or the response is not ok.
	 * @returns A Promise that resolves with the JSON data of all users.
	 */
	async getAll() {
		try {
			const response = await fetch(`${this.userUrl}/all`);

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Asynchronously fetches the user that the current token belongs to.
	 * Requires an authentication token to be provided for the request.
	 * @throws {Error} If the request fails or the response is not ok.
	 * @returns A Promise that resolves with the JSON data of the user.
	 */
	async getUserFromToken() {
		if (!userToken.getToken())
			throw new Error("No token provided for this authenticated request.");

		try {
			const response = await fetch(`${this.userUrl}/me`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userToken.getToken()}`,
				},
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Asynchronously registers a new user with the provided data.
	 * @param user The user data to register.
	 * @throws {Error} If the registration request fails or the response is not ok.
	 * @returns A Promise that resolves with the JSON data of the registered user.
	 */
	async register(user: RegisterUserInput) {
		try {
			const response = await fetch(`${this.userUrl}/create`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			const json = await response.json();
			userToken.setToken(json.token);

			return json;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Logs in a user using the given email and password. The user is verified
	 * with the API and a token is returned.
	 * @param email The email of the user to log in.
	 * @param password The password of the user to log in.
	 * @throws {Error} If the request fails or the response is not ok.
	 * @returns A Promise that resolves with the JSON data of the user and a token.
	 */
	async loginWithEmail(email: string, password: string) {
		try {
			const response = await fetch(`${this.userUrl}/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			const json = await response.json();
			userToken.setToken(json.token);

			return json;
		} catch (error) {
			throw error;
		}
	}

	// function to register a user

	/**
	 * Logs in a user using the given username and password. The user is verified
	 * with the API and a token is returned.
	 * @param username The username of the user to log in.
	 * @param password The password of the user to log in.
	 * @throws {Error} If the request fails or the response is not ok.
	 * @returns A Promise that resolves with the JSON data of the user and a token.
	 */
	async loginWithUsername(username: string, password: string) {
		try {
			const response = await fetch(`${this.userUrl}/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			const json = await response.json();
			userToken.setToken(json.token);

			return json;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Asynchronously updates the user information by sending a PUT request to the API.
	 * Requires an authentication token to be provided for the request.
	 * @param user The updated user data to be sent in the request body.
	 * @throws {Error} If the request fails or the response is not successful.
	 * @returns A Promise that resolves with the JSON data of the updated user.
	 */
	async updateUser(user: UpdateUserInput) {
		if (!userToken.getToken())
			throw new Error("No token provided for this authenticated request.");

		try {
			const response = await fetch(`${this.userUrl}/me/update`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userToken.getToken()}`,
				},
				body: JSON.stringify(user),
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Asynchronously deletes the user that the current token belongs to by sending a DELETE
	 * request to the API. Requires an authentication token to be provided for the request.
	 * @throws {Error} If the request fails or the response is not successful.
	 * @returns A Promise that resolves with the JSON data of the deleted user.
	 */
	async deleteUser() {
		if (!userToken.getToken())
			throw new Error("No token provided for this authenticated request.");

		try {
			const response = await fetch(`${this.userUrl}/me/delete`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userToken.getToken()}`,
				},
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}
}
