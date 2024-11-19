import { Prisma, ServiceProvider, User } from "@prisma/client";
import CustomJwtPayload from "./TokenPayload";

export type UserWithIncludes = Prisma.UserGetPayload<{
	include: {
		pets: true;
		serviceProvider: true;
		location: true;
		store: true;
	};
}>;
export type UserWithoutPassword = Omit<UserWithIncludes, "password">;
export type GetAllUsersUser = Pick<
	UserWithIncludes,
	"username" | "firstName" | "lastName" | "bio" | "pets"
>;

// Create a user types

export type CreateUserInputs = Omit<
	Prisma.UserCreateInput,
	"id" | "review" | "pets" | "serviceProvider" | "store" | "location"
>;

export type CreateUserResponse = { user: UserWithoutPassword; token: string };

// Login user types

export type LoginUserInputs = {
	username?: string;
	email?: string;
	password: string;
};

export type LoginUserResponse = {
	user: UserWithoutPassword;
	token: string;
};

// Get a user(s) types

export type GetUserResponse = UserWithIncludes;

export type GetAllUsersResponse = GetAllUsersUser[];

// Update a user types

export type UpdateUserInputs = {
	updateData: CreateUserInputs & {
		locationId?: string;
	};
	token: CustomJwtPayload;
};

export type UpdateUserResponse = UserWithoutPassword;

// Delete a user types

export type DeleteUserInputs = { token: CustomJwtPayload };

export type DeleteUserResponse = UserWithoutPassword;
