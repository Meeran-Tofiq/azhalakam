import {
	CreateVetInputs,
	CreateVetResponse,
	DeleteVetInputs,
	DeleteVetResponse,
	GetVetInputs,
	GetVetResponse,
	UpdateVetInputs,
	UpdateVetResponse,
} from "@api-types/Vet";

export default class VetApi {
	private vetUrl: String;

	constructor(baseUrl: String) {
		this.vetUrl = baseUrl + "/vets";
	}

	/**
	 * Asynchronously fetches a vet with the given id.
	 * @param id The id of the vet to retrieve
	 * @throws {Error} If no vet is provided, if the request fails, or if the response is not ok.
	 * @returns A Promise that resolves with the JSON data of the vet.
	 */
	async getVetFromId({ id }: GetVetInputs): Promise<GetVetResponse> {
		if (!id) throw new Error("No vet provided for this request.");

		try {
			const response = await fetch(`${this.vetUrl}/${id}`);

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	async createVet({ vet }: CreateVetInputs): Promise<CreateVetResponse> {
		try {
			const response = await fetch(`${this.vetUrl}/create`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(vet),
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	async updateVet({
		id,
		updateData,
	}: UpdateVetInputs): Promise<UpdateVetResponse> {
		if (!id) throw new Error("No vet provided for this request.");

		try {
			const response = await fetch(`${this.vetUrl}/${id}/update`, {
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

	async deleteVet({ id }: DeleteVetInputs): Promise<DeleteVetResponse> {
		if (!id) throw new Error("No vet provided for this request.");

		try {
			const response = await fetch(`${this.vetUrl}/${id}/delete`, {
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
