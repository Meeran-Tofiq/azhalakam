import { Prisma, PetStore } from "@prisma/client";

export type PetStoreWithoutIncludes = Prisma.PetStoreGetPayload<{}>;
export type PetStoreWithIncludes = Prisma.PetStoreGetPayload<{
	include: {};
}>;

// Create a petStore types

export type CreatePetStoreInputs = {
	petStore: Omit<
		Prisma.PetStoreCreateInput,
		"id" | "pets" | "services" | "store"
	>;
	storeId: string;
};
export type CreatePetStoreResponse = { petStore: PetStoreWithIncludes };

// Get petStore(s) types

export type GetPetStoreInputs = {
	id: string;
};

export type GetPetStoreResponse = { petStore: PetStoreWithIncludes };

// Update petStore types

export type UpdatePetStoreInputs = {
	id: string;
	updateData: Omit<Prisma.PetStoreUpdateInput, "id" | "store">;
};
export type UpdatePetStoreResponse = { petStore: PetStoreWithIncludes };

// Delete petStore types

export type DeletePetStoreInputs = {
	id: string;
};
export type DeletePetStoreResponse = { petStore: PetStoreWithIncludes };
