import HttpStatusCodes from "@src/common/HttpStatusCodes";
import UserServiceFactory from "@src/services/UserService";

import prismaClient from "@src/common/PrismaClient";
import { NextFunction, Request, Response } from "express";
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
import { GetAllUsersResponse } from "@src/types/User";

// **** Variables **** //

const userService = UserServiceFactory.create(prismaClient);

// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: Request, res: Response, next: NextFunction) {
	let users: GetAllUsersResponse;
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

		const { token, user } = await userService.create(req.body);

		logger.info("User created successfully.");
		res.status(HttpStatusCodes.CREATED).json({ token, user });
	} catch (error) {
		next(error);
	}
}

async function update(req: Request, res: Response, next: NextFunction) {
	logger.info("Updating user...");

	try {
		if (!req.decodedToken)
			throw new UnauthorizedException("Invalid or missing token");
		const user = await userService.updateOne({
			updateData: req.body,
			token: req.decodedToken,
		});

		logger.info("User updated successfully.");
		res.status(HttpStatusCodes.OK).json({
			user,
			message: "User updated successfully.",
		});
	} catch (error) {
		next(error);
	}
}

async function deleteOne(req: Request, res: Response, next: NextFunction) {
	logger.info("Deleting user...");

	try {
		if (!req.decodedToken)
			throw new UnauthorizedException("Invalid or missing token");
		const user = await userService.deleteOne({ token: req.decodedToken });

		logger.info("User deleted successfully.");
		res.status(HttpStatusCodes.OK).json({
			message: "User deleted successfully.",
			user,
		});
	} catch (error) {
		next(error);
	}
}

async function login(req: Request, res: Response, next: NextFunction) {
	logger.info("Logging in...");

	try {
		const { token, user } = await userService.login({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
		});
		res.status(HttpStatusCodes.OK).json({ token, user });
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
