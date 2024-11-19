import { Prisma, Product } from "@prisma/client";
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
} from "@api-types/Product";

export default class ProductApi {
	private productUrl: String;

	constructor(baseUrl: String) {
		this.productUrl = baseUrl + "/products";
	}

	async getAllProductsAtPage({
		page,
	}: Omit<GetAllProductsInputs, "storeId">): Promise<GetAllProductsResponse> {
		try {
			const response = await fetch(`${this.productUrl}/all?page=${page}`);

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Asynchronously fetches all products at a given page associated with a given store.
	 * Requires the id of the store to be provided for the request.
	 * @param page The page of products to fetch.
	 * @param storeId The id of the store to get products from.
	 * @throws {Error} If no store id is provided, if the request fails, or if the response is not ok.
	 * @returns A Promise that resolves with the JSON data of all products at the given page.
	 */
	async getAllProductsAtPageOfStore({
		page,
		storeId,
	}: GetAllProductsInputs): Promise<GetAllProductsResponse> {
		try {
			const response = await fetch(`${this.productUrl}/page/${page}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ storeId }),
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
	 * Asynchronously fetches a product with the given id.
	 * @param id The id of the product to retrieve
	 * @throws {Error} If no product is provided, if the request fails, or if the response is not ok.
	 * @returns A Promise that resolves with the JSON data of the product.
	 */
	async getProductFromId({
		id,
	}: GetProductInputs): Promise<GetProductResponse> {
		if (!id) throw new Error("No product provided for this request.");

		try {
			const response = await fetch(`${this.productUrl}/${id}`);

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	async createProduct({
		product,
	}: CreateProductInputs): Promise<CreateProductResponse> {
		try {
			const response = await fetch(`${this.productUrl}/create`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(product),
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	async updateProduct({
		id,
		updateData,
	}: UpdateProductInputs): Promise<UpdateProductResponse> {
		if (!id) throw new Error("No product provided for this request.");

		try {
			const response = await fetch(`${this.productUrl}/${id}/update`, {
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

	async deleteProduct({
		id,
	}: DeleteProductInputs): Promise<DeleteProductResponse> {
		if (!id) throw new Error("No product provided for this request.");

		try {
			const response = await fetch(`${this.productUrl}/${id}/delete`, {
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
