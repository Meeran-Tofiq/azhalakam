import { Prisma, ServiceProvider } from "@prisma/client";

export type ServiceProviderWithoutIncludes =
	Prisma.ServiceProviderGetPayload<{}>;
export type ServiceProviderWithIncludes = Prisma.ServiceProviderGetPayload<{
	include: {
		reviews: true;
		services: true;
	};
}>;

// Create a serviceProvider types

export type CreateServiceProviderInputs = {
	serviceProvider: Omit<
		Prisma.ServiceProviderCreateInput,
		"id" | "reviews" | "user" | "services"
	>;
};
export type CreateServiceProviderResponse = {
	serviceProvider: ServiceProviderWithIncludes;
};

// Get serviceProvider(s) types

export type GetServiceProviderInputs = {
	id: string;
};
export type GetServiceProviderResponse = {
	serviceProvider: ServiceProviderWithIncludes;
};

// Update serviceProvider types

export type UpdateServiceProviderInputs = {
	id: string;
	updateData: Omit<
		Prisma.ServiceProviderUpdateInput,
		"id" | "reviews" | "user" | "services"
	> & {
		reviewIds?: string[];
		serviceIds?: string[];
	};
};
export type UpdateServiceProviderResponse = {
	serviceProvider: ServiceProviderWithIncludes;
};

// Delete serviceProvider types

export type DeleteServiceProviderInputs = {
	id: string;
};
export type DeleteServiceProviderResponse = {
	serviceProvider: ServiceProviderWithIncludes;
};
