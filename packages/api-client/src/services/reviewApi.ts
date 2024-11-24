import {
	CreateReviewInputs,
	CreateReviewResponse,
	DeleteReviewInputs,
	DeleteReviewResponse,
	GetReviewInputs,
	GetReviewResponse,
	UpdateReviewInputs,
	UpdateReviewResponse,
} from "@api-types/Review";
import userToken from "../utils/userToken";

export default class ReviewApi {
	private reviewUrl: String;

	constructor(baseUrl: String) {
		this.reviewUrl = baseUrl + "/reviews";
	}

	/**
	 * Asynchronously fetches a review with the given id.
	 * @param id The id of the review to retrieve
	 * @throws {Error} If no review is provided, if the request fails, or if the response is not ok.
	 * @returns A Promise that resolves with the JSON data of the review.
	 */
	async getReviewFromId({ id }: GetReviewInputs): Promise<GetReviewResponse> {
		if (!id) throw new Error("No review provided for this request.");

		try {
			const response = await fetch(`${this.reviewUrl}/${id}`);

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	async createReview({
		review,
	}: Omit<CreateReviewInputs, "userId">): Promise<CreateReviewResponse> {
		if (!userToken.getToken())
			throw new Error("No token provided for this request.");

		try {
			const response = await fetch(`${this.reviewUrl}/create`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userToken.getToken()}`,
				},
				body: JSON.stringify(review),
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Asynchronously updates a review with the given id with the given data.
	 * @param id The id of the review to update
	 * @param updateData The data to update the review with
	 * @throws {Error} If no review is provided, if the request fails, or if the response is not ok.
	 * @returns A Promise that resolves with the JSON data of the updated review.
	 */
	async updateReview({
		id,
		updateData,
	}: UpdateReviewInputs): Promise<UpdateReviewResponse> {
		if (!id) throw new Error("No review provided for this request.");

		try {
			const response = await fetch(`${this.reviewUrl}/${id}/update`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updateData),
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Asynchronously deletes a review with the given id.
	 * @param id The id of the review to delete
	 * @throws {Error} If no review is provided, if the request fails, or if the response is not ok.
	 * @returns A Promise that resolves with the JSON data of the deleted review.
	 */
	async deleteReview({
		id,
	}: DeleteReviewInputs): Promise<DeleteReviewResponse> {
		if (!id) throw new Error("No review provided for this request.");

		try {
			const response = await fetch(`${this.reviewUrl}/${id}/delete`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}
}
