import {
	BadRequestException,
	ForbiddenException,
	NotFoundException,
	UnauthorizedException,
} from "@src/common/classes";
import { PrismaClient, User } from "@prisma/client";
import prismaClient from "@src/common/PrismaClient";
import jwt from "jsonwebtoken";
import EnvVars from "@src/common/EnvVars";
import bcrypt from "bcryptjs";
import CustomJwtPayload from "@src/types/TokenPayload";

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
	public async create(user: User): Promise<string> {
		try {
			const hashedPassword = await bcrypt.hash(user.password, 10);
			const createdUser = await this.prisma.user.create({
				data: {
					...user,
					password: hashedPassword,
				},
			});

			const token = await this.generateToken(createdUser.id);
			return token;
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
	public async getOne(token: CustomJwtPayload): Promise<Partial<User>> {
		let user: Partial<User> | null;

		try {
			user = await this.prisma.user.findUnique({
				where: { id: token.userId },
				select: {
					id: true,
					username: true,
					email: true,
					bio: true,
					location: true,
					password: false,
					ServiceProvider: true,
					VetStore: true,
				},
			});
		} catch (error: any) {
			throw new BadRequestException("Failed to get user");
		}

		if (!user) throw new NotFoundException("User not found.");

		return user;
	}

	/**
	 * Get all users.
	 * @throws {BadRequestException} If the query fails.
	 * @throws {NotFoundException} If no users are found.
	 * @returns An array of all users.
	 */
	public async getAll(): Promise<Partial<User>[]> {
		let users: Partial<User>[];

		try {
			users = await this.prisma.user.findMany({
				select: {
					id: true,
					username: true,
					bio: true,
					email: false,
					location: false,
					password: false,
				},
			});
		} catch (error) {
			throw new BadRequestException("Failed to get users");
		}

		if (!users) throw new NotFoundException("Users not found.");

		return users;
	}

	/**
	 * Login user
	 * @param email user email
	 * @param password user password
	 * @returns token
	 * @throws {NotFoundException} if user not found
	 * @throws {UnauthorizedException} if invalid credentials
	 */
	public async login(email: string, password: string): Promise<string> {
		const user = await this.prisma.user.findUnique({ where: { email } });

		if (!user) {
			throw new NotFoundException("User not found");
		}

		if (!(await bcrypt.compare(password, user.password))) {
			throw new UnauthorizedException("Invalid credentials");
		}

		const token = await this.generateToken(user.id);
		return token;
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
	public async updateOne(
		updatedData: Partial<User>,
		token: CustomJwtPayload
	): Promise<void> {
		const existingUser = await this.prisma.user.findUnique({
			where: { id: token.userId },
		});
		if (!existingUser) throw new NotFoundException("User not found");

		try {
			await this.prisma.user.update({
				where: { id: token.userId },
				data: { ...updatedData },
			});
		} catch (error: any) {
			throw new BadRequestException(error.message || "Failed to update user");
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
	public async deleteOne(token: CustomJwtPayload): Promise<void> {
		const existingUser = await this.prisma.user.findUnique({
			where: { id: token.userId },
		});
		if (!existingUser) throw new NotFoundException("User not found");

		try {
			await this.prisma.user.delete({
				where: { id: token.userId },
			});
		} catch (error: any) {
			throw new BadRequestException(error.message || "Failed to delete user");
		}
	}

	// **** Private Methods **** //
	private async generateToken(userId: string): Promise<string> {
		return jwt.sign({ userId }, EnvVars.Jwt.Secret, { expiresIn: "1h" });
	}
}
