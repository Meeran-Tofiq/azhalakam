import { BadRequestException, NotFoundException } from "@src/common/classes";
import { Store, PrismaClient } from "@prisma/client";
import prismaClient from "@src/common/PrismaClient";

// **** Variables **** //

export default class StoreServiceFactory {
	public static create(customPrismaClient?: PrismaClient) {
		return new StoreService(customPrismaClient || prismaClient);
	}
}

class StoreService {
	private prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	// **** Public Methods **** //

	/**
	 * Creates a new store
	 * @param userId The id of the user to associate the store with
	 * @param store The data to create the store with
	 * @throws {BadRequestException} If the creation fails
	 * @returns The id of the created store
	 */
	public async create(
		userId: string,
		store: Omit<Store, "id">
	): Promise<string> {
		try {
			const createdStore = await this.prisma.store.create({
				data: {
					...store,
					userId,
				},
			});

			return createdStore.id;
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to create store"
			);
		}
	}

	/**
	 * Retrieves a store by id
	 * @param id The id of the store to retrieve
	 * @throws {BadRequestException} If the query fails
	 * @throws {NotFoundException} If no store is found with the given id
	 * @returns The found store
	 */
	public async getOne(id: string): Promise<Partial<Store>> {
		let store: Partial<Store> | null;

		try {
			store = await this.prisma.store.findUnique({
				where: { id },
				include: {
					products: true,
					availability: true,
					location: true,
					petStore: true,
					vetStore: true,
				},
			});
		} catch (error: any) {
			throw new BadRequestException("Failed to get store");
		}

		if (!store) throw new NotFoundException("Store not found.");

		return store;
	}

	/**
	 * Retrieves all stores for a given user
	 * @param userId The id of the user to get the stores for
	 * @throws {BadRequestException} If the query fails
	 * @throws {NotFoundException} If no stores are found for the given user
	 * @returns An array of the found stores
	 */
	public async getAllStoresOfUser(userId: string): Promise<Partial<Store>[]> {
		let stores: Partial<Store>[];

		try {
			stores = await this.prisma.store.findMany({
				where: { userId },
				include: {
					products: true,
					availability: true,
					location: true,
					petStore: true,
					vetStore: true,
				},
			});
		} catch (error) {
			throw new BadRequestException("Failed to get stores");
		}

		if (!stores) throw new NotFoundException("Stores not found.");

		return stores;
	}

	/**
	 * Updates a store with the given id with the given data
	 * @param id The id of the store to update
	 * @param updatedData The data to update the store with
	 * @throws {NotFoundException} If no store is found with the given id
	 * @throws {BadRequestException} If the update fails
	 * @returns void
	 */
	public async updateOne(
		id: string,
		updatedData: Partial<Store>
	): Promise<void> {
		const existingStore = await this.prisma.store.findUnique({
			where: { id },
		});
		if (!existingStore) throw new NotFoundException("Store not found");

		try {
			await this.prisma.store.update({
				where: { id },
				data: { ...updatedData },
			});
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to update store"
			);
		}
	}

	/**
	 * Deletes a store with the given id
	 * @param id The id of the store to delete
	 * @throws {NotFoundException} If no store is found with the given id
	 * @throws {BadRequestException} If the deletion fails
	 * @returns void
	 */
	public async deleteOne(id: string): Promise<void> {
		const existingStore = await this.prisma.store.findUnique({
			where: { id },
		});
		if (!existingStore) throw new NotFoundException("Store not found");

		try {
			await this.prisma.store.delete({
				where: { id },
			});
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to delete store"
			);
		}
	}
}
