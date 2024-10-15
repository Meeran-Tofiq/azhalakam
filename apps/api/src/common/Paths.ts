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
		Get: "/:id",
		Update: "/:id/update",
		Delete: "/:id/delete",
	},
} as const;
