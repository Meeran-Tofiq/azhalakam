import { BadRequestException, NotFoundException } from "@src/common/classes";
import { PetStore, PrismaClient } from "@prisma/client";
import prismaClient from "@src/common/PrismaClient";
import {
	CreatePetStoreInputs,
	CreatePetStoreResponse,
	DeletePetStoreInputs,
	DeletePetStoreResponse,
	GetPetStoreInputs,
	GetPetStoreResponse,
	UpdatePetStoreInputs,
	UpdatePetStoreResponse,
} from "@src/types/PetStore";

// **** Variables **** //

export default class PetStoreServiceFactory {
	public static create(customPrismaClient?: PrismaClient) {
		return new PetStoreService(customPrismaClient || prismaClient);
	}
}

class PetStoreService {
	private prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	// **** Public Methods **** //

	/**
	 * Creates a new petStore
	 * @param petStore The data to create the petStore with
	 * @throws {BadRequestException} If the creation fails
	 * @returns The id of the created petStore
	 */
	public async create({
		storeId,
		petStore,
	}: CreatePetStoreInputs): Promise<CreatePetStoreResponse> {
		try {
			const storeExists = await this.prisma.store.findUnique({
				where: {
					id: storeId,
				},
			});

			if (!storeExists) {
				throw new BadRequestException("Store does not exist");
			}

			const createdPetStore = await this.prisma.petStore.create({
				data: {
					...petStore,
					store: {
						connect: {
							id: storeId,
						},
					},
				},
			});

			return { petStore: createdPetStore };
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to create pet store"
			);
		}
	}

	/**
	 * Retrieves a petStore by id
	 * @param id The id of the petStore to retrieve
	 * @throws {BadRequestException} If the query fails
	 * @throws {NotFoundException} If no petStore is found with the given id
	 * @returns The found petStore
	 */
	public async getOne({
		id,
	}: GetPetStoreInputs): Promise<GetPetStoreResponse> {
		try {
			const petStore = await this.prisma.petStore.findUnique({
				where: { id },
			});

			if (!petStore) throw new NotFoundException("Pet store not found.");

			return { petStore };
		} catch (error: any) {
			throw new BadRequestException("Failed to get pet store");
		}
	}

	/**
	 * Updates a petStore with the given id with the given data
	 * @param id The id of the petStore to update
	 * @param updatedData The data to update the petStore with
	 * @throws {NotFoundException} If no petStore is found with the given id
	 * @throws {BadRequestException} If the update fails
	 * @returns void
	 */
	public async updateOne({
		id,
		updateData,
	}: UpdatePetStoreInputs): Promise<UpdatePetStoreResponse> {
		const existingPetStore = await this.prisma.petStore.findUnique({
			where: { id },
		});
		if (!existingPetStore)
			throw new NotFoundException("Pet store not found");

		try {
			const petStore = await this.prisma.petStore.update({
				where: { id },
				data: { ...updateData },
			});

			return { petStore };
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to update pet store"
			);
		}
	}

	/**
	 * Deletes a petStore with the given id
	 * @param id The id of the petStore to delete
	 * @throws {NotFoundException} If no petStore is found with the given id
	 * @throws {BadRequestException} If the deletion fails
	 * @returns void
	 */
	public async deleteOne({
		id,
	}: DeletePetStoreInputs): Promise<DeletePetStoreResponse> {
		const existingPetStore = await this.prisma.petStore.findUnique({
			where: { id },
		});
		if (!existingPetStore)
			throw new NotFoundException("Pet store not found");

		try {
			const petStore = await this.prisma.petStore.delete({
				where: { id },
			});

			return { petStore };
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to delete pet store"
			);
		}
	}
}
