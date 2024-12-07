import { CreateVetInputs, VetWithIncludes } from "@api-types/Vet";
import { createdVetStores } from "./vetStores";
import apiClient from "../util/apiClientImport";

export let createdVets: VetWithIncludes[] = [];

export default async function createVets() {
	for (const vetStore of createdVetStores) {
		for (const vetInput of vets) {
			const { vet: createdVet } = await apiClient.vetApi.createVet({
				vet: {
					...vetInput.vet,
					vetStore: { connect: { id: vetStore.id } },
				},
			});

			createdVets.push(createdVet);
		}
	}
}

const vets: CreateVetInputs[] = [
	{
		vet: {
			name: "John Doe",
		},
	},
	{
		vet: {
			name: "Mohammed Fryad",
		},
	},
];
