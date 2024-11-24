import { Prisma, Service } from "@prisma/client";

export type ServiceWithoutIncludes = Prisma.ServiceGetPayload<{}>;
export type ServiceWithIncludes = Prisma.ServiceGetPayload<{
	include: {};
}>;

// Create a service types

export type CreateServiceInputs = {
	service: Omit<Prisma.ServiceCreateInput, "id" | "provider" | "vetStore">;
};
export type CreateServiceResponse = { service: ServiceWithIncludes };

// Get service(s) types

export type GetServiceInputs = {
	id: string;
};
export type GetServiceResponse = { service: ServiceWithIncludes };

// Update service types

export type UpdateServiceInputs = {
	id: string;
	updateData: Omit<Prisma.ServiceUpdateInput, "id" | "provider" | "vetStore">;
};
export type UpdateServiceResponse = { service: ServiceWithIncludes };

// Delete service types

export type DeleteServiceInputs = {
	id: string;
};
export type DeleteServiceResponse = { service: ServiceWithIncludes };
