import HttpStatusCodes from "@src/common/HttpStatusCodes";
import ReviewServiceFactory from "@src/services/ReviewService";

import prismaClient from "@src/common/PrismaClient";
import { NextFunction, Request, Response } from "express";
import logger from "jet-logger";
import {
	createReviewValidator,
	updateReviewValidator,
} from "@src/validators/reviewValidator";
import { UnauthorizedException } from "@src/common/classes";

// **** Variables **** //

const reviewService = ReviewServiceFactory.create(prismaClient);

// **** Functions **** //

/**
 * Get one specific review from id
 * @param req
 * @param res
 * @param next
 */
async function getOne(req: Request, res: Response, next: NextFunction) {
	logger.info("Getting specific review...");

	try {
		const data = await reviewService.getOne({
			id: req.params.reviewId,
		});

		logger.info("Review retrieved successfully.");
		res.status(HttpStatusCodes.OK).json({ ...data });
	} catch (error) {
		next(error);
	}
}

async function getAllInPage(req: Request, res: Response, next: NextFunction) {
	logger.info("Getting all reviews...");

	try {
		const page = req.query.page ? Number(req.query.page) : 1;

		const productId = req.query.productId?.toString();
		const serviceProviderId = req.query.serviceProviderId?.toString();
		const storeId = req.query.storeId?.toString();
		console.log(storeId);

		const data = await reviewService.getAllInPage({
			page,
			productId,
			serviceProviderId,
			storeId,
		});

		logger.info("Reviews retrieved successfully.");
		res.status(HttpStatusCodes.OK).json({ ...data });
	} catch (error) {
		next(error);
	}
}

/**
 * Create one review
 * @param req
 * @param res
 * @param next
 */
async function create(req: Request, res: Response, next: NextFunction) {
	logger.info("Creating review...");

	try {
		if (!req.decodedToken) {
			throw new UnauthorizedException("Invalid or missing token");
		}

		const data = await reviewService.create({
			review: req.body,
			userId: req.decodedToken.userId,
		});

		logger.info("Review created successfully.");
		res.status(HttpStatusCodes.CREATED).json({ ...data });
	} catch (error) {
		next(error);
	}
}

/**
 * Update one review using id
 * @param req
 * @param res
 * @param next
 */
async function update(req: Request, res: Response, next: NextFunction) {
	logger.info("Updating review...");

	try {
		const data = await reviewService.updateOne({
			id: req.params.reviewId,
			updateData: req.body,
		});

		logger.info("Review updated successfully.");
		res.status(HttpStatusCodes.OK).json({
			message: "Review updated successfully.",
			...data,
		});
	} catch (error) {
		next(error);
	}
}

/**
 * Delete one review using id
 * @param req
 * @param res
 * @param next
 */
async function deleteOne(req: Request, res: Response, next: NextFunction) {
	logger.info("Deleting review...");

	try {
		const data = await reviewService.deleteOne({
			id: req.params.reviewId,
		});

		logger.info("Review deleted successfully.");
		res.status(HttpStatusCodes.OK).json({
			message: "Review deleted successfully.",
			...data,
		});
	} catch (error) {
		next(error);
	}
}

// **** Export default **** //

export default {
	getAllInPage,
	getOne,
	create: [createReviewValidator, create],
	update: [updateReviewValidator, update],
	deleteOne,
} as const;
