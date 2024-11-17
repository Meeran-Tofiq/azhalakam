import { BadRequestException, NotFoundException } from "@src/common/classes";
import { PrismaClient } from "@prisma/client";
import prismaClient from "@src/common/PrismaClient";
import {
	CreateStoreInputs,
	CreateStoreResponse,
	DeleteStoreInputs,
	DeleteStoreResponse,
	GetAllUserStoresInputs,
	GetAllUserStoresResponse,
	GetStoreInputs,
	GetStoreResponse,
	UpdateStoreInputs,
	UpdateStoreResponse,
} from "@src/types/Store";

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
	public async create({
		userId,
		store,
	}: CreateStoreInputs): Promise<CreateStoreResponse> {
		try {
			const createdStore = await this.prisma.store.create({
				data: {
					...store,
					userId,
				},
				include: {
					products: true,
					availability: true,
					location: true,
					petStore: true,
					vetStore: true,
				},
			});

			return { storeId: createdStore.id, store: createdStore };
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
	public async getOne({ id }: GetStoreInputs): Promise<GetStoreResponse> {
		try {
			const store = await this.prisma.store.findUnique({
				where: { id },
				include: {
					products: true,
					availability: true,
					location: true,
					petStore: true,
					vetStore: true,
				},
			});

			if (!store) throw new NotFoundException("Store not found.");

			return { store };
		} catch (error: any) {
			throw new BadRequestException("Failed to get store");
		}
	}

	/**
	 * Retrieves all stores for a given user
	 * @param userId The id of the user to get the stores for
	 * @throws {BadRequestException} If the query fails
	 * @throws {NotFoundException} If no stores are found for the given user
	 * @returns An array of the found stores
	 */
	public async getAllStoresOfUser({
		userId,
	}: GetAllUserStoresInputs): Promise<GetAllUserStoresResponse> {
		try {
			const stores = await this.prisma.store.findMany({
				where: { userId },
				include: {
					products: true,
					availability: true,
					location: true,
					petStore: true,
					vetStore: true,
				},
			});

			if (!stores) throw new NotFoundException("Stores not found.");

			return { stores };
		} catch (error) {
			throw new BadRequestException("Failed to get stores");
		}
	}

	/**
	 * Updates a store with the given id with the given data
	 * @param id The id of the store to update
	 * @param updateData The data to update the store with
	 * @throws {NotFoundException} If no store is found with the given id
	 * @throws {BadRequestException} If the update fails
	 * @returns void
	 */
	public async updateOne({
		id,
		updateData,
	}: UpdateStoreInputs): Promise<UpdateStoreResponse> {
		const existingStore = await this.prisma.store.findUnique({
			where: { id },
		});
		if (!existingStore) throw new NotFoundException("Store not found");

		try {
			const store = await this.prisma.store.update({
				where: { id },
				data: { ...updateData },
				include: {
					products: true,
					availability: true,
					location: true,
					petStore: true,
					vetStore: true,
				},
			});

			return { store };
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
	public async deleteOne({
		id,
	}: DeleteStoreInputs): Promise<DeleteStoreResponse> {
		const existingStore = await this.prisma.store.findUnique({
			where: { id },
		});
		if (!existingStore) throw new NotFoundException("Store not found");

		try {
			const store = await this.prisma.store.delete({
				where: { id },
				include: {
					products: true,
					availability: true,
					location: true,
					petStore: true,
					vetStore: true,
				},
			});

			return { store };
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to delete store"
			);
		}
	}
}
