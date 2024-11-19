import { PetStore, Prisma } from "@prisma/client";
import {
	CreatePetStoreInputs,
	CreatePetStoreResponse,
	DeletePetStoreInputs,
	DeletePetStoreResponse,
	GetPetStoreInputs,
	GetPetStoreResponse,
	UpdatePetStoreInputs,
	UpdatePetStoreResponse,
} from "@api-types/PetStore";

export default class PetStoreApi {
	private baseStoreUrl: string;

	constructor(baseStoreUrl: string) {
		this.baseStoreUrl = baseStoreUrl;
	}

	/**
	 * Asynchronously fetches a pet store with the given id.
	 * Requires either a store object with an id, or a storeId string.
	 * @throws {Error} If no store is provided, if the request fails, or if the response is not ok.
	 * @returns A Promise that resolves with the JSON data of the pet store.
	 */
	async getPetStoreFromId({
		id,
		storeId,
	}: GetPetStoreInputs & { storeId: string }): Promise<GetPetStoreResponse> {
		if (!storeId) throw new Error("No store provided for this request.");
		if (!id) throw new Error("No pet store provided for this request.");

		try {
			const response = await fetch(
				`${this.getPetStoreUrl(storeId)}/${id}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Asynchronously creates a new pet store in the store with the given id.
	 * @param storeId The id of the store to create the pet store in.
	 * @param petStore The data to create the pet store with, excluding id.
	 * @throws {Error} If no store is provided, if the request fails, or if the response is not ok.
	 * @returns The id of the created pet store.
	 */
	async createPetStore({
		petStore,
		storeId,
	}: CreatePetStoreInputs): Promise<CreatePetStoreResponse> {
		if (!storeId) throw new Error("No store provided for this request.");

		try {
			const response = await fetch(
				`${this.getPetStoreUrl(storeId)}/create`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(petStore),
				}
			);

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Asynchronously updates a pet store with the given id using the provided data.
	 * @param storeId The id of the store to which the pet store belongs.
	 * @param id The id of the pet store to update.
	 * @param petStore The data to update the pet store with, excluding id.
	 * @throws {Error} If no store or pet store id is provided, if the request fails, or if the response is not ok.
	 * @returns The updated pet store data.
	 */
	async updatePetStore({
		id,
		storeId,
		updateData,
	}: UpdatePetStoreInputs & {
		storeId: string;
	}): Promise<UpdatePetStoreResponse> {
		if (!storeId) throw new Error("No store provided for this request.");
		if (!id) throw new Error("No pet store provided for this request.");

		try {
			const response = await fetch(
				`${this.getPetStoreUrl(storeId)}/${id}/update`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(updateData),
				}
			);

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Asynchronously deletes a pet store with the given id.
	 * @param storeId The id of the store to which the pet store belongs.
	 * @param id The id of the pet store to delete.
	 * @throws {Error} If no store or pet store id is provided, if the request fails, or if the response is not ok.
	 * @returns A Promise that resolves with the JSON data of the deleted pet store.
	 */
	async deletePetStore({
		id,
		storeId,
	}: DeletePetStoreInputs & {
		storeId: string;
	}): Promise<DeletePetStoreResponse> {
		if (!storeId) throw new Error("No store provided for this request.");
		if (!id) throw new Error("No pet store provided for this request.");

		try {
			const response = await fetch(
				`${this.getPetStoreUrl(storeId)}/${id}/delete`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	// ****** Private functions ****** //

	/**
	 * Constructs the URL for accessing pet stores within a specific store.
	 * @param storeId The id of the store for which to generate the pet store URL.
	 * @returns The URL string for accessing the pet stores of the specified store.
	 */
	private getPetStoreUrl(storeId: string) {
		return `${this.baseStoreUrl}/${storeId}/petStores`;
	}
}
