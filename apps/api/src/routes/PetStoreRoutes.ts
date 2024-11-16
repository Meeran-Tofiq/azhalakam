import HttpStatusCodes from "@src/common/HttpStatusCodes";
import PetStoreServiceFactory from "@src/services/PetStoreService";

import prismaClient from "@src/common/PrismaClient";
import { NextFunction, Request, Response } from "express";
import { PetStore } from "@prisma/client";
import {
	BadRequestException,
	UnauthorizedException,
} from "@src/common/classes";
import logger from "jet-logger";
import {
	createPetStoreValidator,
	updatePetStoreValidator,
} from "@src/validators/petStoreValidator";

// **** Variables **** //

const petStoreService = PetStoreServiceFactory.create(prismaClient);

// **** Functions **** //

/**
 * Get one specific petStore from id
 * @param req
 * @param res
 * @param next
 */
async function getOne(req: Request, res: Response, next: NextFunction) {
	logger.info("Getting specific pet store...");

	try {
		const petStore = await petStoreService.getOne(req.params.petStoreId);

		logger.info("Pet store retrieved successfully.");
		res.status(HttpStatusCodes.OK).json({ petStore });
	} catch (error) {
		next(error);
	}
}

/**
 * Create one petStore
 * @param req
 * @param res
 * @param next
 */
async function create(req: Request, res: Response, next: NextFunction) {
	logger.info("Creating pet store...");

	try {
		const petStoreId = await petStoreService.create(
			req.params.storeId,
			req.body
		);

		logger.info("Pet store created successfully.");
		res.status(HttpStatusCodes.CREATED).json({ petStoreId });
	} catch (error) {
		next(error);
	}
}

/**
 * Update one petStore using id
 * @param req
 * @param res
 * @param next
 */
async function update(req: Request, res: Response, next: NextFunction) {
	logger.info("Updating petStore...");

	try {
		await petStoreService.updateOne(req.params.petStoreId, req.body);

		logger.info("Pet store updated successfully.");
		res.status(HttpStatusCodes.OK).json("PetStore updated successfully.");
	} catch (error) {
		next(error);
	}
}

/**
 * Delete one petStore using id
 * @param req
 * @param res
 * @param next
 */
async function deleteOne(req: Request, res: Response, next: NextFunction) {
	logger.info("Deleting pet store...");

	try {
		await petStoreService.deleteOne(req.params.petStoreId);

		logger.info("Pet store deleted successfully.");
		res.status(HttpStatusCodes.OK).json("Pet store deleted successfully.");
	} catch (error) {
		next(error);
	}
}

// **** Export default **** //

export default {
	getOne,
	create: [createPetStoreValidator, create],
	update: [updatePetStoreValidator, update],
	deleteOne,
} as const;
