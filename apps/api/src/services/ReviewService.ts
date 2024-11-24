import { BadRequestException, NotFoundException } from "@src/common/classes";
import { Review, PrismaClient, Prisma } from "@prisma/client";
import prismaClient from "@src/common/PrismaClient";
import {
	CreateReviewInputs,
	CreateReviewResponse,
	DeleteReviewInputs,
	DeleteReviewResponse,
	GetReviewInputs,
	GetReviewResponse,
	UpdateReviewInputs,
	UpdateReviewResponse,
} from "@src/types/Review";

// **** Variables **** //

export default class ReviewServiceFactory {
	public static create(customPrismaClient?: PrismaClient) {
		return new ReviewService(customPrismaClient || prismaClient);
	}
}

class ReviewService {
	private prisma: PrismaClient;
	private reviewPageLimit: number = 15;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	// **** Public Methods **** //

	/**
	 * Creates a new review
	 * @param review The data to create the review with
	 * @throws {BadRequestException} If the creation fails
	 * @returns The id of the created review
	 */
	public async create({
		review,
		userId,
	}: CreateReviewInputs): Promise<CreateReviewResponse> {
		try {
			const createdReview = await this.prisma.review.create({
				data: { ...review, user: { connect: { id: userId } } },
			});

			return { review: createdReview };
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to create review"
			);
		}
	}

	/**
	 * Retrieves a review by id
	 * @param id The id of the review to retrieve
	 * @throws {BadRequestException} If the query fails
	 * @throws {NotFoundException} If no review is found with the given id
	 * @returns The found review
	 */
	public async getOne({ id }: GetReviewInputs): Promise<GetReviewResponse> {
		try {
			const review = await this.prisma.review.findUnique({
				where: { id },
			});

			if (!review) throw new NotFoundException("Review not found.");

			return { review };
		} catch (error: any) {
			throw new BadRequestException("Failed to get review");
		}
	}

	/**
	 * Updates a review with the given id with the given data
	 * @param id The id of the review to update
	 * @param updatedData The data to update the review with
	 * @throws {NotFoundException} If no review is found with the given id
	 * @throws {BadRequestException} If the update fails
	 * @returns void
	 */
	public async updateOne({
		id,
		updateData,
	}: UpdateReviewInputs): Promise<UpdateReviewResponse> {
		try {
			const existingReview = await this.prisma.review.findUnique({
				where: { id },
			});

			if (!existingReview)
				throw new NotFoundException("Review not found");

			const review = await this.prisma.review.update({
				where: { id },
				data: updateData,
			});

			return { review };
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to update review"
			);
		}
	}

	/**
	 * Deletes a review with the given id
	 * @param id The id of the review to delete
	 * @throws {NotFoundException} If no review is found with the given id
	 * @throws {BadRequestException} If the deletion fails
	 * @returns void
	 */
	public async deleteOne({
		id,
	}: DeleteReviewInputs): Promise<DeleteReviewResponse> {
		const existingReview = await this.prisma.review.findUnique({
			where: { id },
		});
		if (!existingReview) throw new NotFoundException("Review not found");

		try {
			const review = await this.prisma.review.delete({
				where: { id },
			});

			return { review };
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to delete review"
			);
		}
	}
}
