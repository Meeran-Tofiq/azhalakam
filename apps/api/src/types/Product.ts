import { Prisma, Product } from "@prisma/client";

export type ProductWithoutIncludes = Prisma.ProductGetPayload<{}>;
export type ProductWithIncludes = Prisma.ProductGetPayload<{
	include: {
		reviews: true;
		store: true;
	};
}>;

// Create a product types

export type CreateProductInputs = {
	product: Omit<
		Prisma.ProductCreateInput,
		"id" | "avgRating" | "store" | "reviews"
	> & { storeId: string };
};
export type CreateProductResponse = { product: ProductWithIncludes };

// Get product(s) types

export type GetProductInputs = {
	id: string;
};
export type GetProductResponse = { product: ProductWithIncludes };

export type GetAllProductsInputs = {
	page: number;
	storeId?: string;
};
export type GetAllProductsResponse = { products: ProductWithIncludes[] };

// Update product types

export type UpdateProductInputs = {
	id: string;
	updateData: Omit<
		Prisma.ProductUpdateInput,
		"id" | "store" | "reviews" | "avgRating"
	> & {
		reviewIds?: string[];
	};
};
export type UpdateProductResponse = { product: ProductWithIncludes };

// Delete product types

export type DeleteProductInputs = {
	id: string;
};
export type DeleteProductResponse = { product: ProductWithIncludes };
