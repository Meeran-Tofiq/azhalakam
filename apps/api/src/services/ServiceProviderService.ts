import { BadRequestException, NotFoundException } from "@src/common/classes";
import { PrismaClient, Prisma, Review, Service } from "@prisma/client";
import prismaClient from "@src/common/PrismaClient";
import {
	CreateServiceProviderInputs,
	CreateServiceProviderResponse,
	DeleteServiceProviderInputs,
	DeleteServiceProviderResponse,
	GetServiceProviderInputs,
	GetServiceProviderResponse,
	UpdateServiceProviderInputs,
	UpdateServiceProviderResponse,
} from "@src/types/ServiceProvider";

// **** Variables **** //

export default class ServiceProviderServiceFactory {
	public static create(customPrismaClient?: PrismaClient) {
		return new ServiceProviderService(customPrismaClient || prismaClient);
	}
}

class ServiceProviderService {
	private prisma: PrismaClient;
	private serviceProviderPageLimit: number = 15;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	// **** Public Methods **** //

	/**
	 * Creates a new serviceProvider
	 * @param serviceProvider The data to create the serviceProvider with
	 * @throws {BadRequestException} If the creation fails
	 * @returns The id of the created serviceProvider
	 */
	public async create({
		serviceProvider,
	}: CreateServiceProviderInputs): Promise<CreateServiceProviderResponse> {
		try {
			const createdServiceProvider =
				await this.prisma.serviceProvider.create({
					data: serviceProvider,
					include: {
						reviews: true,
						services: true,
					},
				});

			return { serviceProvider: createdServiceProvider };
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to create serviceProvider"
			);
		}
	}

	/**
	 * Retrieves a serviceProvider by id
	 * @param id The id of the serviceProvider to retrieve
	 * @throws {BadRequestException} If the query fails
	 * @throws {NotFoundException} If no serviceProvider is found with the given id
	 * @returns The found serviceProvider
	 */
	public async getOne({
		id,
	}: GetServiceProviderInputs): Promise<GetServiceProviderResponse> {
		try {
			const serviceProvider =
				await this.prisma.serviceProvider.findUnique({
					where: { id },
					include: {
						reviews: true,
						services: true,
					},
				});

			if (!serviceProvider)
				throw new NotFoundException("ServiceProvider not found.");

			return { serviceProvider };
		} catch (error: any) {
			throw new BadRequestException("Failed to get serviceProvider");
		}
	}

	/**
	 * Updates a serviceProvider with the given id with the given data
	 * @param id The id of the serviceProvider to update
	 * @param updatedData The data to update the serviceProvider with
	 * @throws {NotFoundException} If no serviceProvider is found with the given id
	 * @throws {BadRequestException} If the update fails
	 * @returns void
	 */
	public async updateOne({
		id,
		updateData,
	}: UpdateServiceProviderInputs): Promise<UpdateServiceProviderResponse> {
		try {
			const { serviceIds, reviewIds, ...rest } = updateData;

			const existingServiceProvider =
				await this.prisma.serviceProvider.findUnique({
					where: { id },
					include: {
						reviews: true,
						services: true,
					},
				});

			if (!existingServiceProvider)
				throw new NotFoundException("ServiceProvider not found");

			let data: Prisma.ServiceProviderUpdateInput = {
				...rest,
			};

			if (updateData.serviceIds) {
				data.services = this.getServiceConnections(
					existingServiceProvider.services,
					updateData.serviceIds
				);
			}

			if (updateData.reviewIds) {
				data.reviews = this.getReviewConnections(
					existingServiceProvider.reviews,
					updateData.reviewIds
				);
			}

			const serviceProvider = await this.prisma.serviceProvider.update({
				where: { id },
				data,
				include: {
					reviews: true,
					services: true,
				},
			});

			return { serviceProvider };
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to update serviceProvider"
			);
		}
	}

	/**
	 * Deletes a serviceProvider with the given id
	 * @param id The id of the serviceProvider to delete
	 * @throws {NotFoundException} If no serviceProvider is found with the given id
	 * @throws {BadRequestException} If the deletion fails
	 * @returns void
	 */
	public async deleteOne({
		id,
	}: DeleteServiceProviderInputs): Promise<DeleteServiceProviderResponse> {
		const existingServiceProvider =
			await this.prisma.serviceProvider.findUnique({
				where: { id },
			});
		if (!existingServiceProvider)
			throw new NotFoundException("ServiceProvider not found");

		try {
			const serviceProvider = await this.prisma.serviceProvider.delete({
				where: { id },
				include: {
					reviews: true,
					services: true,
				},
			});

			return { serviceProvider };
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to delete serviceProvider"
			);
		}
	}

	// **** Private Methods **** //
	private getServiceConnections(
		existingServices: Service[],
		serviceIds?: string[]
	): Prisma.ServiceUpdateManyWithoutProviderNestedInput | undefined {
		if (!serviceIds) return undefined;

		const connect = serviceIds
			.filter(
				(id) => !existingServices.find((service) => service.id === id)
			)
			.map((id) => ({ id }));

		const disconnect = serviceIds
			.filter((id) =>
				existingServices.find((service) => service.id === id)
			)
			.map((id) => ({ id }));

		return {
			connect,
			disconnect,
		};
	}

	private getReviewConnections(
		existingReviews: Review[],
		reviewIds?: string[]
	): Prisma.ReviewUpdateManyWithoutServiceProviderNestedInput | undefined {
		if (!reviewIds) return undefined;

		const connect = reviewIds
			.filter((id) => !existingReviews.find((review) => review.id === id))
			.map((id) => ({ id }));

		const disconnect = reviewIds
			.filter((id) => existingReviews.find((review) => review.id === id))
			.map((id) => ({ id }));

		return {
			connect,
			disconnect,
		};
	}
}
