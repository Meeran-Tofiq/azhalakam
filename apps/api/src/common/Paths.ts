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
} as const;
