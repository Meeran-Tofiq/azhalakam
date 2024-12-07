import { Prisma, Vet } from "@prisma/client";

export type VetWithoutIncludes = Prisma.VetGetPayload<{}>;
export type VetWithIncludes = Prisma.VetGetPayload<{
	include: {};
}>;

// Create a vet types

export type CreateVetInputs = {
	vet: Omit<Prisma.VetCreateInput, "id">;
};
export type CreateVetResponse = { vet: VetWithIncludes };

// Get vet(s) types

export type GetVetInputs = {
	id: string;
};
export type GetVetResponse = { vet: VetWithIncludes };

// Update vet types

export type UpdateVetInputs = {
	id: string;
	updateData: Omit<Prisma.VetUpdateInput, "id">;
};
export type UpdateVetResponse = { vet: VetWithIncludes };

// Delete vet types

export type DeleteVetInputs = {
	id: string;
};
export type DeleteVetResponse = { vet: VetWithIncludes };
