import { CreateReviewInputs, ReviewWithIncludes } from "@api-types/Review";
import { createdUsers } from "./users";
import apiClient from "../util/apiClientImport";
import { createdStores } from "./stores";

export let createdReviews: ReviewWithIncludes[] = [];

function initializeStoreIds() {
    if (createdStores.length === 0) {
        throw new Error("No stores created yet.");
    }
}

export default async function createReviews() {
	if (createdUsers.length === 0) {
		throw new Error("Reviews: No users created yet.");
	}

	console.info("Reviews: Creating...");

	try {
		let usersIndex = 0;
		for (const review of reviews) {
			apiClient.setUserToken(createdUsers[usersIndex++].token);
			const { review: createdReview } =
				await apiClient.reviewApi.createReview({
					review,
				});
			createdReviews.push(createdReview);
		}
	} catch (error) {
		console.error(error);
	}

	console.info("Reviews: created.");
}

const reviews: Omit<CreateReviewInputs, "userId">[] = [
	{
		review: {
			rating: 5,
			content: "This is a review",
		},
	},
	{
		review: {
			rating: Math.floor(Math.random() * 5 + 1),
			content: "This is a review",
		},
	},
	{
		review: {
			rating: Math.floor(Math.random() * 5 + 1),
			content: "This is a review",
		},
	},
	{
		review: {
			rating: Math.floor(Math.random() * 5 + 1),
			content: "This is a review",
		},
	},
	{
		review: {
			rating: Math.floor(Math.random() * 5 + 1),
			content: "This is a review",
		},
	},
	{
		review: {
			rating: Math.floor(Math.random() * 5 + 1),
			content: "This is a review",
		},
	},
	{
		review: {
			rating: Math.floor(Math.random() * 5 + 1),
			content: "This is a review",
		},
	},
	{
		review: {
			rating: Math.floor(Math.random() * 5 + 1),
			content: "This is a review",
		},
	},
	{
		review: {
			rating: Math.floor(Math.random() * 5 + 1),
			content: "This is a review",
		},
	},
	{
		review: {
			rating: Math.floor(Math.random() * 5 + 1),
			content: "This is a review",
		},
	},
	{
		review: {
			rating: Math.floor(Math.random() * 5 + 1),
			content: "This is a review",
		},
	},
	{
		review: {
			rating: Math.floor(Math.random() * 5 + 1),
			content: "This is a review",
		},
	},
	{
		review: {
			rating: Math.floor(Math.random() * 5 + 1),
			content: "This is a review",
		},
	},
	{
		review: {
			rating: Math.floor(Math.random() * 5 + 1),
			content: "This is a review",
		},
	},
	{
		review: {
			rating: Math.floor(Math.random() * 5 + 1),
			content: "This is a review",
		},
	},
	{
		review: {
			rating: Math.floor(Math.random() * 5 + 1),
			content: "This is a review",
		},
	},
	{
		review: {
			rating: Math.floor(Math.random() * 5 + 1),
			content: "This is a review",
		},
	},
	{
		review: {
			rating: Math.floor(Math.random() * 5 + 1),
			content: "This is a review",
		},
	},
	{
		review: {
			rating: Math.floor(Math.random() * 5 + 1),
			content: "This is a review",
		},
	},
	{
		review: {
			rating: Math.floor(Math.random() * 5 + 1),
			content: "This is a review",
		},
	},
	{
		review: {
			rating: Math.floor(Math.random() * 5 + 1),
			content: "This is a review",
		},
	},
	{
		review: {
			rating: Math.floor(Math.random() * 5 + 1),
			content: "This is a review",
		},
	},
	{
		review: {
			rating: Math.floor(Math.random() * 5 + 1),
			content: "This is a review",
		},
	},
	{
		review: {
			rating: Math.floor(Math.random() * 5 + 1),
			content: "This is a review",
		},
	},
	{
		review: {
			rating: Math.floor(Math.random() * 5 + 1),
			content: "This is a review",
		},
	},
	{
		review: {
			rating: Math.floor(Math.random() * 5 + 1),
			content: "This is a review",
		},
	},
	{
		review: {
			rating: Math.floor(Math.random() * 5 + 1),
			content: "This is a review",
		},
	},
];
