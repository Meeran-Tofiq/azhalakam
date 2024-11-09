import { BadRequestException, NotFoundException } from "@src/common/classes";
import { PetStore, PrismaClient } from "@prisma/client";
import prismaClient from "@src/common/PrismaClient";

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
	public async create(
		storeId: string,
		petStore: Omit<PetStore, "id" | "storeId"> | null
	): Promise<string> {
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

			return createdPetStore.id;
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
	public async getOne(id: string): Promise<Partial<PetStore>> {
		let petStore: Partial<PetStore> | null;

		try {
			petStore = await this.prisma.petStore.findUnique({
				where: { id },
			});
		} catch (error: any) {
			throw new BadRequestException("Failed to get pet store");
		}

		if (!petStore) throw new NotFoundException("Pet store not found.");

		return petStore;
	}

	/**
	 * Updates a petStore with the given id with the given data
	 * @param id The id of the petStore to update
	 * @param updatedData The data to update the petStore with
	 * @throws {NotFoundException} If no petStore is found with the given id
	 * @throws {BadRequestException} If the update fails
	 * @returns void
	 */
	public async updateOne(
		id: string,
		updatedData: Partial<Omit<PetStore, "id">>
	): Promise<void> {
		const existingPetStore = await this.prisma.petStore.findUnique({
			where: { id },
		});
		if (!existingPetStore)
			throw new NotFoundException("Pet store not found");

		try {
			await this.prisma.petStore.update({
				where: { id },
				data: { ...updatedData },
			});
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
	public async deleteOne(id: string): Promise<void> {
		const existingPetStore = await this.prisma.petStore.findUnique({
			where: { id },
		});
		if (!existingPetStore)
			throw new NotFoundException("Pet store not found");

		try {
			await this.prisma.petStore.delete({
				where: { id },
			});
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to delete pet store"
			);
		}
	}
}
