import HttpStatusCodes from "@src/common/HttpStatusCodes";
import ProductServiceFactory from "@src/services/ProductService";

import prismaClient from "@src/common/PrismaClient";
import { NextFunction, Request, Response } from "express";
import logger from "jet-logger";
import {
	createProductValidator,
	updateProductValidator,
} from "@src/validators/productValidator";

// **** Variables **** //

const productService = ProductServiceFactory.create(prismaClient);

// **** Functions **** //

async function getAll(req: Request, res: Response, next: NextFunction) {
	logger.info(`Getting all products in page ${req.params.page}...`);

	try {
		const data = await productService.getAll({
			page: Number(req.query.page),
			storeId: req.body.storeId ? String(req.body.storeId) : undefined,
		});

		logger.info("Products retrieved successfully.");
		res.status(HttpStatusCodes.OK).json({ ...data });
	} catch (error) {
		next(error);
	}
}

/**
 * Get one specific product from id
 * @param req
 * @param res
 * @param next
 */
async function getOne(req: Request, res: Response, next: NextFunction) {
	logger.info("Getting specific product...");

	try {
		const data = await productService.getOne({ id: req.params.productId });

		logger.info("Product retrieved successfully.");
		res.status(HttpStatusCodes.OK).json({ ...data });
	} catch (error) {
		next(error);
	}
}

/**
 * Create one product
 * @param req
 * @param res
 * @param next
 */
async function create(req: Request, res: Response, next: NextFunction) {
	logger.info("Creating product...");

	try {
		const data = await productService.create({
			product: req.body,
		});

		logger.info("Product created successfully.");
		res.status(HttpStatusCodes.CREATED).json({ ...data });
	} catch (error) {
		next(error);
	}
}

/**
 * Update one product using id
 * @param req
 * @param res
 * @param next
 */
async function update(req: Request, res: Response, next: NextFunction) {
	logger.info("Updating product...");

	try {
		const data = await productService.updateOne({
			id: req.params.productId,
			updateData: req.body,
		});

		logger.info("Product updated successfully.");
		res.status(HttpStatusCodes.OK).json({
			message: "Product updated successfully.",
			...data,
		});
	} catch (error) {
		next(error);
	}
}

/**
 * Delete one product using id
 * @param req
 * @param res
 * @param next
 */
async function deleteOne(req: Request, res: Response, next: NextFunction) {
	logger.info("Deleting product...");

	try {
		const data = await productService.deleteOne({
			id: req.params.productId,
		});

		logger.info("Product deleted successfully.");
		res.status(HttpStatusCodes.OK).json({
			message: "Product deleted successfully.",
			...data,
		});
	} catch (error) {
		next(error);
	}
}

// **** Export default **** //

export default {
	getAll,
	getOne,
	create: [createProductValidator, create],
	update: [updateProductValidator, update],
	deleteOne,
} as const;
