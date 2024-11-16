const validationRules = {
	username: {
		required: "Username is required",
		pattern: {
			value: /^[a-zA-Z0-9_-]*$/, // Only allows letters, numbers, underscores, and hyphens
			message:
				"Username can only contain letters, numbers, underscores, and hyphens",
		},
		minLength: {
			value: 3,
			message: "Username must be at least 3 characters",
		},
		maxLength: {
			value: 20,
			message: "Username must be less than 20 characters",
		},
		validate: (value: string) =>
			!value.includes("@") || "Username cannot contain @ symbol",
	},
	firstName: {
		required: "First name is required",
	},
	lastName: {
		required: "Last name is required",
	},
	email: {
		required: "Email is required",
		pattern: {
			value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
			message: "Invalid email address",
		},
	},
	phoneNumber: {
		required: "Phone number is required",
		pattern: {
			value: /^[0-9]{10}$/, // Example: Only numbers with 10 digits
			message: "Phone number must be 10 digits",
		},
	},
	password: {
		required: "Password is required",
		minLength: {
			value: 8,
			message: "Password must be at least 8 characters",
		},
	},
	retypePassword: {
		required: "Please retype the password",
		validate: (value: any, { password }: { password: string }) =>
			value === password || "Passwords do not match",
	},
	usernameOrEmail: {
		required: "Username or Email is required",
	},
};

export default validationRules;
