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
		const products = await productService.getAll(
			Number(req.query.page),
			req.body.storeId ? String(req.body.storeId) : undefined
		);

		logger.info("Products retrieved successfully.");
		res.status(HttpStatusCodes.OK).json({ products });
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
		const product = await productService.getOne(req.params.productId);

		logger.info("Product retrieved successfully.");
		res.status(HttpStatusCodes.OK).json({ product });
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
		const productId = await productService.create(req.body);

		logger.info("Product created successfully.");
		res.status(HttpStatusCodes.CREATED).json({ productId });
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
		await productService.updateOne(req.params.productId, req.body);

		logger.info("Product updated successfully.");
		res.status(HttpStatusCodes.OK).json("Product updated successfully.");
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
		await productService.deleteOne(req.params.productId);

		logger.info("Product deleted successfully.");
		res.status(HttpStatusCodes.OK).json("Product deleted successfully.");
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
