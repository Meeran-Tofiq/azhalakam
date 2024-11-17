import { Prisma, Product } from "@prisma/client";

export default class ProductApi {
	private productUrl: String;

	constructor(baseUrl: String) {
		this.productUrl = baseUrl + "/products";
	}

	async getAllProductsAtPage(page: number): Promise<{ products: Product[] }> {
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
	async getAllProductsAtPageOfStore(
		page: number,
		storeId: string
	): Promise<{ products: Product[] }> {
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

	async getProductFromId(productId: string): Promise<{ product: Product }> {
		if (!productId)
			throw new Error("No product provided for this request.");

		try {
			const response = await fetch(`${this.productUrl}/${productId}`);

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	async createProduct(
		product: Prisma.ProductCreateInput & { storeId: string }
	): Promise<{ productId: string }> {
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

	async updateProduct(
		productId: string,
		product: Partial<Omit<Product, "id" | "storeId">> & {
			reviewIds?: string[];
		}
	) {
		if (!productId)
			throw new Error("No product provided for this request.");

		try {
			const response = await fetch(
				`${this.productUrl}/${productId}/update`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(product),
				}
			);

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	async deleteProduct(productId: string) {
		if (!productId)
			throw new Error("No product provided for this request.");

		try {
			const response = await fetch(
				`${this.productUrl}/${productId}/delete`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}
}
