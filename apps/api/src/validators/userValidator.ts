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
];
