import validationHandler from "@src/middleware/validationHandler";
import { NextFunction } from "express";
import { body } from "express-validator";

// *** Validation rules *** //

// review creation validator
export const createReviewValidator = [
	body("content")
		.exists()
		.trim()
		.escape()
		.isString()
		.withMessage("Content must be a string"),
	body("rating")
		.exists()
		.isFloat({ min: 0, max: 5 })
		.withMessage("Rating must be a number between 0 and 5"),
	validationHandler,
];

// review update validator
export const updateReviewValidator = [
	body("content")
		.optional()
		.trim()
		.escape()
		.isString()
		.withMessage("Content must be a string"),
	body("rating")
		.optional()
		.isFloat({ min: 0, max: 5 })
		.withMessage("Rating must be a number between 0 and 5"),
	validationHandler,
];
