/**
 * Express router paths go here.
 */

export default {
	Base: "/api",
	Users: {
		Base: "/users",
		GetAll: "/all",
		Get: "/:id",
		Create: "/create",
		Update: "/:id/update",
		Delete: "/:id/delete",
	},
} as const;
