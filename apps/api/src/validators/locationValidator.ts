import validationHandler from "@src/middleware/validationHandler";
import { NextFunction } from "express";
import { body } from "express-validator";

// *** Validation rules *** //

// location creation validator
export const createLocationValidator = [
	body("longitude")
		.exists()
		.isFloat()
		.withMessage("Longitude must be a float"),
	body("latitude").exists().isFloat().withMessage("Latitude must be a float"),
	validationHandler,
];

// location update validator
export const updateLocationValidator = [
	body("longitude")
		.optional()
		.isFloat()
		.withMessage("Longitude must be a float"),
	body("latitude")
		.optional()
		.isFloat()
		.withMessage("Latitude must be a float"),
	validationHandler,
];
