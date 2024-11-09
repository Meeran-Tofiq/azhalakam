import { Pet } from "@prisma/client";
import userToken from "../utils/userToken";

export default class PetApi {
	private petUrl: String;

	constructor(baseUrl: String) {
		this.petUrl = baseUrl + "/pets";
	}

	/**
	 * Asynchronously fetches all pets associated with the current user.
	 * Requires an authentication token to be provided for the request.
	 * @throws {Error} If no token is provided, if the request fails, or if the response is not ok.
	 * @returns A Promise that resolves with the JSON data of all pets.
	 */
	async getAllPetsOfUser(): Promise<{ pets: Pet[] }> {
		if (!userToken.getToken())
			throw new Error(
				"No token provided for this request. Requires a token of a user to be set."
			);

		try {
			const response = await fetch(`${this.petUrl}/all`, {
				headers: { Authorization: `Bearer ${userToken.getToken()}` },
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
	 * Asynchronously fetches a pet with the given id.
	 * Requires either a pet object with an id, or a petId string.
	 * @throws {Error} If no pet is provided, if the request fails, or if the response is not ok.
	 * @returns A Promise that resolves with the JSON data of the pet.
	 */
	async getPetFromId(petId: string): Promise<{ pet: Pet }> {
		if (!petId) throw new Error("No pet provided for this request.");

		try {
			const response = await fetch(`${this.petUrl}/${petId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
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
	 * Asynchronously creates a new pet and assigns it to the user that the token provided
	 * belongs to. Requires a token of a user to be set.
	 * @param pet The data to create the pet with.
	 * @throws {Error} If the request fails or the response is not ok.
	 * @returns void
	 */
	async createPet(
		pet: Omit<Pet, "id" | "userId">
	): Promise<{ petId: string }> {
		if (!userToken.getToken())
			throw new Error(
				"No token provided for this request. Requires a token of a user to be set."
			);

		try {
			const response = await fetch(`${this.petUrl}/create`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userToken.getToken()}`,
				},
				body: JSON.stringify(pet),
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
	 * Asynchronously updates a pet with the given id with the given data.
	 * Requires a token of a user to be set.
	 * @param petId The id of the pet to update.
	 * @param pet The data to update the pet with.
	 * @throws {Error} If the request fails or the response is not ok.
	 * @returns The updated pet.
	 */
	async updatePet(petId: string, pet: Partial<Omit<Pet, "id">>) {
		if (!petId) throw new Error("No pet provided for this request.");

		try {
			const response = await fetch(`${this.petUrl}/${petId}/update`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(pet),
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
	 * Asynchronously deletes a pet with the given id.
	 * @param petId The id of the pet to delete.
	 * @throws {Error} If no pet ID is provided, if the request fails, or if the response is not ok.
	 * @returns A Promise that resolves with the JSON data of the deleted pet.
	 */
	async deletePet(petId: string) {
		if (!petId) throw new Error("No pet provided for this request.");

		try {
			const response = await fetch(`${this.petUrl}/${petId}/delete`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
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
