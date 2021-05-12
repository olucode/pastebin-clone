# NestJS starter

[![CI status](https://github.com/twihike/nestjs-starter/workflows/ci/badge.svg)](https://github.com/twihike/nestjs-starter/actions)

[NestJS](https://github.com/nestjs/nest) framework starter repository.

## Technologies

* Language
  * Docs
    * TypeScript: <https://www.typescriptlang.org/docs/>
  * Packages
    * typescript: <https://github.com/microsoft/TypeScript>

* Web Application Framework
  * Docs
    * NestJS: <https://docs.nestjs.com/>
  * Packages
    * @nestjs: <https://github.com/nestjs/nest>

* Database Access
  * Docs
    * TypeORM: <https://typeorm.io/>
      * Supports MySQL / Postgres / SQLite And more...
      * Automatic migrations generation
  * Packages
    * @nestjs/typeorm: <https://github.com/nestjs/typeorm>
    * typeorm: <https://github.com/typeorm/typeorm>

* Validation
  * class-validator: <https://github.com/typestack/class-validator>

* Serialization
  * class-transformer: <https://github.com/typestack/class-transformer>

* Security
  * helmet: <https://github.com/helmetjs/helmet>
  * bcrypt: <https://github.com/kelektiv/node.bcrypt.js>
  * CORS: NestJS built-in

* Authentication
  * Docs
    * JWT: <https://jwt.io/>
    * JWT Node.js: <https://github.com/auth0/node-jsonwebtoken>
    * Passport: <http://www.passportjs.org/>
  * Packages
    * @nestjs/passport: <https://github.com/nestjs/passport>
    * passport: <https://github.com/jaredhanson/passport>
    * @nestjs/jwt: <https://github.com/nestjs/jwt>
    * passport-jwt: <https://github.com/mikenicholson/passport-jwt>

* Health Check
  * @nestjs/terminus: <https://github.com/nestjs/terminus>
  * @godaddy/terminus: <https://github.com/godaddy/terminus>

* 12-Factor based config
  * `src/config/config.service.ts`
  * `src/config/config.env.ts`

* Linter
  * Docs
    * ESLint: <https://eslint.org/>
  * Packages
    * eslint: <https://github.com/eslint/eslint>
    * eslint-config-airbnb: <https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb>
    * @typescript-eslint/parser: <https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/parser>
    * @typescript-eslint/eslint-plugin: <https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin>

* Formatter
  * Docs
    * Prettier: <https://prettier.io/>
  * Packages
    * prettier: <https://github.com/prettier/prettier>
    * eslint-plugin-prettier: <https://github.com/prettier/eslint-plugin-prettier>
    * eslint-config-prettier: <https://github.com/prettier/eslint-config-prettier>

* Test
  * Docs
    * Jest: <https://jestjs.io/>
  * Packages
    * jest: <https://github.com/facebook/jest>

* Documentation
  * Docs
    * Compodoc: <https://compodoc.app/>
  * Packages
    * @compodoc/compodoc: <https://github.com/compodoc/compodoc>

* Documentation OpenAPI
  * Docs
    * OpenAPI: <https://www.openapis.org/>
    * Swagger UI: <https://swagger.io/tools/swagger-ui/>
  * Packages
    * @nestjs/swagger: <https://github.com/nestjs/swagger>
    * swagger-ui-express: <https://github.com/scottie1984/swagger-ui-express>

## Installation

```shell
yarn global add @nestjs/cli
yarn install
```

## Running the app

```shell
# development
yarn run start

# watch mode
yarn run start:dev

# production mode
yarn run start:prod
```

## Test

```shell
# unit tests
yarn run test

# e2e tests
yarn run test:e2e

# test coverage
yarn run test:cov
```

## DB migration

```shell
# generate
yarn run migration:generate <name>

# show all migrations
yarn run migration:show

# run
yarn run migration:run

# dry run
yarn run schema:log

# revert
yarn run migration:revert
```

## Documentation

```shell
yarn run doc
```
