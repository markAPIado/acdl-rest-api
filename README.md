[![Build](https://github.com/markAPIado/acdl-rest-api/actions/workflows/build.yml/badge.svg)](https://github.com/markAPIado/acdl-rest-api/actions/workflows/build.yml)

# Resti

This is a simple NodeJs Typescript Rest API using MVC design pattern. It uses MongoDB as the database and ExpressJs as the web framework.

## Features

- [x] Typescript
- [x] MongoDB, ExpressJs, NodeJs stack
- [x] MVC design pattern
- [x] Consistent coding style with Prettier and ESLint
- [x] High cohesion between components and modules
- [x] Pre-commit hooks with Husky
- [x] Operating system-agnostic scripts
- [x] CI/CD with Github Actions
- [x] Docker containerization

## Installation

Clone the repository using the command below.

```
https://github.com/markAPIado/acdl-rest-api.git
```

Run the following command to install the dependencies.

```
npm install
```

**Environment Variables:**
Rename the `rename.env` file to `.env` and update the environment variables.

```
cp rename.env .env
```

For **Windows** users, you can use the following command instead.

```
copy rename.env .env
```

**Git**
Initialize the git repository and set the remote origin.
Note: You cannot run `npm run husky:prepare` if you have not initialized the git repository. You do not need to do this if you cloned the repository.

```
git init
```

**Husky**

Run the following command to set up the pre-commit hooks. The default `npm run prepare` script will cause issues on Docker containerization so we need to use a different script.

```
npm run husky:prepare
```

## Development

Run the following command to start the development server.

```
npm run dev
```

**Pre-commit Workflow**

Run the command below to lint and format the code before committing. This will avoid prettier and eslint making changes to the code format on the pre-commit hook.

```
npm run local:pre-commit
```

**Commit Changes to Git**

This will run the pre-commit hook created by `Husky` before committing the changes to git. Stages are as follows:

- lint using eslint
- format using prettier
- test using jest

**NOTE:** You want to skip the test stage if it takes too long to run. However, it is recommended to run the tests before committing the changes to git.

## Build

Run the following command to compile the code to `dist` folder.

```
npm run build
```

## Production

Run the following command to start the production server.

```
npm start
```

## Testing

Run the test once using the command below.

```
npm test
```

Run the test in watch mode using the command below.

```
npm run test:watch
```

Run the test coverage using the command below.

```
npm run test:coverage
```

## Clustering using PM2

Check the `ecosystem.config.js` file for more details. Install PM2 globally if you haven't done so.

```
npm install pm2 -g
```

Run the following command to start the production server using PM2.

```
npm run cluster:start
```

## Other Scripts

**Formatting:**

- `npm run format` - formats the code using prettier.
- `npm run format-check` - checks the format of code using prettier.

**Linting:**

- `npm run lint` - identifyies and reports on patterns found in ECMAScript/JavaScript code.

**Cleaning up**

- `npm run clean` - removes the `dist`, `coverage`, and `node_modules` folders.
