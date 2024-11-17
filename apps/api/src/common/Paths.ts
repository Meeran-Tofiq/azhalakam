/**
 * Express router paths go here.
 */

export default {
	Base: "/api",
	Users: {
		Base: "/users",
		GetAll: "/all",
		Login: "/login",
		Create: "/create",
		Get: "/me",
		Update: "/me/update",
		Delete: "/me/delete",
	},
	Pets: {
		Base: "/pets",
		GetAll: "/all",
		Create: "/create",
		Get: "/:petId",
		Update: "/:petId/update",
		Delete: "/:petId/delete",
	},
	Stores: {
		PetStores: {
			Base: "/:storeId/petStores",
			Create: "/create",
			Get: "/:petStoreId",
			Update: "/:petStoreId/update",
			Delete: "/:petStoreId/delete",
		},
		VetStores: {
			Base: "/:storeId/vetStores",
			Create: "/create",
			Get: "/:vetStoreId",
			Update: "/:vetStoreId/update",
			Delete: "/:vetStoreId/delete",
		},
		Base: "/stores",
		GetAll: "/all",
		GetAllOfUser: "/user/:userId",
		Create: "/create",
		Get: "/:storeId",
		Update: "/:storeId/update",
		Delete: "/:storeId/delete",
	},
	Products: {
		Base: "/products",
		GetAll: "/all",
		Get: "/:productId",
		Create: "/create",
		Update: "/:productId/update",
		Delete: "/:productId/delete",
	},
} as const;
