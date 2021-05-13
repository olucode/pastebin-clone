# Pastebin Clone API

## Technologies

* Language
  * TypeScript: <https://www.typescriptlang.org/docs/>

* Web Framework
  * NestJS: <https://docs.nestjs.com/>

* Database ORM
  * TypeORM: <https://typeorm.io/>

* Authentication
  * JWT: <https://jwt.io/>

* Linter
  * ESLint: <https://eslint.org/>

* Formatter
  * Prettier: <https://prettier.io/>

* Test
  * Jest: <https://jestjs.io/>

* Documentation
  * Compodoc: <https://compodoc.app/>

* Documentation OpenAPI
  * OpenAPI: <https://www.openapis.org/>
  * Swagger UI: <https://swagger.io/tools/swagger-ui/>

## Installation

Ensure that the nest-cli is installed globally

```shell
npm i -g @nestjs/cli
```

### Docker development

```shell
docker-compose up -d
```

### Running the app without Docker

```shell
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Test

```shell
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## DB migration

To run migrations, SSH into the app container with `docker-compose exec app bash` (ignore if not Docker). Then run any of the below commands


```shell
# generate
npm run migration:generate <name>

# show all migrations
npm run migration:show

# run
npm run migration:run

# dry run
npm run schema:log

# revert
npm run migration:revert
```

## Documentation

```shell
npm run doc
```

When the app is up and running, Swagger API documentation is available at the `/swagger` route
