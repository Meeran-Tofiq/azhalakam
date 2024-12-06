import validationHandler from "@src/middleware/validationHandler";
import { NextFunction } from "express";
import { body } from "express-validator";
import { Gender, Appointment, Species } from "@prisma/client";

// *** Validation rules *** //

// appointment creation validator
export const createAppointmentValidator = [
	validationHandler,
];

// appointment update validator
export const updateAppointmentValidator = [
	validationHandler,
];
