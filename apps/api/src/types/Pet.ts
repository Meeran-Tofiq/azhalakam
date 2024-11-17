import { Prisma, Pet } from "@prisma/client";

export type PetWithIncludes = Prisma.PetGetPayload<{
	include: {};
}>;

// Create a pet types

export type CreatePetInputs = {
	pet: Omit<Prisma.PetCreateInput, "id" | "user">;
	userId: string;
};
export type CreatePetResponse = { pet: PetWithIncludes };

// Get pet(s) types

export type GetPetInputs = {
	id: string;
};

export type GetPetResponse = { pet: PetWithIncludes };

export type GetAllUserPetsInputs = {
	userId: string;
};
export type GetAllUserPetsResponse = { pets: PetWithIncludes[] };

// Update pet types

export type UpdatePetInputs = {
	id: string;
	updateData: Omit<Prisma.PetUpdateInput, "id" | "userId" | "user">;
};
export type UpdatePetResponse = { pet: PetWithIncludes };

// Delete pet types

export type DeletePetInputs = {
	id: string;
};
export type DeletePetResponse = { pet: PetWithIncludes };
