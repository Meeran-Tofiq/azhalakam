import {
	BadRequestException,
	NotFoundException,
	UnauthorizedException,
} from "@src/common/classes";
import { Pet, Prisma, PrismaClient, User } from "@prisma/client";
import prismaClient from "@src/common/PrismaClient";
import jwt from "jsonwebtoken";
import EnvVars from "@src/common/EnvVars";
import bcrypt from "bcryptjs";
import CustomJwtPayload from "@src/types/TokenPayload";
import {
	CreateUserInputs,
	CreateUserResponse,
	DeleteUserInputs,
	DeleteUserResponse,
	GetAllUsersResponse,
	GetUserResponse,
	LoginUserInputs,
	LoginUserResponse,
	UpdateUserInputs,
	UpdateUserResponse,
	UserWithIncludes,
} from "@src/types/User";

// **** Variables **** //

export default class UserServiceFactory {
	public static create(customPrismaClient?: PrismaClient) {
		return new UserService(customPrismaClient || prismaClient);
	}
}

class UserService {
	private prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	// **** Public Methods **** //

	/**
	 * Create a new user with the given user data and return a JWT token for
	 * the user.
	 * @param user The user data to create a new user with.
	 * @throws {BadRequestException} If the user creation fails.
	 * @returns A JWT token for the new user.
	 */
	public async create(user: CreateUserInputs): Promise<CreateUserResponse> {
		try {
			const hashedPassword = await bcrypt.hash(user.password, 10);
			const createdUser = await this.prisma.user.create({
				data: {
					...user,
					password: hashedPassword,
				},
				include: {
					pets: true,
					serviceProvider: true,
					location: true,
					store: true,
				},
			});

			const token = await this.generateToken(createdUser.id);
			return { token, user: createdUser };
		} catch (error: any) {
			if (error instanceof Error) {
				throw new BadRequestException(error.message);
			}
			throw new BadRequestException("Unknown error occured");
		}
	}

	/**
	 * Get the user that the given JWT token belongs to.
	 * @param token The JWT token to verify and get the user for.
	 * @throws {UnauthorizedException} If the token is invalid.
	 * @throws {NotFoundException} If no user is found with the given token.
	 * @throws {BadRequestException} If the query fails.
	 * @returns The user that the token belongs to.
	 */
	public async getOne(token: CustomJwtPayload): Promise<GetUserResponse> {
		let user: Partial<User> | null;

		try {
			user = await this.prisma.user.findUnique({
				where: { id: token.userId },
				include: {
					pets: true,
					serviceProvider: true,
					location: true,
					store: true,
				},
			});
		} catch (error: any) {
			throw new BadRequestException("Failed to get user");
		}

		if (!user) throw new NotFoundException("User not found.");

		const { password, ...userWithoutPassword } = user;
		return userWithoutPassword as GetUserResponse;
	}

	/**
	 * Get all users.
	 * @throws {BadRequestException} If the query fails.
	 * @throws {NotFoundException} If no users are found.
	 * @returns An array of all users.
	 */
	public async getAll(): Promise<GetAllUsersResponse> {
		let users: Partial<User>[];

		try {
			users = await this.prisma.user.findMany({
				select: {
					id: true,
					username: true,
					bio: true,
					pets: true,
				},
			});
		} catch (error) {
			throw new BadRequestException("Failed to get users");
		}

		if (!users) throw new NotFoundException("Users not found.");

		return users as GetAllUsersResponse;
	}

	/**
	 * Login user
	 * @param username user username
	 * @param email user email
	 * @param password user password
	 * @returns token
	 * @throws {NotFoundException} if user not found
	 * @throws {UnauthorizedException} if invalid credentials
	 */
	public async login({
		username,
		email,
		password,
	}: LoginUserInputs): Promise<LoginUserResponse> {
		let user: UserWithIncludes | null;
		if (username) {
			user = await this.prisma.user.findUnique({
				where: { username },
				include: {
					pets: true,
					serviceProvider: true,
					location: true,
					store: true,
				},
			});
		} else {
			user = await this.prisma.user.findUnique({
				where: { email },
				include: {
					pets: true,
					serviceProvider: true,
					location: true,
					store: true,
				},
			});
		}

		if (!user) {
			throw new NotFoundException("User not found");
		}

		if (!(await bcrypt.compare(password, user.password))) {
			throw new UnauthorizedException("Invalid credentials");
		}

		const token = await this.generateToken(user.id);
		return { token, user };
	}

	/**
	 * Update one user
	 * @param user user data
	 * @param token authentication token
	 * @returns void
	 * @throws {NotFoundException} if user not found
	 * @throws {UnauthorizedException} if invalid token
	 * @throws {BadRequestException} if update fails
	 */
	public async updateOne({
		updateData,
		token,
	}: UpdateUserInputs): Promise<UpdateUserResponse> {
		const { locationId, ...data } = updateData;

		const existingUser = await this.prisma.user.findUnique({
			where: { id: token.userId },
		});
		if (!existingUser) throw new NotFoundException("User not found");

		if (updateData.password) {
			const hashedPassword = await bcrypt.hash(updateData.password, 10);
			updateData.password = hashedPassword;
		}

		let locationConnection;
		if (locationId) {
			locationConnection = this.getLocationConnection(locationId);
		}

		let userUpdateData: Prisma.UserUpdateInput = {
			...data,
			...locationConnection,
		};

		try {
			const user = await this.prisma.user.update({
				where: { id: token.userId },
				data: userUpdateData,
				include: {
					pets: true,
					serviceProvider: true,
					location: true,
					store: true,
				},
			});

			return user;
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to update user"
			);
		}
	}

	/**
	 * Delete one user
	 * @param token authentication token
	 * @returns void
	 * @throws {NotFoundException} if user not found
	 * @throws {UnauthorizedException} if invalid token
	 * @throws {BadRequestException} if delete fails
	 */
	public async deleteOne({
		token,
	}: DeleteUserInputs): Promise<DeleteUserResponse> {
		const existingUser = await this.prisma.user.findUnique({
			where: { id: token.userId },
		});
		if (!existingUser) throw new NotFoundException("User not found");

		let user: UserWithIncludes | null;
		try {
			user = await this.prisma.user.delete({
				where: { id: token.userId },
				include: {
					pets: true,
					serviceProvider: true,
					location: true,
					store: true,
				},
			});
		} catch (error: any) {
			throw new BadRequestException(
				error.message || "Failed to delete user"
			);
		}

		return user;
	}

	// **** Private Methods **** //
	private async generateToken(userId: string): Promise<string> {
		return jwt.sign({ userId }, EnvVars.Jwt.Secret, { expiresIn: "1h" });
	}

	private getLocationConnection(
		locationId: string
	): Prisma.LocationUpdateOneWithoutUserNestedInput {
		return {
			connect: {
				id: locationId,
			},
		};
	}
}
