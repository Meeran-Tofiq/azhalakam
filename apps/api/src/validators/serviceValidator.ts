import validationHandler from "@src/middleware/validationHandler";
import { NextFunction } from "express";
import { body } from "express-validator";
import { $Enums } from "@prisma/client";

// *** Validation rules *** //

// service creation validator
export const createServiceValidator = [
	body("name")
		.exists()
		.trim()
		.escape()
		.isString()
		.withMessage("Name must be a string"),
	body("price").exists().isFloat().withMessage("Price must be a number"),
	body("description")
		.exists()
		.trim()
		.escape()
		.isString()
		.withMessage("Description must be a string"),
	body("billingType")
		.optional()
		.isIn(Object.values($Enums.BillingType))
		.withMessage(
			"Billing type must be one of the entries of the enum: BillingType"
		),
	body("durationInMinutes")
		.optional()
		.isInt({ min: 1 })
		.withMessage("DurationInMinutes must be a positive integer"),
	validationHandler,
];

// service update validator
export const updateServiceValidator = [
	body("name")
		.optional()
		.trim()
		.escape()
		.isString()
		.withMessage("Name must be a string"),
	body("price").optional().isFloat().withMessage("Price must be a number"),
	body("description")
		.optional()
		.trim()
		.escape()
		.isString()
		.withMessage("Description must be a string"),
	body("billingType")
		.optional()
		.isIn(Object.values($Enums.BillingType))
		.withMessage(
			"Billing type must be one of the entries of the enum: BillingType"
		),
	body("durationInMinutes")
		.optional()
		.isInt({ min: 1 })
		.withMessage("DurationInMinutes must be a positive integer"),
	validationHandler,
];
