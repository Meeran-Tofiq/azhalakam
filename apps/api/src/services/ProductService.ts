import { BadRequestException, NotFoundException } from "@src/common/classes";
import { Product, PrismaClient, Prisma, Review } from "@prisma/client";
import prismaClient from "@src/common/PrismaClient";
import {
	CreateProductInputs,
	CreateProductResponse,
	DeleteProductInputs,
	DeleteProductResponse,
	GetAllProductsInputs,
	GetAllProductsResponse,
	GetProductInputs,
	GetProductResponse,
	UpdateProductInputs,
	UpdateProductResponse,
} from "@src/types/Product";

// **** Variables **** //

export default class ProductServiceFactory {
	public static create(customPrismaClient?: PrismaClient) {
		return new ProductService(customPrismaClient || prismaClient);
	}
}

class ProductService {
	private prisma: PrismaClient;
	private productPageLimit: number = 15;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	// **** Public Methods **** //

	/**
	 * Retrieves all products in the given page, or of page 1 if page is not given
	 * @param page The page to retrieve, defaults to 1
	 * @param storeId The storeId to filter by, if given
	 * @throws {BadRequestException} If the query fails
	 * @returns An array of the products in the given page
	 */
	public async getAll({
		page,
		storeId,
		category,
	}: GetAllProductsInputs): Promise<GetAllProductsResponse> {
		if (page < 1) page = 1;

		try {
			console.log(category);
			const products = await this.prisma.product.findMany({
				where: { storeId, category },
				take: this.productPageLimit,
				skip: (page - 1) * this.productPageLimit,
				orderBy: {
					avgRating: "desc",
				},
				include: {
					store: true,
					reviews: true,
				},
			});

			const total = await this.prisma.product.count({
				where: { storeId, category },
			});
			const hasMore = page * this.productPageLimit < total;

			return { products, hasMore };
		} catch (error) {
			throw new BadRequestException("Failed to get products");
		}
	}

	/**
	 * Creates a new product
	 * @param product The data to create the product with
	 * @throws {BadRequestException} If the creation fails
	 * @returns The id of the created product
	 */
	public async create({
		product,
	}: CreateProductInputs): Promise<CreateProductResponse> {
		const { storeId, ...createData } = product;
		try {
			const storeExists = await this.prisma.store.findUnique({
				where: {
					id: storeId,
				},
			});

			if (!storeExists) {
				throw new BadRequestException("Store does not exist");
			}

			const createdProduct = await this.prisma.product.create({
				data: {
					...createData,
					store: {
						connect: {
							id: storeId,
						},
					},
				},
				include: {
					reviews: true,
					store: true,
				},
			});

			return { product: createdProduct };
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to create product"
			);
		}
	}

	/**
	 * Retrieves a product by id
	 * @param id The id of the product to retrieve
	 * @throws {BadRequestException} If the query fails
	 * @throws {NotFoundException} If no product is found with the given id
	 * @returns The found product
	 */
	public async getOne({ id }: GetProductInputs): Promise<GetProductResponse> {
		try {
			const product = await this.prisma.product.findUnique({
				where: { id },
				include: {
					reviews: true,
					store: true,
				},
			});

			if (!product) throw new NotFoundException("Product not found.");

			return { product };
		} catch (error: any) {
			throw new BadRequestException("Failed to get product");
		}
	}

	/**
	 * Updates a product with the given id with the given data
	 * @param id The id of the product to update
	 * @param updatedData The data to update the product with
	 * @throws {NotFoundException} If no product is found with the given id
	 * @throws {BadRequestException} If the update fails
	 * @returns void
	 */
	public async updateOne({
		id,
		updateData,
	}: UpdateProductInputs): Promise<UpdateProductResponse> {
		try {
			const existingProduct = await this.prisma.product.findUnique({
				where: { id },
				include: {
					reviews: true,
				},
			});

			if (!existingProduct)
				throw new NotFoundException("Product not found");

			const { reviewIds, ...productUpdateInfo } = updateData;

			const reviews = this.getReviewConnections(
				existingProduct?.reviews || [],
				reviewIds
			);

			const data: Prisma.ProductUpdateInput = {
				...productUpdateInfo,
				reviews,
			};

			const product = await this.prisma.product.update({
				where: { id },
				data,
				include: {
					reviews: true,
					store: true,
				},
			});

			return { product };
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to update product"
			);
		}
	}

	/**
	 * Deletes a product with the given id
	 * @param id The id of the product to delete
	 * @throws {NotFoundException} If no product is found with the given id
	 * @throws {BadRequestException} If the deletion fails
	 * @returns void
	 */
	public async deleteOne({
		id,
	}: DeleteProductInputs): Promise<DeleteProductResponse> {
		const existingProduct = await this.prisma.product.findUnique({
			where: { id },
		});
		if (!existingProduct) throw new NotFoundException("Product not found");

		try {
			const product = await this.prisma.product.delete({
				where: { id },
				include: {
					reviews: true,
					store: true,
				},
			});

			return { product };
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to delete product"
			);
		}
	}

	// **** Private Methods **** //

	private getReviewConnections(
		existingReviews: Review[],
		reviewIds?: string[]
	): Prisma.ReviewUpdateManyWithoutProductNestedInput | undefined {
		if (!reviewIds) return undefined;

		const connect = reviewIds
			.filter((id) => !existingReviews.find((review) => review.id === id))
			.map((id) => ({ id }));

		const disconnect = reviewIds
			.filter((id) => existingReviews.find((review) => review.id === id))
			.map((id) => ({ id }));

		return {
			connect,
			disconnect,
		};
	}
}
