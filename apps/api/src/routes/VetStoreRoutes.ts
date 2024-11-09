import HttpStatusCodes from "@src/common/HttpStatusCodes";
import VetStoreServiceFactory from "@src/services/VetStoreService";

import prismaClient from "@src/common/PrismaClient";
import { NextFunction, Request, Response } from "express";
import { VetStore } from "@prisma/client";
import {
	BadRequestException,
	UnauthorizedException,
} from "@src/common/classes";
import logger from "jet-logger";
import {
	createVetStoreValidator,
	updateVetStoreValidator,
} from "@src/validators/vetStoreValidator";

// **** Variables **** //

const vetStoreService = VetStoreServiceFactory.create(prismaClient);

// **** Functions **** //

/**
 * Get one specific vet store from id
 * @param req
 * @param res
 * @param next
 */
async function getOne(req: Request, res: Response, next: NextFunction) {
	logger.info("Getting specific vet store...");

	try {
		const vetStore = await vetStoreService.getOne(req.params.vetStoreId);

		logger.info("Vet store retrieved successfully.");
		res.status(HttpStatusCodes.OK).json({ vetStore });
	} catch (error) {
		next(error);
	}
}

/**
 * Create one vet store
 * @param req
 * @param res
 * @param next
 */
async function create(req: Request, res: Response, next: NextFunction) {
	logger.info("Creating vet store...");

	try {
		const vetStoreId = await vetStoreService.create(
			req.params.storeId,
			req.body
		);

		logger.info("Vet store created successfully.");
		res.status(HttpStatusCodes.CREATED).json({ vetStoreId });
	} catch (error) {
		next(error);
	}
}

/**
 * Update one vet store using id
 * @param req
 * @param res
 * @param next
 */
async function update(req: Request, res: Response, next: NextFunction) {
	logger.info("Updating vetStore...");

	try {
		await vetStoreService.updateOne(req.params.vetStoreId, req.body);

		logger.info("Vet store updated successfully.");
		res.status(HttpStatusCodes.OK).json("VetStore updated successfully.");
	} catch (error) {
		next(error);
	}
}

/**
 * Delete one vet store using id
 * @param req
 * @param res
 * @param next
 */
async function deleteOne(req: Request, res: Response, next: NextFunction) {
	logger.info("Deleting vet store...");

	try {
		await vetStoreService.deleteOne(req.params.vetStoreId);

		logger.info("Vet store deleted successfully.");
		res.status(HttpStatusCodes.OK).json("Vet store deleted successfully.");
	} catch (error) {
		next(error);
	}
}

// **** Export default **** //

export default {
	getOne,
	create: [createVetStoreValidator, create],
	update: [updateVetStoreValidator, update],
	deleteOne,
} as const;
