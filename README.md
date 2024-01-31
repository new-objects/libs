# Template: Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

[![Deploy project to GitHub Pages](https://github.com/new-objects/template-frontend-phaser3/actions/workflows/deploy.yml/badge.svg)](https://github.com/new-objects/template-frontend-phaser3/actions/workflows/deploy.yml)

[Template](https://new-objects.github.io/template-frontend/) for frontend projects of newObjects GmbH.

## Tools / stack

- [Vite](https://vitejs.dev/) for bundling
- [VanillaJS](http://vanilla-js.com/) (no framework)
- [TailwindCSS](https://tailwindcss.com/) for styling
- [PostCSS](https://postcss.org/) for CSS processing
- [ESLint](https://eslint.org/) for linting
- [Prettier](https://prettier.io/) for code formatting
- [GitHub actions](https://github.com/features/actions) for continuous integration

All tools are defined as **`dev-dependencies`**!

## Usage

There are three ways to get started with this template:

1. Either use the [nobj](https://github.com/new-objects/cli) tool to create a copy of this template ("frontend")
2. [Create a new repository with this repository as template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)
3. Fork the repository and clone it to your local machine.

### Getting started

We provide a default set of tools via npm scripts. Run a script via

```shell
$ npm run <command>
```

where `<command>` is one of the following available commands:

| Command          | Description                                                                                   | Output                                           |
| ---------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `install`        | Installs dependencies                                                                         | -                                                |
| `dev`            | Starts a development server with hot reloading                                                | http://localhost:5173                            |
| `dev:host`       | Starts a development server with hot reloading, listening to all available network interfaces | http://localhost:5173, http://0.0.0.0:5173, ...  |
| `build`          | Builds the project for production                                                             | `dist`                                           |
| `build:gh-pages` | Builds the project for production (gh-pages)                                                  | `dist`                                           |
| `preview`        | Builds the project for production and previews it locally                                     | http://localhost:4173                            |
| `lint`           | Lints the project                                                                             | -                                                |
| `lint:fix`       | Lints the project and fixes errors                                                            | -                                                |
| `prettier`       | Formats the project                                                                           | -                                                |
| `prettier:fix`   | Formats the project and fixes errors                                                          | -                                                |
| `format`         | Lints and formats the project and fixes errors                                                | -                                                |
| `gh-deploy`      | Builds the project for production (gh-pages) and deploys it to GitHub Pages                   | https://new-objects.github.io/template-frontend/ |

## Environment variables

The following environment variables are used in this project:

- `NODE_ENV`: The environment in which the application is running. Possible values are `development`, `test`, and `production`.
- `DEPLOY_ENV`: The environment to which the application is deployed. Possible values are `""` and `gh-pages`.
