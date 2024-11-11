import { Store } from "@prisma/client";
import userToken from "../utils/userToken";
import PetStoreApi from "./petStoreApi";
import VetStoreApi from "./vetStoreApi";

export default class StoreApi {
	private storeUrl: string;
	public petStoreApi: PetStoreApi;
	public vetStoreApi: VetStoreApi;

	constructor(baseUrl: string) {
		this.storeUrl = baseUrl + "/stores";
		this.petStoreApi = new PetStoreApi(this.storeUrl);
		this.vetStoreApi = new VetStoreApi(this.storeUrl);
	}

	/**
	 * Asynchronously fetches all stores associated with the current user.
	 * Requires an authentication token to be provided for the request.
	 * @throws {Error} If no token is provided, if the request fails, or if the response is not ok.
	 * @returns A Promise that resolves with the JSON data of all stores.
	 */
	async getAllStoresOfUser(): Promise<{ stores: Store[] }> {
		if (!userToken.getToken())
			throw new Error(
				"No token provided for this request. Requires a token of a user to be set."
			);

		try {
			const response = await fetch(`${this.storeUrl}/all`, {
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
	 * Asynchronously fetches a store with the given id.
	 * Requires either a store object with an id, or a storeId string.
	 * @throws {Error} If no store is provided, if the request fails, or if the response is not ok.
	 * @returns A Promise that resolves with the JSON data of the store.
	 */
	async getStoreFromId(storeId: string): Promise<{ store: Store } & any> {
		if (!storeId) throw new Error("No store provided for this request.");

		try {
			const response = await fetch(`${this.storeUrl}/${storeId}`, {
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
	 * Asynchronously creates a new store and assigns it to the user that the token provided
	 * belongs to. Requires a token of a user to be set.
	 * @param store The data to create the store with.
	 * @throws {Error} If the request fails or the response is not ok.
	 * @returns voids
	 */
	async createStore(
		store: Omit<Store, "id" | "userId" | "availabilityId" | "locationId">
	): Promise<{ storeId: string }> {
		if (!userToken.getToken())
			throw new Error(
				"No token provided for this request. Requires a token of a user to be set."
			);

		try {
			const response = await fetch(`${this.storeUrl}/create`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userToken.getToken()}`,
				},
				body: JSON.stringify(store),
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
	 * Asynchronously updates a store with the given id with the given data.
	 * Requires a token of a user to be set.
	 * @param storeId The id of the store to update.
	 * @param store The data to update the store with.
	 * @throws {Error} If the request fails or the response is not ok.
	 * @returns The updated store.
	 */
	async updateStore(storeId: string, store: Partial<Omit<Store, "id">>) {
		if (!storeId) throw new Error("No store provided for this request.");

		try {
			const response = await fetch(`${this.storeUrl}/${storeId}/update`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(store),
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
	 * Asynchronously deletes a store with the given id.
	 * @param storeId The id of the store to delete.
	 * @throws {Error} If no store ID is provided, if the request fails, or if the response is not ok.
	 * @returns A Promise that resolves with the JSON data of the deleted store.
	 */
	async deleteStore(storeId: string) {
		if (!storeId) throw new Error("No store provided for this request.");

		try {
			const response = await fetch(`${this.storeUrl}/${storeId}/delete`, {
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
