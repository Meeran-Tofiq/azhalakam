import validationHandler from "@src/middleware/validationHandler";
import { NextFunction } from "express";
import { body } from "express-validator";

// *** Validation rules *** //

// store creation validator, currently empty with no validation
export const createPetStoreValidator = [validationHandler];

// store update validator, currently empty with no validation
export const updatePetStoreValidator = [validationHandler];
