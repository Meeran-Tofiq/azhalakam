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

	// **** Private Methods **** //
}
