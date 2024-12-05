import { CreateProductInputs, ProductWithIncludes } from "@api-types/Product";
import { createdStores } from "./stores";
import apiClient from "../util/apiClientImport";

export let createdProducts: ProductWithIncludes[] = [];

function initializeStoreIds() {
	if (createdStores.length === 0) {
		throw new Error("No stores created yet.");
	}

	for (let i = 0; i < 7; i++) {
		products[i].product.storeId = createdStores[0].id;
	}

	for (let i = 7; i < createdStores.length; i++) {
		products[i].product.storeId = createdStores[i].id;
	}
}

export default async function createProducts() {
	if (createdStores.length === 0) {
		throw new Error("No stores created yet.");
	}

	console.info("Products: Initializing store ids...");
	initializeStoreIds();

	console.info("Products: Creating...");

	try {
		for (const product of products) {
			if (!product.product.storeId) break;
			const { product: createdProduct } =
				await apiClient.productsApi.createProduct(product);
			createdProducts.push(createdProduct);
		}

		console.info("Products: created.");
	} catch (error) {
		console.error(error);
	}
}

const products: CreateProductInputs[] = [
	{
		product: {
			name: "Pet Bed",
			description: "Soft and comfy",
			price: 15,
			storeId: "",
			category: "MISCELLANEOUS",
		},
	},
	{
		product: {
			name: "Fish Food",
			description: "For all your aquatic friends",
			price: 5,
			storeId: "",
			category: "FOOD",
		},
	},
	{
		product: {
			name: "Cat Toy",
			description: "Laser pointer",
			price: 10,
			storeId: "",
			category: "TOY",
		},
	},
	{
		product: {
			name: "Treats",
			description: "Yummy treats for all pets",
			price: 10,
			storeId: "",
			category: "FOOD",
		},
	},
	{
		product: {
			name: "Dog Leash",
			description: "For walks and playtime",
			price: 15,
			storeId: "",
			category: "MISCELLANEOUS",
		},
	},
	{
		product: {
			name: "Cat Grooming Kit",
			description: "Keep your cat looking and feeling great",
			price: 20,
			storeId: "",
			category: "MISCELLANEOUS",
		},
	},
	{
		product: {
			name: "Bird Cage",
			description: "For all your feathered friends",
			price: 25,
			storeId: "",
			category: "MISCELLANEOUS",
		},
	},
	{
		product: {
			name: "Reptile Food",
			description: "For all your scaly friends",
			price: 10,
			storeId: "",
			category: "FOOD",
		},
	},
	{
		product: {
			name: "Hamster Wheel",
			description: "For all your tiny friends",
			price: 20,
			storeId: "",
			category: "TOY",
		},
	},
	{
		product: {
			name: "Guinea Pig Bed",
			description: "Soft and comfy",
			price: 20,
			storeId: "",
			category: "MISCELLANEOUS",
		},
	},
	{
		product: {
			name: "Fish Tank",
			description: "For all your aquatic friends",
			price: 25,
			storeId: "",
			category: "MISCELLANEOUS",
		},
	},
	{
		product: {
			name: "Cat Litter",
			description: "For all your feline friends",
			price: 15,
			storeId: "",
			category: "MISCELLANEOUS",
		},
	},
	{
		product: {
			name: "Dog Food",
			description: "For all your canine friends",
			price: 25,
			storeId: "",
			category: "FOOD",
		},
	},
	{
		product: {
			name: "Cat Toy",
			description: "For all your feline friends",
			price: 10,
			storeId: "",
			category: "TOY",
		},
	},
	{
		product: {
			name: "Dog Toy",
			description: "For all your canine friends",
			price: 15,
			storeId: "",
			category: "TOY",
		},
	},
	{
		product: {
			name: "Cat Tree",
			description: "For all your feline friends",
			price: 50,
			storeId: "",
			category: "MISCELLANEOUS",
		},
	},
	{
		product: {
			name: "Dog Grooming Kit",
			description: "For all your canine friends",
			price: 35,
			storeId: "",
			category: "MISCELLANEOUS",
		},
	},
	{
		product: {
			name: "Fish Food",
			description: "For all your aquatic friends",
			price: 10,
			storeId: "",
			category: "FOOD",
		},
	},
	{
		product: {
			name: "Bird Cage",
			description: "For all your avian friends",
			price: 75,
			storeId: "",
			category: "MISCELLANEOUS",
		},
	},
	{
		product: {
			name: "Cat Food",
			description: "For all your feline friends",
			price: 20,
			storeId: "",
			category: "FOOD",
		},
	},
	{
		product: {
			name: "Dog Bed",
			description: "For all your canine friends",
			price: 30,
			storeId: "",
			category: "MISCELLANEOUS",
		},
	},
	{
		product: {
			name: "Hamster Cage",
			description: "For all your small friends",
			price: 40,
			storeId: "",
			category: "MISCELLANEOUS",
		},
	},
	{
		product: {
			name: "Bird Toy",
			description: "For all your avian friends",
			price: 15,
			storeId: "",
			category: "TOY",
		},
	},
	{
		product: {
			name: "Cat Scratcher",
			description: "For all your feline friends",
			price: 25,
			storeId: "",
			category: "MISCELLANEOUS",
		},
	},
	{
		product: {
			name: "Dog Leash",
			description: "For all your canine friends",
			price: 10,
			storeId: "",
			category: "MISCELLANEOUS",
		},
	},
	{
		product: {
			name: "Fish Tank Decorations",
			description: "For all your aquatic friends",
			price: 20,
			storeId: "",
			category: "MISCELLANEOUS",
		},
	},
	{
		product: {
			name: "Bird Bath",
			description: "For all your avian friends",
			price: 25,
			storeId: "",
			category: "MISCELLANEOUS",
		},
	},
	{
		product: {
			name: "Cat Litter Box",
			description: "For all your feline friends",
			price: 40,
			storeId: "",
			category: "MISCELLANEOUS",
		},
	},
	{
		product: {
			name: "Dog Brush",
			description: "For all your canine friends",
			price: 15,
			storeId: "",
			category: "MISCELLANEOUS",
		},
	},
	{
		product: {
			name: "Hamster Food",
			description: "For all your small friends",
			price: 10,
			storeId: "",
			category: "FOOD",
		},
	},
	{
		product: {
			name: "Catnip",
			description: "For all your feline friends",
			price: 5,
			storeId: "",
			category: "TOY",
		},
	},
	{
		product: {
			name: "Dog Treats",
			description: "For all your canine friends",
			price: 10,
			storeId: "",
			category: "FOOD",
		},
	},
	{
		product: {
			name: "Bird Food",
			description: "For all your avian friends",
			price: 25,
			storeId: "",
			category: "FOOD",
		},
	},
	{
		product: {
			name: "Cat Carrier",
			description: "For all your feline friends",
			price: 30,
			storeId: "",
			category: "MISCELLANEOUS",
		},
	},
	{
		product: {
			name: "Dog Toys",
			description: "For all your canine friends",
			price: 20,
			storeId: "",
			category: "TOY",
		},
	},
];
