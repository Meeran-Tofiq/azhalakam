import HttpStatusCodes from "@src/common/HttpStatusCodes";
import VetServiceFactory from "@src/services/VetService";

import prismaClient from "@src/common/PrismaClient";
import { NextFunction, Request, Response } from "express";
import logger from "jet-logger";
import {
	createVetValidator,
	updateVetValidator,
} from "@src/validators/vetValidator";

// **** Variables **** //

const vetService = VetServiceFactory.create(prismaClient);

// **** Functions **** //

/**
 * Get one specific vet from id
 * @param req
 * @param res
 * @param next
 */
async function getOne(req: Request, res: Response, next: NextFunction) {
	logger.info("Getting specific vet...");

	try {
		const data = await vetService.getOne({
			id: req.params.vetId,
		});

		logger.info("Vet retrieved successfully.");
		res.status(HttpStatusCodes.OK).json({ ...data });
	} catch (error) {
		next(error);
	}
}

/**
 * Create one vet
 * @param req
 * @param res
 * @param next
 */
async function create(req: Request, res: Response, next: NextFunction) {
	logger.info("Creating vet...");

	try {
		const data = await vetService.create({
			vet: req.body,
		});

		logger.info("Vet created successfully.");
		res.status(HttpStatusCodes.CREATED).json({ ...data });
	} catch (error) {
		next(error);
	}
}

/**
 * Update one vet using id
 * @param req
 * @param res
 * @param next
 */
async function update(req: Request, res: Response, next: NextFunction) {
	logger.info("Updating vet...");

	try {
		const data = await vetService.updateOne({
			id: req.params.vetId,
			updateData: req.body,
		});

		logger.info("Vet updated successfully.");
		res.status(HttpStatusCodes.OK).json({
			message: "Vet updated successfully.",
			...data,
		});
	} catch (error) {
		next(error);
	}
}

/**
 * Delete one vet using id
 * @param req
 * @param res
 * @param next
 */
async function deleteOne(req: Request, res: Response, next: NextFunction) {
	logger.info("Deleting vet...");

	try {
		const data = await vetService.deleteOne({
			id: req.params.vetId,
		});

		logger.info("Vet deleted successfully.");
		res.status(HttpStatusCodes.OK).json({
			message: "Vet deleted successfully.",
			...data,
		});
	} catch (error) {
		next(error);
	}
}

// **** Export default **** //

export default {
	getOne,
	create: [createVetValidator, create],
	update: [updateVetValidator, update],
	deleteOne,
} as const;
