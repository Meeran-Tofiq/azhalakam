import { BadRequestException, NotFoundException } from "@src/common/classes";
import { VetStore, PrismaClient, Prisma, Vet, Service } from "@prisma/client";
import prismaClient from "@src/common/PrismaClient";

// **** Variables **** //

export default class VetStoreServiceFactory {
	public static create(customPrismaClient?: PrismaClient) {
		return new VetStoreService(customPrismaClient || prismaClient);
	}
}

class VetStoreService {
	private prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	// **** Public Methods **** //

	/**
	 * Creates a new vet store
	 * @param vetStore The data to create the vetStore with
	 * @throws {BadRequestException} If the creation fails
	 * @returns The id of the created vetStore
	 */
	public async create(
		storeId: string,
		vetStore: Prisma.VetStoreCreateInput
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

			const createdVetStore = await this.prisma.vetStore.create({
				data: {
					...vetStore,
					store: {
						connect: {
							id: storeId,
						},
					},
				},
			});

			return createdVetStore.id;
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to create vet store"
			);
		}
	}

	/**
	 * Retrieves a vetStore by id
	 * @param id The id of the vetStore to retrieve
	 * @throws {BadRequestException} If the query fails
	 * @throws {NotFoundException} If no vetStore is found with the given id
	 * @returns The found vetStore
	 */
	public async getOne(id: string): Promise<Partial<VetStore>> {
		let vetStore: Partial<VetStore> | null;

		try {
			vetStore = await this.prisma.vetStore.findUnique({
				where: { id },
				include: {
					services: true,
					vets: true,
				},
			});
		} catch (error: any) {
			throw new BadRequestException("Failed to get vet store");
		}

		if (!vetStore) throw new NotFoundException("Vet store not found.");

		return vetStore;
	}

	/**
	 * Updates a vetStore with the given id with the given data
	 * @param id The id of the vetStore to update
	 * @param updatedData The data to update the vetStore with
	 * @throws {NotFoundException} If no vetStore is found with the given id
	 * @throws {BadRequestException} If the update fails
	 * @returns void
	 */
	public async updateOne(
		id: string,
		updatedData: Partial<Omit<VetStore, "id">> & {
			storeId?: string;
			vets?: string[];
			services?: string[];
		}
	): Promise<void> {
		const existingVetStore = await this.prisma.vetStore.findUnique({
			where: { id },
			include: {
				services: true,
				vets: true,
				store: true,
			},
		});

		const storeId = this.getStoreConnection(updatedData.storeId);
		const vetIds = this.getVetConnections(
			existingVetStore?.vets || [],
			updatedData.vets
		);
		const serviceIds = this.getServiceConnections(
			existingVetStore?.services || [],
			updatedData.services
		);

		const data: Prisma.VetStoreUpdateInput = {
			...updatedData,
			store: storeId,
			vets: vetIds,
			services: serviceIds,
		};

		console.log("data", data);

		try {
			await this.prisma.vetStore.update({
				where: { id },
				data,
			});
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to update vet store"
			);
		}
	}

	/**
	 * Deletes a vetStore with the given id
	 * @param id The id of the vetStore to delete
	 * @throws {NotFoundException} If no vetStore is found with the given id
	 * @throws {BadRequestException} If the deletion fails
	 * @returns void
	 */
	public async deleteOne(id: string): Promise<void> {
		const existingVetStore = await this.prisma.vetStore.findUnique({
			where: { id },
		});
		if (!existingVetStore) throw new NotFoundException("Vet store not found");

		try {
			await this.prisma.vetStore.delete({
				where: { id },
			});
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to delete vet store"
			);
		}
	}

	// **** Private Methods **** //

	private getStoreConnection(
		storeId?: string
	): Prisma.StoreUpdateOneRequiredWithoutVetStoreNestedInput | undefined {
		return storeId
			? {
					connect: {
						id: storeId,
					},
				}
			: undefined;
	}

	private getVetConnections(
		existingVets: Vet[],
		vetIds?: string[]
	): Prisma.VetUpdateManyWithoutVetStoreNestedInput | undefined {
		if (!vetIds) return undefined;

		const connect = vetIds
			.filter((id) => !existingVets.find((vet) => vet.id === id))
			.map((id) => ({ id }));

		const disconnect = vetIds
			.filter((id) => existingVets.find((vet) => vet.id === id))
			.map((id) => ({ id }));

		return {
			connect,
			disconnect,
		};
	}

	private getServiceConnections(
		existingServices: Service[],
		serviceIds?: string[]
	): Prisma.ServiceUpdateManyWithoutVetStoreNestedInput | undefined {
		if (!serviceIds) return undefined;

		const connect = serviceIds
			.filter((id) => !existingServices.find((service) => service.id === id))
			.map((id) => ({ id }));

		const disconnect = serviceIds
			.filter((id) => existingServices.find((service) => service.id === id))
			.map((id) => ({ id }));

		return {
			connect,
			disconnect,
		};
	}
}
