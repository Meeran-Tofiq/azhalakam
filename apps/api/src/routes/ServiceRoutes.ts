import HttpStatusCodes from "@src/common/HttpStatusCodes";
import ServiceServiceFactory from "@src/services/ServiceService";

import prismaClient from "@src/common/PrismaClient";
import { NextFunction, Request, Response } from "express";
import logger from "jet-logger";
import {
	createServiceValidator,
	updateServiceValidator,
} from "@src/validators/serviceValidator";

// **** Variables **** //

const serviceService = ServiceServiceFactory.create(prismaClient);

// **** Functions **** //

/**
 * Get one specific service from id
 * @param req
 * @param res
 * @param next
 */
async function getOne(req: Request, res: Response, next: NextFunction) {
	logger.info("Getting specific service...");

	try {
		const data = await serviceService.getOne({
			id: req.params.serviceId,
		});

		logger.info("Service retrieved successfully.");
		res.status(HttpStatusCodes.OK).json({ ...data });
	} catch (error) {
		next(error);
	}
}

/**
 * Create one service
 * @param req
 * @param res
 * @param next
 */
async function create(req: Request, res: Response, next: NextFunction) {
	logger.info("Creating service...");

	try {
		const data = await serviceService.create({
			service: req.body,
		});

		logger.info("Service created successfully.");
		res.status(HttpStatusCodes.CREATED).json({ ...data });
	} catch (error) {
		next(error);
	}
}

/**
 * Update one service using id
 * @param req
 * @param res
 * @param next
 */
async function update(req: Request, res: Response, next: NextFunction) {
	logger.info("Updating service...");

	try {
		const data = await serviceService.updateOne({
			id: req.params.serviceId,
			updateData: req.body,
		});

		logger.info("Service updated successfully.");
		res.status(HttpStatusCodes.OK).json({
			message: "Service updated successfully.",
			...data,
		});
	} catch (error) {
		next(error);
	}
}

/**
 * Delete one service using id
 * @param req
 * @param res
 * @param next
 */
async function deleteOne(req: Request, res: Response, next: NextFunction) {
	logger.info("Deleting service...");

	try {
		const data = await serviceService.deleteOne({
			id: req.params.serviceId,
		});

		logger.info("Service deleted successfully.");
		res.status(HttpStatusCodes.OK).json({
			message: "Service deleted successfully.",
			...data,
		});
	} catch (error) {
		next(error);
	}
}

// **** Export default **** //

export default {
	getOne,
	create: [createServiceValidator, create],
	update: [updateServiceValidator, update],
	deleteOne,
} as const;
