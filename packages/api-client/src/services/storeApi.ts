import userToken from "../utils/userToken";
import PetStoreApi from "./petStoreApi";
import VetStoreApi from "./vetStoreApi";
import {
	CreateStoreInputs,
	CreateStoreResponse,
	DeleteStoreInputs,
	DeleteStoreResponse,
	GetAllUserStoresResponse,
	GetStoreInputs,
	GetStoreResponse,
	UpdateStoreInputs,
	UpdateStoreResponse,
} from "@app/api/types/Store";

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
	async getAllStoresOfUser(): Promise<GetAllUserStoresResponse> {
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
	 * @param id The id of the store to retrieve.
	 * @throws {Error} If no store id is provided, if the request fails, or if the response is not ok.
	 * @returns A Promise that resolves with the JSON data of the store.
	 */
	async getStoreFromId({ id }: GetStoreInputs): Promise<GetStoreResponse> {
		if (!id) throw new Error("No store provided for this request.");

		try {
			const response = await fetch(`${this.storeUrl}/${id}`, {
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
	async createStore({
		store,
	}: CreateStoreInputs): Promise<CreateStoreResponse> {
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
	 * @param id The id of the store to update.
	 * @param store The data to update the store with.
	 * @throws {Error} If the request fails or the response is not ok.
	 * @returns The updated store.
	 */
	async updateStore({
		id,
		updateData,
	}: UpdateStoreInputs): Promise<UpdateStoreResponse> {
		if (!id) throw new Error("No store provided for this request.");

		try {
			const response = await fetch(`${this.storeUrl}/${id}/update`, {
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
	 * Asynchronously deletes a store with the given id.
	 * @param id The id of the store to delete.
	 * @throws {Error} If no store ID is provided, if the request fails, or if the response is not ok.
	 * @returns A Promise that resolves with the JSON data of the deleted store.
	 */
	async deleteStore({ id }: DeleteStoreInputs): Promise<DeleteStoreResponse> {
		if (!id) throw new Error("No store provided for this request.");

		try {
			const response = await fetch(`${this.storeUrl}/${id}/delete`, {
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
