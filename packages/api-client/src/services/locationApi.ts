import {
	CreateLocationInputs,
	CreateLocationResponse,
	DeleteLocationInputs,
	DeleteLocationResponse,
	GetLocationInputs,
	GetLocationResponse,
	UpdateLocationInputs,
	UpdateLocationResponse,
} from "@api-types/Location";

export default class LocationApi {
	private locationUrl: String;

	constructor(baseUrl: String) {
		this.locationUrl = baseUrl + "/locations";
	}

	/**
	 * Asynchronously fetches a location with the given id.
	 * @param id The id of the location to retrieve
	 * @throws {Error} If no location is provided, if the request fails, or if the response is not ok.
	 * @returns A Promise that resolves with the JSON data of the location.
	 */
	async getLocationFromId({
		id,
	}: GetLocationInputs): Promise<GetLocationResponse> {
		if (!id) throw new Error("No location provided for this request.");

		try {
			const response = await fetch(`${this.locationUrl}/${id}`);

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	async createLocation({
		location,
	}: CreateLocationInputs): Promise<CreateLocationResponse> {
		try {
			const response = await fetch(`${this.locationUrl}/create`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(location),
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	async updateLocation({
		id,
		updateData,
	}: UpdateLocationInputs): Promise<UpdateLocationResponse> {
		if (!id) throw new Error("No location provided for this request.");

		try {
			const response = await fetch(`${this.locationUrl}/${id}/update`, {
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

	async deleteLocation({
		id,
	}: DeleteLocationInputs): Promise<DeleteLocationResponse> {
		if (!id) throw new Error("No location provided for this request.");

		try {
			const response = await fetch(`${this.locationUrl}/${id}/delete`, {
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
