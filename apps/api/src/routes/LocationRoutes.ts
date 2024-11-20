import HttpStatusCodes from "@src/common/HttpStatusCodes";
import LocationServiceFactory from "@src/services/LocationService";

import prismaClient from "@src/common/PrismaClient";
import { NextFunction, Request, Response } from "express";
import logger from "jet-logger";
import {
	createLocationValidator,
	updateLocationValidator,
} from "@src/validators/locationValidator";

// **** Variables **** //

const locationService = LocationServiceFactory.create(prismaClient);

// **** Functions **** //

/**
 * Get one specific location from id
 * @param req
 * @param res
 * @param next
 */
async function getOne(req: Request, res: Response, next: NextFunction) {
	logger.info("Getting specific location...");

	try {
		const data = await locationService.getOne({
			id: req.params.locationId,
		});

		logger.info("Location retrieved successfully.");
		res.status(HttpStatusCodes.OK).json({ ...data });
	} catch (error) {
		next(error);
	}
}

/**
 * Create one location
 * @param req
 * @param res
 * @param next
 */
async function create(req: Request, res: Response, next: NextFunction) {
	logger.info("Creating location...");

	try {
		const data = await locationService.create({
			location: req.body,
		});

		logger.info("Location created successfully.");
		res.status(HttpStatusCodes.CREATED).json({ ...data });
	} catch (error) {
		next(error);
	}
}

/**
 * Update one location using id
 * @param req
 * @param res
 * @param next
 */
async function update(req: Request, res: Response, next: NextFunction) {
	logger.info("Updating location...");

	try {
		const data = await locationService.updateOne({
			id: req.params.locationId,
			updateData: req.body,
		});

		logger.info("Location updated successfully.");
		res.status(HttpStatusCodes.OK).json({
			message: "Location updated successfully.",
			...data,
		});
	} catch (error) {
		next(error);
	}
}

/**
 * Delete one location using id
 * @param req
 * @param res
 * @param next
 */
async function deleteOne(req: Request, res: Response, next: NextFunction) {
	logger.info("Deleting location...");

	try {
		const data = await locationService.deleteOne({
			id: req.params.locationId,
		});

		logger.info("Location deleted successfully.");
		res.status(HttpStatusCodes.OK).json({
			message: "Location deleted successfully.",
			...data,
		});
	} catch (error) {
		next(error);
	}
}

// **** Export default **** //

export default {
	getOne,
	create: [createLocationValidator, create],
	update: [updateLocationValidator, update],
	deleteOne,
} as const;
