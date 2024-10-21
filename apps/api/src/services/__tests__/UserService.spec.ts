import UserServiceFactory from "@src/services/UserService";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
	BadRequestException,
	NotFoundException,
	UnauthorizedException,
} from "@src/common/classes";

// Mock dependencies
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

const prismaMock = {
	user: {
		create: jest.fn(),
		findUnique: jest.fn(),
		findMany: jest.fn(),
		update: jest.fn(),
		delete: jest.fn(),
	},
} as unknown as PrismaClient;

// Create instance of UserService using mock PrismaClient
const userService = UserServiceFactory.create(prismaMock);

describe("UserService Unit Tests", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	// **** CREATE USER **** //
	describe("create", () => {
		it("should create a user and return a token", async () => {
			const mockUser: Omit<User, "id"> = {
				username: "testuser",
				password: "password123",
				email: "test@test.com",
				bio: "Test bio",
				firstName: "Test",
				lastName: "Test",
				phoneNo: "123456789",
				locationId: "123",
				serviceProviderId: "123",
				storeId: "123",
			};

			// Mock bcrypt hash and jwt sign
			(bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");
			(prismaMock.user.create as jest.Mock).mockResolvedValue({ id: "123" });
			(jwt.sign as jest.Mock).mockReturnValue("token123");

			const result = await userService.create(mockUser);

			expect(bcrypt.hash).toHaveBeenCalledWith(mockUser.password, 10);
			expect(prismaMock.user.create).toHaveBeenCalledWith({
				data: {
					...mockUser,
					password: "hashedPassword",
				},
			});
			expect(result).toBe("token123");
		});

		it("should throw BadRequestException if creation fails", async () => {
			const mockUser: Omit<User, "id"> = {
				username: "testuser",
				password: "password123",
				email: "test@test.com",
				bio: "Test bio",
				firstName: "Test",
				lastName: "Test",
				phoneNo: "123456789",
				locationId: "123",
				serviceProviderId: "123",
				storeId: "123",
			};

			(bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");
			(prismaMock.user.create as jest.Mock).mockRejectedValue(
				new Error("Failed to create user")
			);

			await expect(userService.create(mockUser)).rejects.toThrow(
				BadRequestException
			);
		});
	});

	// **** LOGIN USER **** //
	describe("login", () => {
		it("should return a token for valid credentials if user logged in with username", async () => {
			const mockUser: Omit<
				User,
				"id" | "locationId" | "serviceProviderId" | "storeId"
			> = {
				username: "testuser",
				password: "hashedPassword",
				email: "test@test.com",
				bio: "Test bio",
				firstName: "Test",
				lastName: "Test",
				phoneNo: "123456789",
			};

			(prismaMock.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
			(bcrypt.compare as jest.Mock).mockResolvedValue(true);
			(jwt.sign as jest.Mock).mockReturnValue("token123");

			const result = await userService.login("testuser", "", "password123");

			expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
				where: { username: "testuser" },
			});
			expect(bcrypt.compare).toHaveBeenCalledWith(
				"password123",
				"hashedPassword"
			);
			expect(result).toBe("token123");
		});

		it("should return a token for valid credentials if user logged in with email", async () => {
			const mockUser: Omit<
				User,
				"id" | "locationId" | "serviceProviderId" | "storeId"
			> = {
				username: "testuser",
				password: "hashedPassword",
				email: "test@test.com",
				bio: "Test bio",
				firstName: "Test",
				lastName: "Test",
				phoneNo: "123456789",
			};

			(prismaMock.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
			(bcrypt.compare as jest.Mock).mockResolvedValue(true);
			(jwt.sign as jest.Mock).mockReturnValue("token123");

			const result = await userService.login(
				"",
				"test@test.com",
				"password123"
			);

			expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
				where: { email: "test@test.com" },
			});
			expect(bcrypt.compare).toHaveBeenCalledWith(
				"password123",
				"hashedPassword"
			);
			expect(result).toBe("token123");
		});

		it("should throw NotFoundException if user is not found", async () => {
			(prismaMock.user.findUnique as jest.Mock).mockResolvedValue(null);

			await expect(
				userService.login("unknownUser", "", "password123")
			).rejects.toThrow(NotFoundException);
		});

		it("should throw UnauthorizedException if password is incorrect", async () => {
			const mockUser: Omit<
				User,
				"id" | "locationId" | "serviceProviderId" | "storeId"
			> = {
				username: "testuser",
				password: "password123",
				email: "test@test.com",
				bio: "Test bio",
				firstName: "Test",
				lastName: "Test",
				phoneNo: "123456789",
			};

			(prismaMock.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
			(bcrypt.compare as jest.Mock).mockResolvedValue(false);

			await expect(
				userService.login("testuser", "", "wrongPassword")
			).rejects.toThrow(UnauthorizedException);
		});
	});

	// **** GET USER **** //
	describe("getOne", () => {
		it("should return the user for a valid token", async () => {
			const mockUser: Omit<
				User,
				"locationId" | "serviceProviderId" | "storeId"
			> = {
				username: "testuser",
				password: "password123",
				email: "test@test.com",
				bio: "Test bio",
				firstName: "Test",
				lastName: "Test",
				phoneNo: "123456789",
				id: "123",
			};

			(prismaMock.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

			const token = { userId: "123" }; // Mock JWT payload

			const result = await userService.getOne(token);

			expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
				where: { id: token.userId },
				select: expect.any(Object), // Check correct select object
			});
			expect(result).toEqual(mockUser);
		});

		it("should throw NotFoundException if user is not found", async () => {
			(prismaMock.user.findUnique as jest.Mock).mockResolvedValue(null);

			const token = { userId: "unknownId" };

			await expect(userService.getOne(token)).rejects.toThrow(
				NotFoundException
			);
		});
	});

	describe("getAll", () => {
		it("should return all users", async () => {
			const mockUsers: Partial<User>[] = [
				{
					id: "123",
					username: "testuser",
					bio: "Test bio",
				},
			];

			(prismaMock.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

			const result = await userService.getAll();

			expect(prismaMock.user.findMany).toHaveBeenCalled();
			expect(result).toEqual(mockUsers);
		});

		it("should throw NotFoundException if users are not found", async () => {
			(prismaMock.user.findMany as jest.Mock).mockResolvedValue(null);

			await expect(userService.getAll()).rejects.toThrow(NotFoundException);
		});
	});

	// **** UPDATE USER **** //
	describe("updateOne", () => {
		it("should update a user successfully", async () => {
			const mockUser: Omit<
				User,
				"locationId" | "serviceProviderId" | "storeId"
			> = {
				id: "123",
				username: "testuser",
				password: "password123",
				email: "test@test.com",
				bio: "Test bio",
				firstName: "Test",
				lastName: "Test",
				phoneNo: "123456789",
			};

			(prismaMock.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
			(prismaMock.user.update as jest.Mock).mockResolvedValue(mockUser);

			const token = { userId: "123" };
			const updatedData = { username: "updatedUser" };

			await userService.updateOne(updatedData, token);

			expect(prismaMock.user.update).toHaveBeenCalledWith({
				where: { id: token.userId },
				data: updatedData,
			});
		});

		it("should throw NotFoundException if user is not found", async () => {
			(prismaMock.user.findUnique as jest.Mock).mockResolvedValue(null);

			const token = { userId: "unknownId" };
			const updatedData = { username: "updatedUser" };

			await expect(userService.updateOne(updatedData, token)).rejects.toThrow(
				NotFoundException
			);
		});
	});

	// **** DELETE USER **** //
	describe("deleteOne", () => {
		it("should delete a user successfully", async () => {
			const mockUser: Omit<
				User,
				"locationId" | "serviceProviderId" | "storeId"
			> = {
				id: "123",
				username: "testuser",
				password: "password123",
				email: "test@test.com",
				bio: "Test bio",
				firstName: "Test",
				lastName: "Test",
				phoneNo: "123456789",
			};

			(prismaMock.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
			(prismaMock.user.delete as jest.Mock).mockResolvedValue(mockUser);

			const token = { userId: "123" };

			await userService.deleteOne(token);

			expect(prismaMock.user.delete).toHaveBeenCalledWith({
				where: { id: token.userId },
			});
		});

		it("should throw NotFoundException if user is not found", async () => {
			(prismaMock.user.findUnique as jest.Mock).mockResolvedValue(null);

			const token = { userId: "unknownId" };

			await expect(userService.deleteOne(token)).rejects.toThrow(
				NotFoundException
			);
		});
	});
});
