import HttpStatusCodes from "@src/common/HttpStatusCodes";
import UserServiceFactory from "@src/services/UserService";

import prismaClient from "@src/common/PrismaClient";
import { NextFunction, Request, Response } from "express";
import { User } from "@prisma/client";
import {
	BadRequestException,
	UnauthorizedException,
} from "@src/common/classes";
import logger from "jet-logger";

// **** Variables **** //

const userService = UserServiceFactory.create(prismaClient);

// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: Request, res: Response, next: NextFunction) {
	let users: Partial<User>[];
	logger.info("Getting all users...");

	try {
		users = await userService.getAll();

		logger.info("Successfully retrieved all users.");
		res.status(HttpStatusCodes.OK).json({ users });
	} catch (error) {
		next(error);
	}
}

async function getOne(req: Request, res: Response, next: NextFunction) {
	logger.info("Getting specific user...");

	try {
		if (!req.decodedToken)
			throw new UnauthorizedException("Invalid or missing token");
		const user = await userService.getOne(req.decodedToken);

		logger.info("Successfully retrieved user.");
		res.status(HttpStatusCodes.OK).json({ user });
	} catch (error) {
		next(error);
	}
}

async function create(req: Request, res: Response, next: NextFunction) {
	logger.info("Creating user...");

	if (!req.body) {
		throw new BadRequestException("Missing body");
	}

	try {
		const token = await userService.create(req.body);

		logger.info("Successfully created user.");
		res.status(HttpStatusCodes.CREATED).json({ token });
	} catch (error) {
		next(error);
	}
}

async function update(req: Request, res: Response, next: NextFunction) {
	logger.info("Updating user...");

	try {
		if (!req.decodedToken)
			throw new UnauthorizedException("Invalid or missing token");
		const user = await userService.updateOne(req.body, req.decodedToken);

		logger.info("Successfully updated user.");
		res.status(HttpStatusCodes.OK).json({ user });
	} catch (error) {
		next(error);
	}
}

async function deleteOne(req: Request, res: Response, next: NextFunction) {
	logger.info("Deleting user...");

	try {
		if (!req.decodedToken)
			throw new UnauthorizedException("Invalid or missing token");
		await userService.deleteOne(req.decodedToken);

		logger.info("Successfully deleted user.");
		res.status(HttpStatusCodes.OK).json({});
	} catch (error) {
		next(error);
	}
}

// **** Export default **** //

export default {
	getAll,
	getOne,
	create,
	update,
	deleteOne,
} as const;
