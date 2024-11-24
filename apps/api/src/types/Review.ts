import { Prisma, Review } from "@prisma/client";

export type ReviewWithoutIncludes = Prisma.ReviewGetPayload<{}>;
export type ReviewWithIncludes = Prisma.ReviewGetPayload<{
	include: {};
}>;

// Create a review types

export type CreateReviewInputs = {
	review: Omit<
		Prisma.ReviewCreateInput,
		"id" | "store" | "user" | "product" | "serviceProvider"
	>;
	userId: string;
};
export type CreateReviewResponse = { review: ReviewWithIncludes };

// Get review(s) types

export type GetReviewInputs = {
	id: string;
};
export type GetReviewResponse = { review: ReviewWithIncludes };

export type GetAllReviewsInputs = {
	page: number;
	storeId?: string;
	productId?: string;
	serviceProviderId?: string;
};
export type GetAllReviewsResponse = { reviews: ReviewWithIncludes[] };

// Update review types

export type UpdateReviewInputs = {
	id: string;
	updateData: Omit<Prisma.ReviewUpdateInput, "id" | "store" | "user">;
};
export type UpdateReviewResponse = { review: ReviewWithIncludes };

// Delete review types

export type DeleteReviewInputs = {
	id: string;
};
export type DeleteReviewResponse = { review: ReviewWithIncludes };
