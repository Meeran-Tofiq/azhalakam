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
		Base: "/stores",
		GetAll: "/all",
		Create: "/create",
		Get: "/:storeId",
		Update: "/:storeId/update",
		Delete: "/:storeId/delete",
	},
} as const;
