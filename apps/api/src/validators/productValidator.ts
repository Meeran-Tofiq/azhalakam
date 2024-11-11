import validationHandler from "@src/middleware/validationHandler";
import { NextFunction } from "express";
import { body } from "express-validator";

// *** Validation rules *** //

// product creation validator
export const createProductValidator = [
	body("storeId").exists().isString().withMessage("storeId is required"),
	body("name")
		.exists()
		.trim()
		.escape()
		.isString()
		.withMessage("Name must be a string"),
	body("price")
		.exists()
		.isFloat({ gt: 0 })
		.withMessage("Price must be a positive number"),
	body("description")
		.optional()
		.trim()
		.escape()
		.isString()
		.withMessage("Description must be a string"),
	validationHandler,
];

// product update validator
export const updateProductValidator = [
	body("name")
		.optional()
		.trim()
		.escape()
		.isString()
		.withMessage("Name must be a string"),
	body("price")
		.optional()
		.isFloat({ gt: 0 })
		.withMessage("Price must be a positive number"),
	body("description")
		.optional()
		.trim()
		.escape()
		.isString()
		.withMessage("Description must be a string"),
	body("reviewIds")
		.optional()
		.isArray()
		.withMessage("reviewIds must be an array"),
	body("reviewIds.*")
		.optional()
		.isString()
		.withMessage("reviewIds must be an array of strings"),
	validationHandler,
];
