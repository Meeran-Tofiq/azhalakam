import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import express, { Request, Response, NextFunction } from "express";
import logger from "jet-logger";

// import "express-async-errors";

import BaseRouter from "@src/routes";

import Paths from "@src/common/Paths";
import EnvVars from "@src/common/EnvVars";
import HttpStatusCodes from "@src/common/HttpStatusCodes";
import { RouteError, ValidationException } from "@src/common/classes";
import { NodeEnvs } from "@src/common/misc";
import { extractJwtMiddleware } from "./middleware/JwtMiddleware";

// **** Variables **** //

const app = express();

// **** Setup **** //
logger.info(`Environment: ${EnvVars.DatabaseURL}`);
// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(EnvVars.CookieProps.Secret));

// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
	app.use(morgan("dev"));
}

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
	app.use(helmet());
}

// extract JWT token
app.use(extractJwtMiddleware);

app.use((req, res, next) => {
	const delay = Math.floor(Math.random() * 600);
	setTimeout(next, delay);
});

// Add APIs, must be after middleware
app.use(Paths.Base, BaseRouter);

// Add error handler
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
	if (EnvVars.NodeEnv !== NodeEnvs.Test.valueOf()) {
		logger.err(err, true);
	}

	if (err instanceof ValidationException) {
		res.status(err.status).json({
			error: err.message,
			validationErrors: err.validationErrors,
		});
		return;
	} else if (err instanceof RouteError) {
		res.status(err.status).json({ error: err.message });
		return;
	}

	// Default to internal server error if not handled above
	res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
		error: "Internal Server Error",
	});
	return;
});

// **** Export default **** //

export default app;
