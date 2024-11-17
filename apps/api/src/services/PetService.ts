import { BadRequestException, NotFoundException } from "@src/common/classes";
import { PrismaClient } from "@prisma/client";
import prismaClient from "@src/common/PrismaClient";
import {
	CreatePetInputs,
	CreatePetResponse,
	DeletePetInputs,
	DeletePetResponse,
	GetAllUserPetsInputs,
	GetAllUserPetsResponse,
	GetPetInputs,
	GetPetResponse,
	UpdatePetInputs,
	UpdatePetResponse,
} from "@src/types/Pet";

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
	public async create({
		userId,
		pet,
	}: CreatePetInputs): Promise<CreatePetResponse> {
		try {
			const createdPet = await this.prisma.pet.create({
				data: {
					...pet,
					userId,
				},
			});

			return { pet: createdPet };
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
	public async getOne({ id }: GetPetInputs): Promise<GetPetResponse> {
		try {
			const pet = await this.prisma.pet.findUnique({
				where: { id },
			});

			if (!pet) throw new NotFoundException("Pet not found.");

			return { pet };
		} catch (error: any) {
			throw new BadRequestException("Failed to get pet");
		}
	}

	/**
	 * Retrieves all pets for a given user
	 * @param userId The id of the user to get the pets for
	 * @throws {BadRequestException} If the query fails
	 * @throws {NotFoundException} If no pets are found for the given user
	 * @returns An array of the found pets
	 */
	public async getAllUserPets({
		userId,
	}: GetAllUserPetsInputs): Promise<GetAllUserPetsResponse> {
		try {
			const pets = await this.prisma.pet.findMany({
				where: { userId },
			});

			if (!pets) throw new NotFoundException("Pets not found.");

			return { pets };
		} catch (error) {
			throw new BadRequestException("Failed to get pets");
		}
	}

	/**
	 * Updates a pet with the given id with the given data
	 * @param id The id of the pet to update
	 * @param updatedData The data to update the pet with
	 * @throws {NotFoundException} If no pet is found with the given id
	 * @throws {BadRequestException} If the update fails
	 * @returns void
	 */
	public async updateOne({
		id,
		updateData,
	}: UpdatePetInputs): Promise<UpdatePetResponse> {
		const existingPet = await this.prisma.pet.findUnique({
			where: { id },
		});
		if (!existingPet) throw new NotFoundException("Pet not found");

		try {
			const pet = await this.prisma.pet.update({
				where: { id },
				data: { ...updateData },
			});

			return { pet };
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
	public async deleteOne({
		id,
	}: DeletePetInputs): Promise<DeletePetResponse> {
		const existingPet = await this.prisma.pet.findUnique({
			where: { id },
		});
		if (!existingPet) throw new NotFoundException("Pet not found");

		try {
			const pet = await this.prisma.pet.delete({
				where: { id },
			});

			return { pet };
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to delete pet"
			);
		}
	}
}
