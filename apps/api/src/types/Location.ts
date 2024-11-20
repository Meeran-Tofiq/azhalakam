import { Prisma, Location } from "@prisma/client";

export type LocationWithoutIncludes = Prisma.LocationGetPayload<{}>;
export type LocationWithIncludes = Prisma.LocationGetPayload<{
	include: {};
}>;

// Create a location types

export type CreateLocationInputs = {
	location: Omit<Prisma.LocationCreateInput, "id" | "store" | "user">;
};
export type CreateLocationResponse = { location: LocationWithIncludes };

// Get location(s) types

export type GetLocationInputs = {
	id: string;
};
export type GetLocationResponse = { location: LocationWithIncludes };

// Update location types

export type UpdateLocationInputs = {
	id: string;
	updateData: Omit<Prisma.LocationUpdateInput, "id" | "store" | "user">;
};
export type UpdateLocationResponse = { location: LocationWithIncludes };

// Delete location types

export type DeleteLocationInputs = {
	id: string;
};
export type DeleteLocationResponse = { location: LocationWithIncludes };
