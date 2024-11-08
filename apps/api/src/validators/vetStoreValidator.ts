import validationHandler from "@src/middleware/validationHandler";
import { NextFunction } from "express";
import { body } from "express-validator";

// *** Validation rules *** //

// store creation validator
export const createVetStoreValidator = [
	body("vetIds").optional().isArray().withMessage("vetIds must be an array"),
	body("serviceIds")
		.optional()
		.isArray()
		.withMessage("serviceIds must be an array"),
	validationHandler,
];

// store update validator
export const updateVetStoreValidator = [
	body("vetIds").optional().isArray().withMessage("vetIds must be an array"),
	body("serviceIds")
		.optional()
		.isArray()
		.withMessage("serviceIds must be an array"),
	validationHandler,
];
