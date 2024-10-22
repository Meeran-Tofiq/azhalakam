// src/types/express.d.ts

import * as express from "express";
import CustomJwtPayload from "./TokenPayload";

// Extend the Request interface in the Express module
declare global {
	namespace Express {
		interface Request {
			decodedToken?: CustomJwtPayload; // Adding a token field
		}
	}
}
