import UserServiceFactory from "../UserService";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { BadRequestException } from "@src/common/classes";

jest.mock("@prisma/client");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("UserService", () => {
	it("should run", () => {
		expect(true).toBeTruthy();
	});
});
