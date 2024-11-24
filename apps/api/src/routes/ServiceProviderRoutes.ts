import HttpStatusCodes from "@src/common/HttpStatusCodes";
import ServiceProviderServiceFactory from "@src/services/ServiceProviderService";

import prismaClient from "@src/common/PrismaClient";
import { NextFunction, Request, Response } from "express";
import logger from "jet-logger";
import {
	createServiceProviderValidator,
	updateServiceProviderValidator,
} from "@src/validators/serviceProviderValidator";

// **** Variables **** //

const serviceProviderService = ServiceProviderServiceFactory.create(prismaClient);

// **** Functions **** //

/**
 * Get one specific serviceProvider from id
 * @param req
 * @param res
 * @param next
 */
async function getOne(req: Request, res: Response, next: NextFunction) {
	logger.info("Getting specific serviceProvider...");

	try {
		const data = await serviceProviderService.getOne({
			id: req.params.serviceProviderId,
		});

		logger.info("ServiceProvider retrieved successfully.");
		res.status(HttpStatusCodes.OK).json({ ...data });
	} catch (error) {
		next(error);
	}
}

/**
 * Create one serviceProvider
 * @param req
 * @param res
 * @param next
 */
async function create(req: Request, res: Response, next: NextFunction) {
	logger.info("Creating serviceProvider...");

	try {
		const data = await serviceProviderService.create({
			serviceProvider: req.body,
		});

		logger.info("ServiceProvider created successfully.");
		res.status(HttpStatusCodes.CREATED).json({ ...data });
	} catch (error) {
		next(error);
	}
}

/**
 * Update one serviceProvider using id
 * @param req
 * @param res
 * @param next
 */
async function update(req: Request, res: Response, next: NextFunction) {
	logger.info("Updating serviceProvider...");

	try {
		const data = await serviceProviderService.updateOne({
			id: req.params.serviceProviderId,
			updateData: req.body,
		});

		logger.info("ServiceProvider updated successfully.");
		res.status(HttpStatusCodes.OK).json({
			message: "ServiceProvider updated successfully.",
			...data,
		});
	} catch (error) {
		next(error);
	}
}

/**
 * Delete one serviceProvider using id
 * @param req
 * @param res
 * @param next
 */
async function deleteOne(req: Request, res: Response, next: NextFunction) {
	logger.info("Deleting serviceProvider...");

	try {
		const data = await serviceProviderService.deleteOne({
			id: req.params.serviceProviderId,
		});

		logger.info("ServiceProvider deleted successfully.");
		res.status(HttpStatusCodes.OK).json({
			message: "ServiceProvider deleted successfully.",
			...data,
		});
	} catch (error) {
		next(error);
	}
}

// **** Export default **** //

export default {
	getOne,
	create: [createServiceProviderValidator, create],
	update: [updateServiceProviderValidator, update],
	deleteOne,
} as const;
