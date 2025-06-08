## Description

This project is a RESTful API built with NestJS, Prisma ORM, and Zod for schema validation. It serves as the backend for a minimal blogging platform, allowing users to create and retrieve blog posts and their associated comments.

The system was designed to follow clean architectural principles, including the separation of concerns across use-cases, validation, and infrastructure layers. It also includes Swagger documentation and e2e tests using Jest and Supertest.

## 🚀 Tech Stack

- **Framework:** [NestJS](https://nestjs.com/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Validation:** [Zod](https://zod.dev/)
- **Database:** PostgreSQL (or configurable)
- **Documentation:** [Swagger / OpenAPI](https://swagger.io/)
- **Testing:** Jest, Supertest (E2E)

---

## 📦 Features

### ✅ Blog Posts

- `POST /posts` – Create a new blog post
- `GET /posts` – List blog posts with pagination and comment count
- `GET /posts/:id` – Retrieve a specific blog post with its comments
- `POST /posts/:id/comments` – Add a comment to a specific blog post

## ⏳ Give Me More Time And I Will...

If given more time, I would continue evolving this project by:

- 🧪 **Adding unit tests** for all use-cases to ensure correctness of business logic in isolation.
- 🧱 **Implementing the Repository Pattern** with interfaces to abstract and decouple the database layer (Prisma) from the core logic.
- 🧩 **Introducing Entity classes** for `BlogPost` and `Comment` to encapsulate domain behavior and keep logic independent of external libraries.
- 🔌 **Applying Dependency Inversion** to make the application more testable and modular.
- 🧼 **Refactoring toward a more robust architecture**, such as **Hexagonal (Ports & Adapters)** or **DDD-inspired structure**, to improve maintainability and extensibility over time.

## Project setup

```bash
$ npx prisma generate
$ npx prisma migrate dev
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
