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
- `packages`: Everything in `packages/` is a shared dependency between at least two applications.

## Getting Started with Development/Contributing

### Environment Variables

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
