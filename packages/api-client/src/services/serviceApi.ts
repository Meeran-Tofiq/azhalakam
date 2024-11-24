import {
	CreateServiceInputs,
	CreateServiceResponse,
	DeleteServiceInputs,
	DeleteServiceResponse,
	GetServiceInputs,
	GetServiceResponse,
	UpdateServiceInputs,
	UpdateServiceResponse,
} from "@api-types/Service";

export default class ServiceApi {
	private serviceUrl: String;

	constructor(baseUrl: String) {
		this.serviceUrl = baseUrl + "/services";
	}

	/**
	 * Asynchronously fetches a service with the given id.
	 * @param id The id of the service to retrieve
	 * @throws {Error} If no service is provided, if the request fails, or if the response is not ok.
	 * @returns A Promise that resolves with the JSON data of the service.
	 */
	async getServiceFromId({
		id,
	}: GetServiceInputs): Promise<GetServiceResponse> {
		if (!id) throw new Error("No service provided for this request.");

		try {
			const response = await fetch(`${this.serviceUrl}/${id}`);

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	async createService({
		service,
	}: CreateServiceInputs): Promise<CreateServiceResponse> {
		try {
			const response = await fetch(`${this.serviceUrl}/create`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(service),
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	async updateService({
		id,
		updateData,
	}: UpdateServiceInputs): Promise<UpdateServiceResponse> {
		if (!id) throw new Error("No service provided for this request.");

		try {
			const response = await fetch(`${this.serviceUrl}/${id}/update`, {
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

	async deleteService({
		id,
	}: DeleteServiceInputs): Promise<DeleteServiceResponse> {
		if (!id) throw new Error("No service provided for this request.");

		try {
			const response = await fetch(`${this.serviceUrl}/${id}/delete`, {
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
