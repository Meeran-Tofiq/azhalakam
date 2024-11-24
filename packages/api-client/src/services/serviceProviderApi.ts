import {
	CreateServiceProviderInputs,
	CreateServiceProviderResponse,
	DeleteServiceProviderInputs,
	DeleteServiceProviderResponse,
	GetServiceProviderInputs,
	GetServiceProviderResponse,
	UpdateServiceProviderInputs,
	UpdateServiceProviderResponse,
} from "@api-types/ServiceProvider";

export default class ServiceProviderApi {
	private serviceProviderUrl: String;

	constructor(baseUrl: String) {
		this.serviceProviderUrl = baseUrl + "/service-providers";
	}

	/**
	 * Asynchronously fetches a serviceProvider with the given id.
	 * @param id The id of the serviceProvider to retrieve
	 * @throws {Error} If no serviceProvider is provided, if the request fails, or if the response is not ok.
	 * @returns A Promise that resolves with the JSON data of the serviceProvider.
	 */
	async getServiceProviderFromId({
		id,
	}: GetServiceProviderInputs): Promise<GetServiceProviderResponse> {
		if (!id)
			throw new Error("No serviceProvider provided for this request.");

		try {
			const response = await fetch(`${this.serviceProviderUrl}/${id}`);

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	async createServiceProvider({
		serviceProvider,
	}: CreateServiceProviderInputs): Promise<CreateServiceProviderResponse> {
		try {
			const response = await fetch(`${this.serviceProviderUrl}/create`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(serviceProvider),
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	async updateServiceProvider({
		id,
		updateData,
	}: UpdateServiceProviderInputs): Promise<UpdateServiceProviderResponse> {
		if (!id)
			throw new Error("No serviceProvider provided for this request.");

		try {
			const response = await fetch(
				`${this.serviceProviderUrl}/${id}/update`,
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

	async deleteServiceProvider({
		id,
	}: DeleteServiceProviderInputs): Promise<DeleteServiceProviderResponse> {
		if (!id)
			throw new Error("No serviceProvider provided for this request.");

		try {
			const response = await fetch(
				`${this.serviceProviderUrl}/${id}/delete`,
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
}
