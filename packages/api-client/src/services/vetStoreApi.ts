import { VetStore, Prisma } from "@prisma/client";

export default class VetStoreApi {
	private baseStoreUrl: string;

	constructor(baseStoreUrl: string) {
		this.baseStoreUrl = baseStoreUrl;
	}

	/**
	 * Asynchronously fetches a vet store with the given id.
	 * Requires either a store object with an id, or a storeId string.
	 * @throws {Error} If no store is provided, if the request fails, or if the response is not ok.
	 * @returns A Promise that resolves with the JSON data of the vet store.
	 */
	async getVetStoreFromId(
		storeId: string,
		vetStoreId: string
	): Promise<{ vetStore: VetStore }> {
		if (!storeId) throw new Error("No store provided for this request.");
		if (!vetStoreId)
			throw new Error("No vet store provided for this request.");

		try {
			const response = await fetch(
				`${this.getVetStoreUrl(storeId)}/${vetStoreId}`,
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
	 * Asynchronously creates a new vet store in the store with the given id.
	 * @param storeId The id of the store to create the vet store in.
	 * @param vetStore The data to create the vet store with, excluding id.
	 * @throws {Error} If no store is provided, if the request fails, or if the response is not ok.
	 * @returns The id of the created vet store.
	 */
	async createVetStore(
		storeId: string,
		vetStore: Omit<VetStore, "id" | "storeId">
	): Promise<{ vetStoreId: string }> {
		if (!storeId) throw new Error("No store provided for this request.");

		try {
			const response = await fetch(
				`${this.getVetStoreUrl(storeId)}/create`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(vetStore),
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
	 * Asynchronously updates a vet store with the given id using the provided data.
	 * @param storeId The id of the store to which the vet store belongs.
	 * @param vetStoreId The id of the vet store to update.
	 * @param vetStore The data to update the vet store with, excluding id.
	 * @throws {Error} If no store or vet store id is provided, if the request fails, or if the response is not ok.
	 * @returns The updated vet store data.
	 */
	async updateVetStore(
		storeId: string,
		vetStoreId: string,
		vetStore: Partial<Omit<VetStore, "id">>
	) {
		if (!storeId) throw new Error("No store provided for this request.");
		if (!vetStoreId)
			throw new Error("No vet store provided for this request.");

		try {
			const response = await fetch(
				`${this.getVetStoreUrl(storeId)}/${vetStoreId}/update`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(vetStore),
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
	 * Asynchronously deletes a vet store with the given id.
	 * @param storeId The id of the store to which the vet store belongs.
	 * @param vetStoreId The id of the vet store to delete.
	 * @throws {Error} If no store or vet store id is provided, if the request fails, or if the response is not ok.
	 * @returns A Promise that resolves with the JSON data of the deleted vet store.
	 */
	async deleteVetStore(storeId: string, vetStoreId: string) {
		if (!storeId) throw new Error("No store provided for this request.");
		if (!vetStoreId)
			throw new Error("No vet store provided for this request.");

		try {
			const response = await fetch(
				`${this.getVetStoreUrl(storeId)}/${vetStoreId}/delete`,
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
	 * Constructs the URL for accessing vet stores within a specific store.
	 * @param storeId The id of the store for which to generate the vet store URL.
	 * @returns The URL string for accessing the vet stores of the specified store.
	 */
	private getVetStoreUrl(storeId: string) {
		return `${this.baseStoreUrl}/${storeId}/vetStores`;
	}
}