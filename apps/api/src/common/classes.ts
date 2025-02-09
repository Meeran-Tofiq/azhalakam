import HttpStatusCodes from "@src/common/HttpStatusCodes";
import { ValidationError } from "express-validator";

/**
 * Error with status code and message.
 */
export class RouteError extends Error {
	public status: HttpStatusCodes;

	public constructor(status: HttpStatusCodes, message: string) {
		super(message);
		this.status = status;
		Object.setPrototypeOf(this, RouteError.prototype);
	}
}

/**
 * Status code: 400
 * If request is invalid.
 */
export class BadRequestException extends RouteError {
	constructor(message: string) {
		super(HttpStatusCodes.BAD_REQUEST, message);
		Object.setPrototypeOf(this, BadRequestException.prototype);
	}
}

/**
 * Status code: 401
 * If user is not authenticated.
 */
export class UnauthorizedException extends RouteError {
	constructor(message: string) {
		super(HttpStatusCodes.UNAUTHORIZED, message);
		Object.setPrototypeOf(this, UnauthorizedException.prototype);
	}
}

/**
 * Status code: 403
 * If user is not allowed to perform an action.
 */
export class ForbiddenException extends RouteError {
	constructor(message: string) {
		super(HttpStatusCodes.FORBIDDEN, message);
		Object.setPrototypeOf(this, ForbiddenException.prototype);
	}
}

/**
 * Status code: 404
 * If resource is not found.
 */
export class NotFoundException extends RouteError {
	constructor(message: string) {
		super(HttpStatusCodes.NOT_FOUND, message);
		Object.setPrototypeOf(this, NotFoundException.prototype);
	}
}

/**
 * If route validation fails.
 */
export class ValidationException extends BadRequestException {
	public validationErrors: ValidationError[];

	public constructor(errors: ValidationError[]) {
		super("Validation failed");
		this.validationErrors = errors;
		Object.setPrototypeOf(this, ValidationException.prototype);
	}
}
