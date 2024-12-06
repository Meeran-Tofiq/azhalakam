import HttpStatusCodes from "@src/common/HttpStatusCodes";
import AppointmentServiceFactory from "@src/services/AppointmentService";

import prismaClient from "@src/common/PrismaClient";
import { NextFunction, Request, Response } from "express";
import { Appointment } from "@prisma/client";
import {
	BadRequestException,
	UnauthorizedException,
} from "@src/common/classes";
import logger from "jet-logger";
import {
	createAppointmentValidator,
	updateAppointmentValidator,
} from "@src/validators/appointmentValidator";

// **** Variables **** //

const appointmentService = AppointmentServiceFactory.create(prismaClient);

// **** Functions **** //

/**
 * Get all appointments for a specific user
 * @param req
 * @param res
 * @param next
 */
async function getAllUserAppointments(
	req: Request,
	res: Response,
	next: NextFunction
) {
	logger.info("Getting all appointments...");

	try {
		if (!req.decodedToken) {
			throw new UnauthorizedException("Invalid or missing token");
		}

		const data = await appointmentService.getAllUserAppointments({
			userId: req.decodedToken.userId,
		});

		logger.info("All appointments retrieved successfully.");
		res.status(HttpStatusCodes.OK).json({ ...data });
	} catch (error) {
		next(error);
	}
}

/**
 * Get one specific appointment from id
 * @param req
 * @param res
 * @param next
 */
async function getOne(req: Request, res: Response, next: NextFunction) {
	logger.info("Getting specific appointment...");

	try {
		const data = await appointmentService.getOne({
			id: req.params.appointmentId,
		});

		logger.info("Appointment retrieved successfully.");
		res.status(HttpStatusCodes.OK).json({ ...data });
	} catch (error) {
		next(error);
	}
}

/**
 * Create one appointment
 * @param req
 * @param res
 * @param next
 */
async function create(req: Request, res: Response, next: NextFunction) {
	logger.info("Creating appointment...");

	try {
		if (!req.decodedToken) {
			throw new UnauthorizedException("Invalid or missing token");
		}
		if (!req.body) {
			throw new BadRequestException("Missing body");
		}

		const data = await appointmentService.create({
			userId: req.decodedToken.userId,
			appointment: req.body,
		});

		logger.info("Appointment created successfully.");
		res.status(HttpStatusCodes.CREATED).json({ ...data });
	} catch (error) {
		next(error);
	}
}

/**
 * Update one appointment using id
 * @param req
 * @param res
 * @param next
 */
async function update(req: Request, res: Response, next: NextFunction) {
	logger.info("Updating appointment...");

	try {
		const data = await appointmentService.updateOne({
			id: req.params.appointmentId,
			updateData: req.body,
		});

		logger.info("Appointment updated successfully.");
		res.status(HttpStatusCodes.OK).json({
			message: "Appointment updated successfully.",
			...data,
		});
	} catch (error) {
		next(error);
	}
}

/**
 * Delete one appointment using id
 * @param req
 * @param res
 * @param next
 */
async function deleteOne(req: Request, res: Response, next: NextFunction) {
	logger.info("Deleting appointment...");

	try {
		const data = await appointmentService.deleteOne({
			id: req.params.appointmentId,
		});

		logger.info("Appointment deleted successfully.");
		res.status(HttpStatusCodes.OK).json({
			message: "Appointment deleted successfully.",
			...data,
		});
	} catch (error) {
		next(error);
	}
}

// **** Export default **** //

export default {
	getAllUserAppointments,
	getOne,
	create: [createAppointmentValidator, create],
	update: [updateAppointmentValidator, update],
	deleteOne,
} as const;
