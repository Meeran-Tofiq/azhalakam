import userToken from "../utils/userToken";
import {
	CreateAppointmentInputs,
	CreateAppointmentResponse,
	DeleteAppointmentInputs,
	DeleteAppointmentResponse,
	GetAllUserAppointmentsResponse,
	GetAppointmentInputs,
	GetAppointmentResponse,
	UpdateAppointmentInputs,
	UpdateAppointmentResponse,
} from "@api-types/Appointment";

export default class AppointmentApi {
	private appointmentUrl: String;

	constructor(baseUrl: String) {
		this.appointmentUrl = baseUrl + "/appointments";
	}

	/**
	 * Asynchronously fetches all appointments associated with the current user.
	 * Requires an authentication token to be provided for the request.
	 * @throws {Error} If no token is provided, if the request fails, or if the response is not ok.
	 * @returns A Promise that resolves with the JSON data of all appointments.
	 */
	async getAllAppointmentsOfUser(): Promise<GetAllUserAppointmentsResponse> {
		if (!userToken.getToken())
			throw new Error(
				"No token provided for this request. Requires a token of a user to be set."
			);

		try {
			const response = await fetch(`${this.appointmentUrl}/all`, {
				headers: { Authorization: `Bearer ${userToken.getToken()}` },
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Asynchronously fetches a appointment with the given id.
	 * @param id The id of the appointment to retrieve
	 * @throws {Error} If no appointment is provided, if the request fails, or if the response is not ok.
	 * @returns A Promise that resolves with the JSON data of the appointment.
	 */
	async getAppointmentFromId({
		id,
	}: GetAppointmentInputs): Promise<GetAppointmentResponse> {
		if (!id) throw new Error("No appointment provided for this request.");

		try {
			const response = await fetch(`${this.appointmentUrl}/${id}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Asynchronously creates a new appointment for the current user.
	 * Requires a valid authentication token to be provided for the request.
	 * @param appointment The data to create the appointment with, excluding the userId.
	 * @throws {Error} If no token is provided, if the request fails, or if the response is not ok.
	 * @returns A Promise that resolves with the JSON data of the created appointment.
	 */
	async createAppointment({
		appointment,
	}: Omit<
		CreateAppointmentInputs,
		"userId"
	>): Promise<CreateAppointmentResponse> {
		if (!userToken.getToken())
			throw new Error(
				"No token provided for this request. Requires a token of a user to be set."
			);

		try {
			const response = await fetch(`${this.appointmentUrl}/create`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userToken.getToken()}`,
				},
				body: JSON.stringify(appointment),
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Asynchronously updates a appointment with the given id with the given data.
	 * @param id The id of the appointment to update
	 * @param updateData The data to update the appointment with
	 * @throws {Error} If no appointment is provided, if the request fails, or if the response is not ok.
	 * @returns A Promise that resolves with the JSON data of the updated appointment.
	 */
	async updateAppointment({
		id,
		updateData,
	}: UpdateAppointmentInputs): Promise<UpdateAppointmentResponse> {
		if (!id) throw new Error("No appointment provided for this request.");

		try {
			const response = await fetch(
				`${this.appointmentUrl}/${id}/update`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(updateData),
				}
			);

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Asynchronously deletes a appointment with the given id.
	 * @param id The id of the appointment to delete
	 * @throws {Error} If no appointment is provided, if the request fails, or if the response is not ok.
	 * @returns A Promise that resolves with the JSON data of the deleted appointment.
	 */
	async deleteAppointment({
		id,
	}: DeleteAppointmentInputs): Promise<DeleteAppointmentResponse> {
		if (!id) throw new Error("No appointment provided for this request.");

		try {
			const response = await fetch(
				`${this.appointmentUrl}/${id}/delete`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}
}
