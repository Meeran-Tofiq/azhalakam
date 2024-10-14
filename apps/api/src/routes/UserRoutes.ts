import HttpStatusCodes from "@src/common/HttpStatusCodes";
import UserServiceFactory from "@src/services/UserService";

import prismaClient from "@src/common/PrismaClient";
import { NextFunction, Request, Response } from "express";
import { User } from "@prisma/client";
import { UnauthorizedException } from "@src/common/classes";

// **** Variables **** //

const userService = UserServiceFactory.create(prismaClient);

// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: Request, res: Response, next: NextFunction) {
	let users: Partial<User>[];
	try {
		users = await userService.getAll();
		res.status(HttpStatusCodes.OK).json({ users });
	} catch (error) {
		next(error);
	}
}

async function getOne(req: Request, res: Response, next: NextFunction) {
	try {
		if (!req.decodedToken) throw new UnauthorizedException("Invalid token");
		const user = await userService.getOne(req.decodedToken);
		res.status(HttpStatusCodes.OK).json({ user });
	} catch (error) {
		next(error);
	}
}

async function create(req: Request, res: Response, next: NextFunction) {
	try {
		const token = await userService.create(req.body);
		res.status(HttpStatusCodes.CREATED).json({ token });
	} catch (error) {
		next(error);
	}
}

async function update(req: Request, res: Response, next: NextFunction) {
	try {
		if (!req.decodedToken) throw new UnauthorizedException("Invalid token");
		const user = await userService.updateOne(req.body, req.decodedToken);
		res.status(HttpStatusCodes.OK).json({ user });
	} catch (error) {
		next(error);
	}
}

async function deleteOne(req: Request, res: Response, next: NextFunction) {
	try {
		if (!req.decodedToken) throw new UnauthorizedException("Invalid token");
		await userService.deleteOne(req.decodedToken);
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
