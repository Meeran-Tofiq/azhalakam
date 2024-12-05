# Azhalakam

```
           _           _       _
  __ _ ___| |__   __ _| | __ _| | ____ _ _ __ ___
 / _` |_  / '_ \ / _` | |/ _` | |/ / _` | '_ ` _ \
| (_| |/ /| | | | (_| | | (_| |   < (_| | | | | | |
 \__,_/___|_| |_|\__,_|_|\__,_|_|\_\__,_|_| |_| |_|

```

## About

Azhalakam is a mobile app that helps users with all things pet related. Our app lets you order pet food, book services for you pets like pet-sitting, walkers, and groomers, and view and compare all the local veternary clinics around you. If you like working with animals and want to make some extra cash, you can put yourself as a service provider and list whatever services that you are able to provide with your own custom fees. If you have a vet clinic and want to list your clinic on our app, you can do so with ust the click of a button!

The app consists of a main monorepo, with two applications that are fleshed out within. The first is an Express based backend that has a PostgreSQL database and uses Prisma to facilitate all interactions with it. The frontend consists of a React Native/Expo mobile app, that then interacts with the backend to get the necessary information.

This is a capstone project made by [Meeran Saman Jalal](https://github.com/Meeran-Tofiq) and [Mohammed Fryad Saleem](https://github.com/MohammedF02), supervised by Dr. Hoger Mahmud.

## Structure of the Repo

This is a monorepo built using `turborepo`. The basic structure is simple:

- `apps/`: Applications like the mobile frontend and the backend are stored in the `apps/` dir.
- `packages/`: Everything in `packages/` is a shared dependency between at least two applications.

## Getting Started with Development/Contributing

### Environment Variables

In general, the front and back end both have a `.env.example` file that can be copied into a `.env` file:

```sh
cp .env.example .env
```

The example file contains the format of the environment variables. If you need to add any new ones, please make sure to follow whatever convention is used for that application, and write descriptive comments for ease of understanding.

#### backend

In the backend, any name is acceptable and will be useable.

#### frontend

In the frontend, Expo is configured, by default, to make any variable with the the format of `EXPO_PUBLIC_[NAME]=value` to be available throughout the application. Like so:

```
EXPO_PUBLIC_API_URL=https://localhost:3000/api
```

### Database

We use docker to host our database. We have a `docker-compose.yml` file at the root of the repo that runs and builds a container with the PostGreSQL image and correct configuration. To setup the db container:

```sh
docker compose up -d
```

The above command runs docker in a detached state.

If you want to shutdown docker, you can run:

```sh
docker compose down
```

#### Prisma Migrations

To make sure the tables defined in the models of the backend are made in the database in your container, you need to run the following command:

```sh
yarn prisma:migrate
```

This will generate all the tables in the database. It is setup so that whenever there are changes in the tables, it will be updated automatically. However, just in case it doesn't work from merges and collaborative work, run the command again if the models have been changed.

## Credits

For the pet images:

- CAT - [Mikhail Vasilyev](https://unsplash.com/@miklevasilyev)
- DOG - [Joe Caione](https://unsplash.com/@joeyc)
- LIZARD - [Robert Koorenny](https://unsplash.com/@koorenny)
- SNAKE - [Jordan](https://unsplash.com/@jordan_jelly)
- FISH - [Delbert Pagayona](https://unsplash.com/@dpagayona)
- HAMSTER - [Ricky Kharawala](https://unsplash.com/@sweetmangostudios)
- RABBIT - [Dave Solce](https://unsplash.com/@dlsolce)
- FERRET - [Steve Tsang](https://unsplash.com/@stevetsang)
- GUINEAPIG - [Bonnie Kittle](https://unsplash.com/@bonniekdesign)
- HORSE - [Lisa Lyne Blevins](https://unsplash.com/@lisablevins)
- AMPHIBIAN - [David Clode](https://unsplash.com/@davidclode)
- INSECT - [Julian Schultz](https://unsplash.com/@majorfluff)
- RODENT - [Nikolett Emmert](https://unsplash.com/@niki_emmert)
- BIRD - [Jason Hafso](https://unsplash.com/@jasonhafso)

For the store images:

- Vet Store - [Ivan Rojas Urrea](https://unsplash.com/@ivnrjs)
- Pet Store - [Jana Shnipelson](https://unsplash.com/@shnipelson)

For products:

- Pet toy - [Dorothe Wouters](https://unsplash.com/@darkmoonart)
- Pet food - [Daniel Dan](https://unsplash.com/@outsideclick)
- Miscellaneous - [Kelsey Dody](https://unsplash.com/@_kelseycam)
