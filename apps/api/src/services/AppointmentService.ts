import { BadRequestException, NotFoundException } from "@src/common/classes";
import { PrismaClient } from "@prisma/client";
import prismaClient from "@src/common/PrismaClient";
import {
	CreateAppointmentInputs,
	CreateAppointmentResponse,
	DeleteAppointmentInputs,
	DeleteAppointmentResponse,
	GetAllUserAppointmentsInputs,
	GetAllUserAppointmentsResponse,
	GetAppointmentInputs,
	GetAppointmentResponse,
	UpdateAppointmentInputs,
	UpdateAppointmentResponse,
} from "@src/types/Appointment";

// **** Variables **** //

export default class AppointmentServiceFactory {
	public static create(customPrismaClient?: PrismaClient) {
		return new AppointmentService(customPrismaClient || prismaClient);
	}
}

class AppointmentService {
	private prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	// **** Public Methods **** //

	/**
	 * Creates a new appointment
	 * @param appointment The data to create the appointment with
	 * @throws {BadRequestException} If the creation fails
	 * @returns The id of the created appointment
	 */
	public async create({
		appointment,
		userId,
	}: CreateAppointmentInputs): Promise<CreateAppointmentResponse> {
		try {
			const createdAppointment = await this.prisma.appointment.create({
				data: {
					...appointment,
					userId,
				},
				include: {
					vetStore: {
						include: {
							store: true,
						},
					},
				},
			});

			return { appointment: createdAppointment };
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to create appointment"
			);
		}
	}

	/**
	 * Retrieves a appointment by id
	 * @param id The id of the appointment to retrieve
	 * @throws {BadRequestException} If the query fails
	 * @throws {NotFoundException} If no appointment is found with the given id
	 * @returns The found appointment
	 */
	public async getOne({
		id,
	}: GetAppointmentInputs): Promise<GetAppointmentResponse> {
		try {
			const appointment = await this.prisma.appointment.findUnique({
				where: { id },
				include: {
					vetStore: {
						include: {
							store: true,
						},
					},
				},
			});

			if (!appointment)
				throw new NotFoundException("Appointment not found.");

			return { appointment };
		} catch (error: any) {
			throw new BadRequestException("Failed to get appointment");
		}
	}

	/**
	 * Retrieves all appointments for a given user
	 * @param userId The id of the user to get the appointments for
	 * @throws {BadRequestException} If the query fails
	 * @throws {NotFoundException} If no appointments are found for the given user
	 * @returns An array of the found appointments
	 */
	public async getAllUserAppointments({
		userId,
	}: GetAllUserAppointmentsInputs): Promise<GetAllUserAppointmentsResponse> {
		try {
			const appointments = await this.prisma.appointment.findMany({
				where: { userId },
				include: {
					vetStore: {
						include: {
							store: true,
						},
					},
				},
			});

			if (!appointments)
				throw new NotFoundException("Appointments not found.");

			return { appointments };
		} catch (error) {
			throw new BadRequestException("Failed to get appointments");
		}
	}

	/**
	 * Updates a appointment with the given id with the given data
	 * @param id The id of the appointment to update
	 * @param updatedData The data to update the appointment with
	 * @throws {NotFoundException} If no appointment is found with the given id
	 * @throws {BadRequestException} If the update fails
	 * @returns void
	 */
	public async updateOne({
		id,
		updateData,
	}: UpdateAppointmentInputs): Promise<UpdateAppointmentResponse> {
		const existingAppointment = await this.prisma.appointment.findUnique({
			where: { id },
		});
		if (!existingAppointment)
			throw new NotFoundException("Appointment not found");

		try {
			const appointment = await this.prisma.appointment.update({
				where: { id },
				data: { ...updateData },
				include: {
					vetStore: {
						include: {
							store: true,
						},
					},
				},
			});

			return { appointment };
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to update appointment"
			);
		}
	}

	/**
	 * Deletes a appointment with the given id
	 * @param id The id of the appointment to delete
	 * @throws {NotFoundException} If no appointment is found with the given id
	 * @throws {BadRequestException} If the deletion fails
	 * @returns void
	 */
	public async deleteOne({
		id,
	}: DeleteAppointmentInputs): Promise<DeleteAppointmentResponse> {
		const existingAppointment = await this.prisma.appointment.findUnique({
			where: { id },
		});
		if (!existingAppointment)
			throw new NotFoundException("Appointment not found");

		try {
			const appointment = await this.prisma.appointment.delete({
				where: { id },
				include: {
					vetStore: {
						include: {
							store: true,
						},
					},
				},
			});

			return { appointment };
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to delete appointment"
			);
		}
	}
}
