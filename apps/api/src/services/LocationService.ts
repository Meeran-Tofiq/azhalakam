import { BadRequestException, NotFoundException } from "@src/common/classes";
import { Location, PrismaClient, Prisma, Review } from "@prisma/client";
import prismaClient from "@src/common/PrismaClient";
import {
	CreateLocationInputs,
	CreateLocationResponse,
	DeleteLocationInputs,
	DeleteLocationResponse,
	GetLocationInputs,
	GetLocationResponse,
	UpdateLocationInputs,
	UpdateLocationResponse,
} from "@src/types/Location";

// **** Variables **** //

export default class LocationServiceFactory {
	public static create(customPrismaClient?: PrismaClient) {
		return new LocationService(customPrismaClient || prismaClient);
	}
}

class LocationService {
	private prisma: PrismaClient;
	private locationPageLimit: number = 15;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	// **** Public Methods **** //

	/**
	 * Creates a new location
	 * @param location The data to create the location with
	 * @throws {BadRequestException} If the creation fails
	 * @returns The id of the created location
	 */
	public async create({
		location,
	}: CreateLocationInputs): Promise<CreateLocationResponse> {
		try {
			const createdLocation = await this.prisma.location.create({
				data: location,
			});

			return { location: createdLocation };
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to create location"
			);
		}
	}

	/**
	 * Retrieves a location by id
	 * @param id The id of the location to retrieve
	 * @throws {BadRequestException} If the query fails
	 * @throws {NotFoundException} If no location is found with the given id
	 * @returns The found location
	 */
	public async getOne({
		id,
	}: GetLocationInputs): Promise<GetLocationResponse> {
		try {
			const location = await this.prisma.location.findUnique({
				where: { id },
			});

			if (!location) throw new NotFoundException("Location not found.");

			return { location };
		} catch (error: any) {
			throw new BadRequestException("Failed to get location");
		}
	}

	/**
	 * Updates a location with the given id with the given data
	 * @param id The id of the location to update
	 * @param updatedData The data to update the location with
	 * @throws {NotFoundException} If no location is found with the given id
	 * @throws {BadRequestException} If the update fails
	 * @returns void
	 */
	public async updateOne({
		id,
		updateData,
	}: UpdateLocationInputs): Promise<UpdateLocationResponse> {
		try {
			const existingLocation = await this.prisma.location.findUnique({
				where: { id },
			});

			if (!existingLocation)
				throw new NotFoundException("Location not found");

			const location = await this.prisma.location.update({
				where: { id },
				data: updateData,
			});

			return { location };
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to update location"
			);
		}
	}

	/**
	 * Deletes a location with the given id
	 * @param id The id of the location to delete
	 * @throws {NotFoundException} If no location is found with the given id
	 * @throws {BadRequestException} If the deletion fails
	 * @returns void
	 */
	public async deleteOne({
		id,
	}: DeleteLocationInputs): Promise<DeleteLocationResponse> {
		const existingLocation = await this.prisma.location.findUnique({
			where: { id },
		});
		if (!existingLocation)
			throw new NotFoundException("Location not found");

		try {
			const location = await this.prisma.location.delete({
				where: { id },
			});

			return { location };
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to delete location"
			);
		}
	}
}
