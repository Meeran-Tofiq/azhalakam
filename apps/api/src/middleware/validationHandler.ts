import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { ValidationException } from "../common/classes";

const validationHandler = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new ValidationException(errors.array());
		next(error);
	}
	next(); // Proceed to the next middleware/controller
};

export default validationHandler;
