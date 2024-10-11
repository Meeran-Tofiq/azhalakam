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

export class BadRequestException extends RouteError {
	constructor(message: string) {
		super(HttpStatusCodes.BAD_REQUEST, message);
	}
}

export class UnauthorizedException extends RouteError {
	constructor(message: string) {
		super(HttpStatusCodes.UNAUTHORIZED, message);
	}
}

export class ForbiddenException extends RouteError {
	constructor(message: string) {
		super(HttpStatusCodes.FORBIDDEN, message);
	}
}

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
