import { Router } from "express";

import Paths from "../common/Paths";
import UserRoutes from "./UserRoutes";
import PetRoutes from "./PetRoutes";
import StoreRoutes from "./StoreRoutes";

// **** Variables **** //

const apiRouter = Router();

// ** Add UserRouter ** //

// Init router
const userRouter = Router();
const petRouter = Router();
const storeRouter = Router();

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

// Store routes
storeRouter.get(Paths.Stores.GetAll, StoreRoutes.getAllUserStores);
storeRouter.post(Paths.Stores.Create, ...StoreRoutes.create);
storeRouter.get(Paths.Stores.Get, StoreRoutes.getOne);
storeRouter.put(Paths.Stores.Update, ...StoreRoutes.update);
storeRouter.delete(Paths.Stores.Delete, StoreRoutes.deleteOne);

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);
apiRouter.use(Paths.Pets.Base, petRouter);
apiRouter.use(Paths.Stores.Base, storeRouter);

// **** Export default **** //

export default apiRouter;
