import validationHandler from "@src/middleware/validationHandler";
import { NextFunction } from "express";
import { body } from "express-validator";

// *** Validation rules *** //

// vet creation validator
export const createVetValidator = [
	body("name")
		.trim()
		.exists()
		.isString()
		.withMessage("Name must be a string"),
	validationHandler,
];

// vet update validator
export const updateVetValidator = [
	body("name")
		.optional()
		.trim()
		.isString()
		.withMessage("Name must be a string"),
	validationHandler,
];
