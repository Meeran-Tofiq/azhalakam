import { Prisma, VetStore } from "@prisma/client";

export type VetStoreWithoutIncludes = Prisma.VetStoreGetPayload<{}>;
export type VetStoreWithIncludes = Prisma.VetStoreGetPayload<{
	include: {
		services: true;
		vets: true;
	};
}>;

// Create a vetStore types

export type CreateVetStoreInputs = {
	vetStore: Omit<
		Prisma.VetStoreCreateInput,
		"id" | "vets" | "services" | "store"
	>;
	storeId: string;
};
export type CreateVetStoreResponse = { vetStore: VetStoreWithIncludes };

// Get vetStore(s) types

export type GetVetStoreInputs = {
	id: string;
};

export type GetVetStoreResponse = { vetStore: VetStoreWithIncludes };

// Update vetStore types

export type UpdateVetStoreInputs = {
	id: string;
	updateData: Omit<
		Prisma.VetStoreUpdateInput,
		"id" | "vets" | "services" | "store"
	> & {
		vets?: string[];
		services?: string[];
	};
};
export type UpdateVetStoreResponse = { vetStore: VetStoreWithIncludes };

// Delete vetStore types

export type DeleteVetStoreInputs = {
	id: string;
};
export type DeleteVetStoreResponse = { vetStore: VetStoreWithIncludes };
