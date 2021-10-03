# tuto-nestjs

Test repo for NestJS / Clean Architecture with Nest JS / Dockerized / Will be used to test CircleCI and other stuff

This project uses YARN as package manager.

## Set up local environment

### Without Docker

This will install all dependencies:

```sh
  npm install
```

This will start the project:

```sh
  npm start
```

## Tests

### Test Logic

The logic applied here for testing is to unit test the domain (where you're business rules lives) to ensure business rules are always right no matter how we modify other layers. We use E2E Testing to ensure all layers communicate in the right way ( from presentation to repository ).

### Unit Test

Launch unit test:

```sh
  npm run test
```

Launch unit test with watcher:

```sh
  npm run test:watch
```

### E2E Test

Launch E2E tests:

```sh
  npm run test:e2e
```
