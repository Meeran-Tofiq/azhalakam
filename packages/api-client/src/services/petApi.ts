import userToken from "../utils/userToken";
import {
	CreatePetInputs,
	CreatePetResponse,
	DeletePetInputs,
	DeletePetResponse,
	GetAllUserPetsResponse,
	GetPetInputs,
	GetPetResponse,
	UpdatePetInputs,
	UpdatePetResponse,
} from "@api-types/Pet";

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
	async getAllPetsOfUser(): Promise<GetAllUserPetsResponse> {
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
	 * @param id The id of the pet to retrieve
	 * @throws {Error} If no pet is provided, if the request fails, or if the response is not ok.
	 * @returns A Promise that resolves with the JSON data of the pet.
	 */
	async getPetFromId({ id }: GetPetInputs): Promise<GetPetResponse> {
		if (!id) throw new Error("No pet provided for this request.");

		try {
			const response = await fetch(`${this.petUrl}/${id}`, {
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
	 * Asynchronously creates a new pet for the current user.
	 * Requires a valid authentication token to be provided for the request.
	 * @param pet The data to create the pet with, excluding the userId.
	 * @throws {Error} If no token is provided, if the request fails, or if the response is not ok.
	 * @returns A Promise that resolves with the JSON data of the created pet.
	 */
	async createPet({
		pet,
	}: Omit<CreatePetInputs, "userId">): Promise<CreatePetResponse> {
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
	 * @param id The id of the pet to update
	 * @param updateData The data to update the pet with
	 * @throws {Error} If no pet is provided, if the request fails, or if the response is not ok.
	 * @returns A Promise that resolves with the JSON data of the updated pet.
	 */
	async updatePet({
		id,
		updateData,
	}: UpdatePetInputs): Promise<UpdatePetResponse> {
		if (!id) throw new Error("No pet provided for this request.");

		try {
			const response = await fetch(`${this.petUrl}/${id}/update`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updateData),
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
	 * @param id The id of the pet to delete
	 * @throws {Error} If no pet is provided, if the request fails, or if the response is not ok.
	 * @returns A Promise that resolves with the JSON data of the deleted pet.
	 */
	async deletePet({ id }: DeletePetInputs): Promise<DeletePetResponse> {
		if (!id) throw new Error("No pet provided for this request.");

		try {
			const response = await fetch(`${this.petUrl}/${id}/delete`, {
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
