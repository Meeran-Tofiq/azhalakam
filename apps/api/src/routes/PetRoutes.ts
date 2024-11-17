import HttpStatusCodes from "@src/common/HttpStatusCodes";
import PetServiceFactory from "@src/services/PetService";

import prismaClient from "@src/common/PrismaClient";
import { NextFunction, Request, Response } from "express";
import { Pet } from "@prisma/client";
import {
	BadRequestException,
	UnauthorizedException,
} from "@src/common/classes";
import logger from "jet-logger";
import {
	createPetValidator,
	updatePetValidator,
} from "@src/validators/petValidator";

// **** Variables **** //

const petService = PetServiceFactory.create(prismaClient);

// **** Functions **** //

/**
 * Get all pets for a specific user
 * @param req
 * @param res
 * @param next
 */
async function getAllUserPets(req: Request, res: Response, next: NextFunction) {
	logger.info("Getting all pets...");

	try {
		if (!req.decodedToken) {
			throw new UnauthorizedException("Invalid or missing token");
		}

		const data = await petService.getAllUserPets({
			userId: req.decodedToken.userId,
		});

		logger.info("All pets retrieved successfully.");
		res.status(HttpStatusCodes.OK).json({ ...data });
	} catch (error) {
		next(error);
	}
}

/**
 * Get one specific pet from id
 * @param req
 * @param res
 * @param next
 */
async function getOne(req: Request, res: Response, next: NextFunction) {
	logger.info("Getting specific pet...");

	try {
		const data = await petService.getOne({ id: req.params.petId });

		logger.info("Pet retrieved successfully.");
		res.status(HttpStatusCodes.OK).json({ ...data });
	} catch (error) {
		next(error);
	}
}

/**
 * Create one pet
 * @param req
 * @param res
 * @param next
 */
async function create(req: Request, res: Response, next: NextFunction) {
	logger.info("Creating pet...");

	try {
		if (!req.decodedToken) {
			throw new UnauthorizedException("Invalid or missing token");
		}
		if (!req.body) {
			throw new BadRequestException("Missing body");
		}

		const data = await petService.create({
			userId: req.decodedToken.userId,
			pet: req.body,
		});

		logger.info("Pet created successfully.");
		res.status(HttpStatusCodes.CREATED).json({ ...data });
	} catch (error) {
		next(error);
	}
}

/**
 * Update one pet using id
 * @param req
 * @param res
 * @param next
 */
async function update(req: Request, res: Response, next: NextFunction) {
	logger.info("Updating pet...");

	try {
		const data = await petService.updateOne({
			id: req.params.petId,
			updateData: req.body,
		});

		logger.info("Pet updated successfully.");
		res.status(HttpStatusCodes.OK).json({
			message: "Pet updated successfully.",
			...data,
		});
	} catch (error) {
		next(error);
	}
}

/**
 * Delete one pet using id
 * @param req
 * @param res
 * @param next
 */
async function deleteOne(req: Request, res: Response, next: NextFunction) {
	logger.info("Deleting pet...");

	try {
		const data = await petService.deleteOne({ id: req.params.petId });

		logger.info("Pet deleted successfully.");
		res.status(HttpStatusCodes.OK).json({
			message: "Pet deleted successfully.",
			...data,
		});
	} catch (error) {
		next(error);
	}
}

// **** Export default **** //

export default {
	getAllUserPets,
	getOne,
	create: [createPetValidator, create],
	update: [updatePetValidator, update],
	deleteOne,
} as const;
