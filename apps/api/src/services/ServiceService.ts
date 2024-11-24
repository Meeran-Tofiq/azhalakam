import { BadRequestException, NotFoundException } from "@src/common/classes";
import { Service, PrismaClient, Prisma, Review } from "@prisma/client";
import prismaClient from "@src/common/PrismaClient";
import {
	CreateServiceInputs,
	CreateServiceResponse,
	DeleteServiceInputs,
	DeleteServiceResponse,
	GetServiceInputs,
	GetServiceResponse,
	UpdateServiceInputs,
	UpdateServiceResponse,
} from "@src/types/Service";

// **** Variables **** //

export default class ServiceServiceFactory {
	public static create(customPrismaClient?: PrismaClient) {
		return new ServiceService(customPrismaClient || prismaClient);
	}
}

class ServiceService {
	private prisma: PrismaClient;
	private servicePageLimit: number = 15;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	// **** Public Methods **** //

	/**
	 * Creates a new service
	 * @param service The data to create the service with
	 * @throws {BadRequestException} If the creation fails
	 * @returns The id of the created service
	 */
	public async create({
		service,
	}: CreateServiceInputs): Promise<CreateServiceResponse> {
		try {
			const createdService = await this.prisma.service.create({
				data: service,
			});

			return { service: createdService };
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to create service"
			);
		}
	}

	/**
	 * Retrieves a service by id
	 * @param id The id of the service to retrieve
	 * @throws {BadRequestException} If the query fails
	 * @throws {NotFoundException} If no service is found with the given id
	 * @returns The found service
	 */
	public async getOne({
		id,
	}: GetServiceInputs): Promise<GetServiceResponse> {
		try {
			const service = await this.prisma.service.findUnique({
				where: { id },
			});

			if (!service) throw new NotFoundException("Service not found.");

			return { service };
		} catch (error: any) {
			throw new BadRequestException("Failed to get service");
		}
	}

	/**
	 * Updates a service with the given id with the given data
	 * @param id The id of the service to update
	 * @param updatedData The data to update the service with
	 * @throws {NotFoundException} If no service is found with the given id
	 * @throws {BadRequestException} If the update fails
	 * @returns void
	 */
	public async updateOne({
		id,
		updateData,
	}: UpdateServiceInputs): Promise<UpdateServiceResponse> {
		try {
			const existingService = await this.prisma.service.findUnique({
				where: { id },
			});

			if (!existingService)
				throw new NotFoundException("Service not found");

			const service = await this.prisma.service.update({
				where: { id },
				data: updateData,
			});

			return { service };
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to update service"
			);
		}
	}

	/**
	 * Deletes a service with the given id
	 * @param id The id of the service to delete
	 * @throws {NotFoundException} If no service is found with the given id
	 * @throws {BadRequestException} If the deletion fails
	 * @returns void
	 */
	public async deleteOne({
		id,
	}: DeleteServiceInputs): Promise<DeleteServiceResponse> {
		const existingService = await this.prisma.service.findUnique({
			where: { id },
		});
		if (!existingService)
			throw new NotFoundException("Service not found");

		try {
			const service = await this.prisma.service.delete({
				where: { id },
			});

			return { service };
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to delete service"
			);
		}
	}
}
