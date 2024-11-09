import {
	BadRequestException,
	ForbiddenException,
	NotFoundException,
	UnauthorizedException,
} from "@src/common/classes";
import { Pet, PrismaClient } from "@prisma/client";
import prismaClient from "@src/common/PrismaClient";
import EnvVars from "@src/common/EnvVars";
import CustomJwtPayload from "@src/types/TokenPayload";

// **** Variables **** //

export default class PetServiceFactory {
	public static create(customPrismaClient?: PrismaClient) {
		return new PetService(customPrismaClient || prismaClient);
	}
}

class PetService {
	private prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	// **** Public Methods **** //

	/**
	 * Creates a new pet
	 * @param pet The data to create the pet with
	 * @throws {BadRequestException} If the creation fails
	 * @returns The id of the created pet
	 */
	public async create(
		userId: string,
		pet: Omit<Pet, "id" | "userId">
	): Promise<string> {
		try {
			const createdPet = await this.prisma.pet.create({
				data: {
					...pet,
					userId,
				},
			});

			return createdPet.id;
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to create pet"
			);
		}
	}

	/**
	 * Retrieves a pet by id
	 * @param id The id of the pet to retrieve
	 * @throws {BadRequestException} If the query fails
	 * @throws {NotFoundException} If no pet is found with the given id
	 * @returns The found pet
	 */
	public async getOne(id: string): Promise<Partial<Pet>> {
		let pet: Partial<Pet> | null;

		try {
			pet = await this.prisma.pet.findUnique({
				where: { id },
				select: {
					name: true,
					age: true,
					gender: true,
					lastVetVisit: true,
					notes: true,
					species: true,
					weight: true,
					id: true,
					userId: false,
				},
			});
		} catch (error: any) {
			throw new BadRequestException("Failed to get pet");
		}

		if (!pet) throw new NotFoundException("Pet not found.");

		return pet;
	}

	/**
	 * Retrieves all pets for a given user
	 * @param userId The id of the user to get the pets for
	 * @throws {BadRequestException} If the query fails
	 * @throws {NotFoundException} If no pets are found for the given user
	 * @returns An array of the found pets
	 */
	public async getAllUserPets(userId: string): Promise<Partial<Pet>[]> {
		let pets: Partial<Pet>[];

		try {
			pets = await this.prisma.pet.findMany({
				where: { userId },
				select: {
					name: true,
					age: true,
					gender: true,
					lastVetVisit: true,
					notes: true,
					species: true,
					weight: true,
					id: true,
					userId: false,
				},
			});
		} catch (error) {
			throw new BadRequestException("Failed to get pets");
		}

		if (!pets) throw new NotFoundException("Pets not found.");

		return pets;
	}

	/**
	 * Updates a pet with the given id with the given data
	 * @param id The id of the pet to update
	 * @param updatedData The data to update the pet with
	 * @throws {NotFoundException} If no pet is found with the given id
	 * @throws {BadRequestException} If the update fails
	 * @returns void
	 */
	public async updateOne(
		id: string,
		updatedData: Partial<Pet>
	): Promise<void> {
		const existingPet = await this.prisma.pet.findUnique({
			where: { id },
		});
		if (!existingPet) throw new NotFoundException("Pet not found");

		try {
			await this.prisma.pet.update({
				where: { id },
				data: { ...updatedData },
			});
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to update pet"
			);
		}
	}

	/**
	 * Deletes a pet with the given id
	 * @param id The id of the pet to delete
	 * @throws {NotFoundException} If no pet is found with the given id
	 * @throws {BadRequestException} If the deletion fails
	 * @returns void
	 */
	public async deleteOne(id: string): Promise<void> {
		const existingPet = await this.prisma.pet.findUnique({
			where: { id },
		});
		if (!existingPet) throw new NotFoundException("Pet not found");

		try {
			await this.prisma.pet.delete({
				where: { id },
			});
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to delete pet"
			);
		}
	}
}
