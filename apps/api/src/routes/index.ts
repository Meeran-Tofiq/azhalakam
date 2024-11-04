import { Router } from "express";

import Paths from "../common/Paths";
import UserRoutes from "./UserRoutes";
import PetRoutes from "./PetRoutes";

// **** Variables **** //

const apiRouter = Router();

// ** Add UserRouter ** //

// Init router
const userRouter = Router();
const petRouter = Router();

// Get all users
userRouter.get(Paths.Users.GetAll, UserRoutes.getAll);
userRouter.get(Paths.Users.Get, UserRoutes.getOne);
userRouter.post(Paths.Users.Login, ...UserRoutes.login);
userRouter.post(Paths.Users.Create, ...UserRoutes.create);
userRouter.put(Paths.Users.Update, ...UserRoutes.update);
userRouter.delete(Paths.Users.Delete, UserRoutes.deleteOne);

// Pet routes
petRouter.get(Paths.Pets.GetAll, PetRoutes.getAllUserPets);
petRouter.post(Paths.Pets.Create, ...PetRoutes.create);
petRouter.get(Paths.Pets.Get, PetRoutes.getOne);
petRouter.put(Paths.Pets.Update, ...PetRoutes.update);
petRouter.delete(Paths.Pets.Delete, PetRoutes.deleteOne);

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);
apiRouter.use(Paths.Pets.Base, petRouter);

// **** Export default **** //

export default apiRouter;
