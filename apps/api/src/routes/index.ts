import { Router } from "express";

import Paths from "../common/Paths";
import UserRoutes from "./UserRoutes";

// **** Variables **** //

const apiRouter = Router();

// ** Add UserRouter ** //

// Init router
const userRouter = Router();

// Get all users
userRouter.get(Paths.Users.GetAll, UserRoutes.getAll);
userRouter.get(Paths.Users.Get, UserRoutes.getOne);
userRouter.post(Paths.Users.Create, UserRoutes.create);
userRouter.put(Paths.Users.Update, UserRoutes.update);
userRouter.delete(Paths.Users.Delete, UserRoutes.deleteOne);

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);

// **** Export default **** //

export default apiRouter;
