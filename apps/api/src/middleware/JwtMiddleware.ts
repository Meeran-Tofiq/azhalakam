// src/middleware/JwtMiddleware.ts
import { UnauthorizedException } from "@src/common/classes";
import EnvVars from "@src/common/EnvVars";
import CustomJwtPayload from "@src/types/TokenPayload";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// **** Variables **** //
const JWT_SECRET = EnvVars.Jwt.Secret;

function verifyToken(token: string): CustomJwtPayload {
	try {
		return jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
	} catch (error) {
		throw new UnauthorizedException("Invalid token");
	}
}

// Middleware to extract and verify JWT
export const extractJwtMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		next(new UnauthorizedException("Invalid token"));
		return;
	}

	const token = authHeader.split(" ")[1];

	try {
		const decoded = verifyToken(token);
		req.decodedToken = decoded;
		next();
	} catch (error) {
		next(error);
	}
};
