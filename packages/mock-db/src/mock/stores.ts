import { CreateStoreInputs, StoreWithIncludes } from "@api-types/Store";
import apiClient from "../util/apiClientImport";
import { createdUsers } from "./users";

export let createdStores: StoreWithIncludes[] = [];

export default async function createStores() {
	if (createdUsers.length === 0) {
		throw new Error("Stores: No users created yet.");
	}

	let index = 0;
	let storeData = [...petStores, ...vetStores];

	console.info("Stores: Creating...");

	try {
		for (const store of storeData) {
			if (index >= createdUsers.length - 1) break;

			apiClient.setUserToken(createdUsers[index++].token);
			const { store: createdStore } =
				await apiClient.storeApi.createStore(store);

			createdStores.push(createdStore);
		}

		console.info("Stores: created.");
	} catch (error) {
		console.error(error);
	}
}

const petStores: Omit<CreateStoreInputs, "userId">[] = [
	{
		store: {
			name: "Store 1",
			type: "PET_STORE",
			avgRating: 5,
		},
	},
	{
		store: {
			name: "Store 2",
			type: "PET_STORE",
			avgRating: 4.7,
		},
	},
	{
		store: {
			name: "Store 3",
			type: "PET_STORE",
			avgRating: 4.2,
		},
	},
	{
		store: {
			name: "Store 4",
			type: "PET_STORE",
			avgRating: 4.9,
		},
	},
	{
		store: {
			name: "Store 5",
			type: "PET_STORE",
			avgRating: 4.1,
		},
	},
	{
		store: {
			name: "Store 6",
			type: "PET_STORE",
			avgRating: 4.6,
		},
	},
	{
		store: {
			name: "Store 7",
			type: "PET_STORE",
			avgRating: 4.8,
		},
	},
	{
		store: {
			name: "Store 8",
			type: "PET_STORE",
			avgRating: 4.3,
		},
	},
	{
		store: {
			name: "Store 9",
			type: "PET_STORE",
			avgRating: 4.4,
		},
	},
	{
		store: {
			name: "Store 10",
			type: "PET_STORE",
			avgRating: 4.5,
		},
	},
	{
		store: {
			name: "Store 11",
			type: "PET_STORE",
			avgRating: 4.6,
		},
	},
	{
		store: {
			name: "Store 12",
			type: "PET_STORE",
			avgRating: 4.7,
		},
	},
	{
		store: {
			name: "Store 13",
			type: "PET_STORE",
			avgRating: 4.8,
		},
	},
	{
		store: {
			name: "Store 14",
			type: "PET_STORE",
			avgRating: 4.9,
		},
	},
	{
		store: {
			name: "Store 15",
			type: "PET_STORE",
			avgRating: 4.1,
		},
	},
	{
		store: {
			name: "Store 16",
			type: "PET_STORE",
			avgRating: 4.2,
		},
	},
	{
		store: {
			name: "Store 17",
			type: "PET_STORE",
			avgRating: 4.3,
		},
	},
	{
		store: {
			name: "Store 18",
			type: "PET_STORE",
			avgRating: 4.4,
		},
	},
];

const vetStores: Omit<CreateStoreInputs, "userId">[] = [
	{
		store: {
			name: "Store 1",
			type: "VET_STORE",
			avgRating: 4.5,
		},
	},
	{
		store: {
			name: "Store 2",
			type: "VET_STORE",
			avgRating: 4.6,
		},
	},
	{
		store: {
			name: "Store 3",
			type: "VET_STORE",
			avgRating: 3.9,
		},
	},
	{
		store: {
			name: "Store 4",
			type: "VET_STORE",
			avgRating: 4.2,
		},
	},
	{
		store: {
			name: "Store 5",
			type: "VET_STORE",
			avgRating: 3.1,
		},
	},
	{
		store: {
			name: "Store 6",
			type: "VET_STORE",
			avgRating: 4.5,
		},
	},
	{
		store: {
			name: "Store 7",
			type: "VET_STORE",
			avgRating: 2.7,
		},
	},
	{
		store: {
			name: "Store 8",
			type: "VET_STORE",
			avgRating: 4.8,
		},
	},
	{
		store: {
			name: "Store 9",
			type: "VET_STORE",
			avgRating: 3.3,
		},
	},
	{
		store: {
			name: "Store 10",
			type: "VET_STORE",
			avgRating: 4.1,
		},
	},
	{
		store: {
			name: "Store 11",
			type: "VET_STORE",
			avgRating: 2.9,
		},
	},
	{
		store: {
			name: "Store 12",
			type: "VET_STORE",
			avgRating: 4.3,
		},
	},
	{
		store: {
			name: "Store 13",
			type: "VET_STORE",
			avgRating: 3.7,
		},
	},
	{
		store: {
			name: "Store 14",
			type: "VET_STORE",
			avgRating: 4.9,
		},
	},
	{
		store: {
			name: "Store 15",
			type: "VET_STORE",
			avgRating: 3.5,
		},
	},
];
