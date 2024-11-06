import validationHandler from "@src/middleware/validationHandler";
import { NextFunction } from "express";
import { body } from "express-validator";
import { Store, Species, StoreType } from "@prisma/client";

// *** Validation rules *** //

// store creation validator
export const createStoreValidator = [
	body("name")
		.exists()
		.trim()
		.escape()
		.isString()
		.withMessage("Name must be a string"),
	body("type")
		.exists()
		.isIn(Object.values(StoreType))
		.withMessage("Type must be one of the entries of the enum: Store.Type"),
	body("availabilityId")
		.optional()
		.isString()
		.withMessage("Availability id must be a string"),
	body("locationId")
		.optional()
		.isString()
		.withMessage("Location id must be a string"),
	body("userId").optional().isString().withMessage("User id must be a string"),
	body("species")
		.optional()
		.isArray()
		.withMessage("Species must be an array")
		.custom((value) =>
			value.every((v: any) => Object.values(Species).includes(v))
		)
		.withMessage("Species must be one of the entries of the enum: Species"),
	validationHandler,
];

// store update validator
export const updateStoreValidator = [
	body("name")
		.optional()
		.trim()
		.escape()
		.isString()
		.withMessage("Name must be a string"),
	body("type")
		.optional()
		.isIn(Object.values(StoreType))
		.withMessage("Type must be one of the entries of the enum: Store.Type"),
	body("availabilityId")
		.optional()
		.isString()
		.withMessage("Availability id must be a string"),
	body("locationId")
		.optional()
		.isString()
		.withMessage("Location id must be a string"),
	body("userId").optional().isString().withMessage("User id must be a string"),
	body("species")
		.optional()
		.isArray()
		.withMessage("Species must be an array")
		.custom((value) =>
			value.every((v: any) => Object.values(Species).includes(v))
		)
		.withMessage("Species must be one of the entries of the enum: Species"),
	validationHandler,
];
