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

const JWT_SECRET = EnvVars.Jwt.Secret;

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

	// **** Private Methods **** //
	private async generateToken(userId: string): Promise<string> {
		return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
	}

	private verifyToken(token: string): CustomJwtPayload {
		try {
			return jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
		} catch (error) {
			throw new UnauthorizedException("Invalid token");
		}
	}
}
