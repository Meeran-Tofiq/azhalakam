import { Prisma, Appointment } from "@prisma/client";

export type AppointmentWithIncludes = Prisma.AppointmentGetPayload<{
	include: {};
}>;

// Create a appointment types

export type CreateAppointmentInputs = {
	appointment: Omit<
		Prisma.AppointmentCreateInput,
		"id" | "user" | "vetStore"
	> & { vetStoreId: string };
	userId: string;
};
export type CreateAppointmentResponse = {
	appointment: AppointmentWithIncludes;
};

// Get appointment(s) types

export type GetAppointmentInputs = {
	id: string;
};

export type GetAppointmentResponse = { appointment: AppointmentWithIncludes };

export type GetAllUserAppointmentsInputs = {
	userId: string;
};
export type GetAllUserAppointmentsResponse = {
	appointments: AppointmentWithIncludes[];
};

// Update appointment types

export type UpdateAppointmentInputs = {
	id: string;
	updateData: Omit<Prisma.AppointmentUpdateInput, "id" | "user" | "vetStore">;
};
export type UpdateAppointmentResponse = {
	appointment: AppointmentWithIncludes;
};

// Delete appointment types

export type DeleteAppointmentInputs = {
	id: string;
};
export type DeleteAppointmentResponse = {
	appointment: AppointmentWithIncludes;
};
