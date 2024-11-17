import HttpStatusCodes from "@src/common/HttpStatusCodes";
import StoreServiceFactory from "@src/services/StoreService";

import prismaClient from "@src/common/PrismaClient";
import { NextFunction, Request, Response } from "express";
import { Store } from "@prisma/client";
import {
	BadRequestException,
	UnauthorizedException,
} from "@src/common/classes";
import logger from "jet-logger";
import {
	createStoreValidator,
	updateStoreValidator,
} from "@src/validators/storeValidator";
import { GetAllUserStoresResponse } from "@src/types/Store";

// **** Variables **** //

const storeService = StoreServiceFactory.create(prismaClient);

// **** Functions **** //

/**
 * Get all stores for a specific user
 * @param req
 * @param res
 * @param next
 */
async function getAllUserStores(
	req: Request,
	res: Response,
	next: NextFunction
) {
	let stores: GetAllUserStoresResponse;
	logger.info("Getting all stores...");

	try {
		if (!req.decodedToken) {
			throw new UnauthorizedException("Invalid or missing token");
		}

		stores = await storeService.getAllStoresOfUser({
			userId: req.decodedToken.userId,
		});

		logger.info("All stores retrieved successfully.");
		res.status(HttpStatusCodes.OK).json({ stores });
	} catch (error) {
		next(error);
	}
}

/**
 * Get one specific store from id
 * @param req
 * @param res
 * @param next
 */
async function getOne(req: Request, res: Response, next: NextFunction) {
	logger.info("Getting specific store...");

	try {
		const data = await storeService.getOne({ id: req.params.storeId });

		logger.info("Store retrieved successfully.");
		res.status(HttpStatusCodes.OK).json({ ...data });
	} catch (error) {
		next(error);
	}
}

/**
 * Create one store
 * @param req
 * @param res
 * @param next
 */
async function create(req: Request, res: Response, next: NextFunction) {
	logger.info("Creating store...");

	try {
		if (!req.decodedToken) {
			throw new UnauthorizedException("Invalid or missing token");
		}
		if (!req.body) {
			throw new BadRequestException("Missing body");
		}

		const { store, storeId } = await storeService.create({
			userId: req.decodedToken.userId,
			store: req.body,
		});

		logger.info("Store created successfully.");
		res.status(HttpStatusCodes.CREATED).json({ store, storeId });
	} catch (error) {
		next(error);
	}
}

/**
 * Update one store using id
 * @param req
 * @param res
 * @param next
 */
async function update(req: Request, res: Response, next: NextFunction) {
	logger.info("Updating store...");

	try {
		const data = await storeService.updateOne({
			id: req.params.storeId,
			updateData: req.body,
		});

		logger.info("Store updated successfully.");
		res.status(HttpStatusCodes.OK).json({
			message: "Store updated successfully.",
			...data,
		});
	} catch (error) {
		next(error);
	}
}

/**
 * Delete one store using id
 * @param req
 * @param res
 * @param next
 */
async function deleteOne(req: Request, res: Response, next: NextFunction) {
	logger.info("Deleting store...");

	try {
		const data = await storeService.deleteOne({ id: req.params.storeId });

		logger.info("Store deleted successfully.");
		res.status(HttpStatusCodes.OK).json({
			message: "Store deleted successfully.",
			...data,
		});
	} catch (error) {
		next(error);
	}
}

// **** Export default **** //

export default {
	getAllUserStores,
	getOne,
	create: [createStoreValidator, create],
	update: [updateStoreValidator, update],
	deleteOne,
} as const;
