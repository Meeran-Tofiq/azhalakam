import { Availability, Prisma, Store } from "@prisma/client";

export type StoreWithIncludes = Prisma.StoreGetPayload<{
	include: {
		products: true;
		availability: true;
		location: true;
		petStore: true;
		vetStore: true;
	};
}>;

// Create a store types

export type CreateStoreInputs = {
	store: Omit<
		Prisma.StoreCreateInput,
		| "id"
		| "userId"
		| "products"
		| "availability"
		| "location"
		| "petStore"
		| "vetStore"
		| "user"
	>;
	userId: string;
};

export type CreateStoreResponse = { store: StoreWithIncludes; storeId: string };

// Get store(s) types

export type GetStoreInputs = {
	id: string;
};

export type GetStoreResponse = StoreWithIncludes;

export type GetAllUserStoresInputs = {
	userId: string;
};
export type GetAllUserStoresResponse = StoreWithIncludes[];

// Update store types

export type UpdateStoreInputs = {
	id: string;
	updateData: Omit<
		Prisma.StoreUpdateInput,
		| "id"
		| "userId"
		| "products"
		| "availability"
		| "location"
		| "petStore"
		| "vetStore"
	>;
};
export type UpdateStoreResponse = StoreWithIncludes;

// Delete store types

export type DeleteStoreInputs = {
	id: string;
};
export type DeleteStoreResponse = StoreWithIncludes;
