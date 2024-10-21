import validationHandler from "@src/middleware/validationHandler";
import { NextFunction } from "express";
import { body } from "express-validator";

// *** Validation rules *** //

// user creation validator
export const createUserValidator = [
	body("username")
		.exists()
		.trim()
		.escape()
		.isString()
		.isLength({ min: 3, max: 20 })
		.withMessage("Username must be between 3 and 20 characters")
		.matches(/^[a-zA-Z0-9_-]+$/)
		.withMessage(
			"Username can only contain letters, numbers, underscores, and hyphens."
		),
	body("email").exists().trim().escape().isEmail().withMessage("Invalid email"),
	body("password")
		.exists()
		.trim()
		.escape()
		.isLength({ min: 8 })
		.withMessage("Password must be at least 8 characters long")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
		)
		.withMessage(
			"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
		),
	body("firstName")
		.exists()
		.trim()
		.escape()
		.isString()
		.isLength({ min: 3, max: 20 })
		.withMessage("First name must be between 3 and 20 characters")
		.matches(/^[a-zA-Z0-9_-]+$/)
		.withMessage(
			"First name can only contain letters, numbers, underscores, and hyphens."
		),
	body("lastName")
		.exists()
		.trim()
		.escape()
		.isString()
		.isLength({ min: 3, max: 20 })
		.withMessage("Last name must be between 3 and 20 characters")
		.matches(/^[a-zA-Z0-9_-]+$/)
		.withMessage(
			"Last name can only contain letters, numbers, underscores, and hyphens."
		),
	body("phoneNo")
		.exists()
		.trim()
		.escape()
		.isString()
		.isLength({ min: 13, max: 17 })
		.withMessage("Phone number must be in the correct format")
		.matches(/^(?:\+964\s|0)(\d{3}\s\d{3}\s\d{4})$/)
		.withMessage(
			"Invalid phone number format. It should be either +964 xxx xxx xxxx or 0xxx xxx xxxx"
		),
	validationHandler,
];

// user update validator
export const updateUserValidator = [
	body("username")
		.optional()
		.trim()
		.escape()
		.isString()
		.isLength({ min: 3, max: 20 })
		.withMessage("Username must be between 3 and 20 characters")
		.matches(/^[a-zA-Z0-9_-]+$/)
		.withMessage(
			"Username can only contain letters, numbers, underscores, and hyphens."
		),
	body("email")
		.optional()
		.trim()
		.escape()
		.isEmail()
		.withMessage("Invalid email"),
	body("password")
		.optional()
		.trim()
		.escape()
		.isLength({ min: 8 })
		.withMessage("Password must be at least 8 characters long")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
		)
		.withMessage(
			"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
		),
	body("firstName")
		.optional()
		.trim()
		.escape()
		.isString()
		.isLength({ min: 3, max: 20 })
		.withMessage("First name must be between 3 and 20 characters")
		.matches(/^[a-zA-Z0-9_-]+$/)
		.withMessage(
			"First name can only contain letters, numbers, underscores, and hyphens."
		),
	body("lastName")
		.optional()
		.trim()
		.escape()
		.isString()
		.isLength({ min: 3, max: 20 })
		.withMessage("Last name must be between 3 and 20 characters")
		.matches(/^[a-zA-Z0-9_-]+$/)
		.withMessage(
			"Last name can only contain letters, numbers, underscores, and hyphens."
		),
	body("phoneNo")
		.optional()
		.trim()
		.escape()
		.isString()
		.isLength({ min: 13, max: 17 })
		.withMessage("Phone number must be in the correct format")
		.matches(/^(?:\+964\s|0)(\d{3}\s\d{3}\s\d{4})$/)
		.withMessage(
			"Invalid phone number format. It should be either +964 xxx xxx xxxx or 0xxx xxx xxxx"
		),
	body("bio")
		.optional()
		.trim()
		.escape()
		.isString()
		.withMessage("Bio must be composed of text"),
	body("serviceProviderId")
		.optional()
		.trim()
		.escape()
		.isString()
		.withMessage("Service provider id must be a string"),
	body("storeId")
		.optional()
		.trim()
		.escape()
		.isString()
		.withMessage("Store id must be a string"),
	validationHandler,
];
