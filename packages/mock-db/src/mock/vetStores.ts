import { VetStoreWithIncludes } from "@api-types/VetStore";
import { createdStores } from "./stores";
import apiClient from "../util/apiClientImport";

export let createdVetStores: VetStoreWithIncludes[] = [];

export default async function createVetStores() {
	for (const store of createdStores) {
		if (store.type !== "VET_STORE") continue;

		const { vetStore } =
			await apiClient.storeApi.vetStoreApi.createVetStore({
				storeId: store.id,
				vetStore: {},
			});

		createdVetStores.push(vetStore);
	}
}
