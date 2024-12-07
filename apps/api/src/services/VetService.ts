import { BadRequestException, NotFoundException } from "@src/common/classes";
import { Vet, PrismaClient, Prisma, Review } from "@prisma/client";
import prismaClient from "@src/common/PrismaClient";
import {
	CreateVetInputs,
	CreateVetResponse,
	DeleteVetInputs,
	DeleteVetResponse,
	GetVetInputs,
	GetVetResponse,
	UpdateVetInputs,
	UpdateVetResponse,
} from "@src/types/Vet";

// **** Variables **** //

export default class VetServiceFactory {
	public static create(customPrismaClient?: PrismaClient) {
		return new VetService(customPrismaClient || prismaClient);
	}
}

class VetService {
	private prisma: PrismaClient;
	private vetPageLimit: number = 15;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	// **** Public Methods **** //

	/**
	 * Creates a new vet
	 * @param vet The data to create the vet with
	 * @throws {BadRequestException} If the creation fails
	 * @returns The id of the created vet
	 */
	public async create({
		vet,
	}: CreateVetInputs): Promise<CreateVetResponse> {
		try {
			const createdVet = await this.prisma.vet.create({
				data: vet,
			});

			return { vet: createdVet };
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to create vet"
			);
		}
	}

	/**
	 * Retrieves a vet by id
	 * @param id The id of the vet to retrieve
	 * @throws {BadRequestException} If the query fails
	 * @throws {NotFoundException} If no vet is found with the given id
	 * @returns The found vet
	 */
	public async getOne({
		id,
	}: GetVetInputs): Promise<GetVetResponse> {
		try {
			const vet = await this.prisma.vet.findUnique({
				where: { id },
			});

			if (!vet) throw new NotFoundException("Vet not found.");

			return { vet };
		} catch (error: any) {
			throw new BadRequestException("Failed to get vet");
		}
	}

	/**
	 * Updates a vet with the given id with the given data
	 * @param id The id of the vet to update
	 * @param updatedData The data to update the vet with
	 * @throws {NotFoundException} If no vet is found with the given id
	 * @throws {BadRequestException} If the update fails
	 * @returns void
	 */
	public async updateOne({
		id,
		updateData,
	}: UpdateVetInputs): Promise<UpdateVetResponse> {
		try {
			const existingVet = await this.prisma.vet.findUnique({
				where: { id },
			});

			if (!existingVet)
				throw new NotFoundException("Vet not found");

			const vet = await this.prisma.vet.update({
				where: { id },
				data: updateData,
			});

			return { vet };
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to update vet"
			);
		}
	}

	/**
	 * Deletes a vet with the given id
	 * @param id The id of the vet to delete
	 * @throws {NotFoundException} If no vet is found with the given id
	 * @throws {BadRequestException} If the deletion fails
	 * @returns void
	 */
	public async deleteOne({
		id,
	}: DeleteVetInputs): Promise<DeleteVetResponse> {
		const existingVet = await this.prisma.vet.findUnique({
			where: { id },
		});
		if (!existingVet)
			throw new NotFoundException("Vet not found");

		try {
			const vet = await this.prisma.vet.delete({
				where: { id },
			});

			return { vet };
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to delete vet"
			);
		}
	}
}
