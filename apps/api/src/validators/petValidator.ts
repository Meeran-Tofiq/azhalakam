import validationHandler from "@src/middleware/validationHandler";
import { NextFunction } from "express";
import { body } from "express-validator";
import { Gender, Pet, Species } from "@prisma/client";

// *** Validation rules *** //

// pet creation validator
export const createPetValidator = [
	body("name")
		.exists()
		.trim()
		.escape()
		.isString()
		.withMessage("Name must be a string"),
	body("dateOfBirth")
		.optional()
		.trim()
		.escape()
		.isISO8601()
		.withMessage("Date of Birth must be a valid date."),
	body("weight").optional().isFloat().withMessage("Weight must be a number"),
	body("species")
		.exists()
		.isIn(Object.values(Species))
		.withMessage("Species must be one of the entries of the enum: Species"),
	body("gender")
		.optional()
		.isIn(Object.values(Gender))
		.withMessage("Gender must be one of the entires of the enum: Gender"),
	body("lastVetVisit")
		.optional()
		.isISO8601()
		.withMessage("Last vet visit must be a valid ISO date"),
	body("notes").optional().isString().withMessage("Notes must be a string"),
	validationHandler,
];

// pet update validator
export const updatePetValidator = [
	body("name")
		.optional()
		.trim()
		.escape()
		.isString()
		.withMessage("Name must be a string"),
	body("age").optional().isInt().withMessage("Age must be a number"),
	body("weight").optional().isFloat().withMessage("Weight must be a number"),
	body("species")
		.optional()
		.isIn(Object.values(Species))
		.withMessage("Species must be one of the entries of the enum: Species"),
	body("gender")
		.optional()
		.isIn(Object.values(Gender))
		.withMessage("Gender must be one of the entries of the enum: Gender"),
	body("lastVetVisit")
		.optional()
		.isISO8601()
		.withMessage("Last vet visit must be a valid ISO date"),
	body("notes").optional().isString().withMessage("Notes must be a string"),
	validationHandler,
];
