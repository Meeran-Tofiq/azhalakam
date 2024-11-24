import validationHandler from "@src/middleware/validationHandler";
import { NextFunction } from "express";
import { body } from "express-validator";

// *** Validation rules *** //

// export const updateServiceProviderValidator = [
// 	body("reviewIds").optional(),
// 	body("serviceIds").optional(),
// 	validationHandler,
// ];
// review ids are an array of strings
// service ids are an array of strings

// serviceProvider creation validator
export const createServiceProviderValidator = [validationHandler];

// serviceProvider update validator
export const updateServiceProviderValidator = [
	body("reviewIds")
		.optional()
		.isArray({ min: 1 })
		.withMessage("Review ids must be an array of strings"),
	body("reviewIds.*")
		.optional()
		.isString()
		.withMessage("Review ids must be an array of strings"),
	body("serviceIds")
		.optional()
		.isArray({ min: 1 })
		.withMessage("Service ids must be an array of strings"),
	body("serviceIds.*")
		.optional()
		.isString()
		.withMessage("Service ids must be an array of strings"),
	validationHandler,
];
