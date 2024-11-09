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
import {
	createUserValidator,
	loginValidator,
	updateUserValidator,
} from "@src/validators/userValidator";

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

		logger.info("All users retrieved successfully.");
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

		logger.info("User retrieved successfully.");
		res.status(HttpStatusCodes.OK).json({ user });
	} catch (error) {
		next(error);
	}
}

async function create(req: Request, res: Response, next: NextFunction) {
	logger.info("Creating user...");

	try {
		if (!req.body) {
			throw new BadRequestException("Missing body");
		}

		const token = await userService.create(req.body);

		logger.info("User created successfully.");
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
		await userService.updateOne(req.body, req.decodedToken);

		logger.info("User updated successfully.");
		res.status(HttpStatusCodes.OK).json("User updated successfully.");
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

		logger.info("User deleted successfully.");
		res.status(HttpStatusCodes.OK).json("User deleted successfully.");
	} catch (error) {
		next(error);
	}
}

async function login(req: Request, res: Response, next: NextFunction) {
	logger.info("Logging in...");

	try {
		const token = await userService.login(
			req.body.username,
			req.body.email,
			req.body.password
		);
		res.status(HttpStatusCodes.OK).json({ token });
	} catch (error) {
		next(error);
	}
}

// **** Export default **** //

export default {
	getAll,
	getOne,
	create: [createUserValidator, create],
	login: [loginValidator, login],
	update: [updateUserValidator, update],
	deleteOne,
} as const;
