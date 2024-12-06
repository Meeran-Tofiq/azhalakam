import { Router } from "express";

import Paths from "../common/Paths";
import UserRoutes from "./UserRoutes";
import PetRoutes from "./PetRoutes";
import StoreRoutes from "./StoreRoutes";
import PetStoreRoutes from "./PetStoreRoutes";
import VetStoreRoutes from "./VetStoreRoutes";
import ProductRoutes from "./ProductRoutes";
import AppointmentRoutes from "./AppointmentRoutes";
import ReviewRoutes from "./ReviewRoutes";
import ServiceProviderRoutes from "./ServiceProviderRoutes";
import ServiceRoutes from "./ServiceRoutes";
import LocationRoutes from "./LocationRoutes";

// **** Variables **** //

const apiRouter = Router();

// ** Add UserRouter ** //

// Init routers
const userRouter = Router();
const petRouter = Router();
const storeRouter = Router();
const petStoreRouter = Router({ mergeParams: true });
const vetStoreRouter = Router({ mergeParams: true });
const productRouter = Router();
const appointmentRouter = Router();
const reviewRouter = Router();
const serviceProviderRouter = Router();
const serviceRouter = Router();
const locationRouter = Router();

// User routes
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
storeRouter.get(Paths.Stores.GetAllOfUser, StoreRoutes.getAllUserStores);
storeRouter.get(Paths.Stores.GetAll, StoreRoutes.getAll);
storeRouter.post(Paths.Stores.Create, ...StoreRoutes.create);
storeRouter.get(Paths.Stores.Get, StoreRoutes.getOne);
storeRouter.put(Paths.Stores.Update, ...StoreRoutes.update);
storeRouter.delete(Paths.Stores.Delete, StoreRoutes.deleteOne);

// Add nested routes to StoreRouter
storeRouter.use(Paths.Stores.PetStores.Base, petStoreRouter); // register the nested pet store routes within stores.
storeRouter.use(Paths.Stores.VetStores.Base, vetStoreRouter); // register the nested vet store routes within stores.

// Pet Store routes
petStoreRouter.get(Paths.Stores.PetStores.Get, PetStoreRoutes.getOne);
petStoreRouter.post(Paths.Stores.PetStores.Create, ...PetStoreRoutes.create);
petStoreRouter.put(Paths.Stores.PetStores.Update, ...PetStoreRoutes.update);
petStoreRouter.delete(Paths.Stores.PetStores.Delete, PetStoreRoutes.deleteOne);

// Vet Store routes
vetStoreRouter.get(Paths.Stores.VetStores.Get, VetStoreRoutes.getOne);
vetStoreRouter.post(Paths.Stores.VetStores.Create, ...VetStoreRoutes.create);
vetStoreRouter.put(Paths.Stores.VetStores.Update, ...VetStoreRoutes.update);
vetStoreRouter.delete(Paths.Stores.VetStores.Delete, VetStoreRoutes.deleteOne);

// Product routes
productRouter.post(Paths.Products.Create, ...ProductRoutes.create);
productRouter.get(Paths.Products.GetAll, ProductRoutes.getAll);
productRouter.get(Paths.Products.Get, ProductRoutes.getOne);
productRouter.put(Paths.Products.Update, ...ProductRoutes.update);
productRouter.delete(Paths.Products.Delete, ProductRoutes.deleteOne);

// Location routes
locationRouter.post(Paths.Locations.Create, ...LocationRoutes.create);
locationRouter.get(Paths.Locations.Get, LocationRoutes.getOne);
locationRouter.put(Paths.Locations.Update, ...LocationRoutes.update);
locationRouter.delete(Paths.Locations.Delete, LocationRoutes.deleteOne);

// ServiceProvider routes
serviceProviderRouter.post(
	Paths.ServiceProviders.Create,
	...ServiceProviderRoutes.create
);
serviceProviderRouter.get(
	Paths.ServiceProviders.Get,
	ServiceProviderRoutes.getOne
);
serviceProviderRouter.put(
	Paths.ServiceProviders.Update,
	...ServiceProviderRoutes.update
);
serviceProviderRouter.delete(
	Paths.ServiceProviders.Delete,
	ServiceProviderRoutes.deleteOne
);

// Service routes
serviceRouter.post(Paths.Services.Create, ...ServiceRoutes.create);
serviceRouter.get(Paths.Services.Get, ServiceRoutes.getOne);
serviceRouter.put(Paths.Services.Update, ...ServiceRoutes.update);
serviceRouter.delete(Paths.Services.Delete, ServiceRoutes.deleteOne);

// Review routes
reviewRouter.get(Paths.Reviews.GetAll, ReviewRoutes.getAllInPage);
reviewRouter.post(Paths.Reviews.Create, ...ReviewRoutes.create);
reviewRouter.get(Paths.Reviews.Get, ReviewRoutes.getOne);
reviewRouter.put(Paths.Reviews.Update, ...ReviewRoutes.update);
reviewRouter.delete(Paths.Reviews.Delete, ReviewRoutes.deleteOne);

// Appointment routes
appointmentRouter.get(
	Paths.Appointments.GetAll,
	AppointmentRoutes.getAllUserAppointments
);
appointmentRouter.post(Paths.Appointments.Create, ...AppointmentRoutes.create);
appointmentRouter.get(Paths.Appointments.Get, AppointmentRoutes.getOne);
appointmentRouter.put(Paths.Appointments.Update, ...AppointmentRoutes.update);
appointmentRouter.delete(
	Paths.Appointments.Delete,
	AppointmentRoutes.deleteOne
);

// Add routes to apiRouter
apiRouter.use(Paths.Users.Base, userRouter);
apiRouter.use(Paths.Pets.Base, petRouter);
apiRouter.use(Paths.Stores.Base, storeRouter);
apiRouter.use(Paths.Products.Base, productRouter);
apiRouter.use(Paths.Appointments.Base, appointmentRouter);
apiRouter.use(Paths.Reviews.Base, reviewRouter);
apiRouter.use(Paths.ServiceProviders.Base, serviceProviderRouter);
apiRouter.use(Paths.Services.Base, serviceRouter);
apiRouter.use(Paths.Locations.Base, locationRouter);

// **** Export default **** //

export default apiRouter;
