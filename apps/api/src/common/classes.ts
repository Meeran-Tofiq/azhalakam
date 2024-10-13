import HttpStatusCodes from "@src/common/HttpStatusCodes";

/**
 * Error with status code and message.
 */
export class RouteError extends Error {
	public status: HttpStatusCodes;

	public constructor(status: HttpStatusCodes, message: string) {
		super(message);
		this.status = status;
	}
}

/**
 * Status code: 400
 * If request is invalid.
 */
export class BadRequestException extends RouteError {
	constructor(message: string) {
		super(HttpStatusCodes.BAD_REQUEST, message);
	}
}

/**
 * Status code: 401
 * If user is not authenticated.
 */
export class UnauthorizedException extends RouteError {
	constructor(message: string) {
		super(HttpStatusCodes.UNAUTHORIZED, message);
	}
}

/**
 * Status code: 403
 * If user is not allowed to perform an action.
 */
export class ForbiddenException extends RouteError {
	constructor(message: string) {
		super(HttpStatusCodes.FORBIDDEN, message);
	}
}

/**
 * Status code: 404
 * If resource is not found.
 */
export class NotFoundException extends RouteError {
	constructor(message: string) {
		super(HttpStatusCodes.NOT_FOUND, message);
	}
}

/**
 * If route validation fails.
 */
export class ValidationErr extends RouteError {
	public static MSG = 'The follow parameter were missing or invalid "';

	public constructor(paramName: string) {
		super(HttpStatusCodes.BAD_REQUEST, ValidationErr.GetMsg(paramName));
	}

	public static GetMsg(param: string) {
		return ValidationErr.MSG + param + '".';
	}
}
