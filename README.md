Projet de simplification des demandes à la MDPH
================================================


[![Build Status](https://circleci.com/gh/sgmap/mdph.svg?style=svg)](https://circleci.com/gh/sgmap/mdph)

## Getting Started

### Prerequisites

- [Node.js and npm](https://nodejs.org/) Node ^6.5.9, npm ^3.*
- [yarn](https://yarnpkg.com/) ^0.19
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod` ^3.0
- [pdftk](https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit) pdftk_server-2.02
- [imagemagick](https://www.imagemagick.org/script/download.php) imagemagick ^7.0.4.6
- [qpdf](https://sourceforge.net/projects/qpdf/files/?SetFreedomCookie) qpdf ^5.1.2

### Developing

1. Run `yarn install` to install server dependencies.

2. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

3. Run `yarn dev` to start the development server. It should automatically open the client in your browser when ready.

### Testing

#### Unit tests

- `yarn test` will run the tests with karma and mocha.
  - You can also add `:front` or `:back` to run either front or back tests.

#### End to end tests

1. Run `yarn local-server` to start a server on a testing environment

2. Run `yarn local-e2e` to install a selenium webdriver and run protractor on it

### Production

Use `yarn start` to build the application and run it in production mode.

## Docker

Use `docker-compose up` to start the application within a docker container.
The docker application is bundled with an empty database.

## Libraries

To build the UI bootstrap library (v0.13.3), create a custom build with these dependencies:
  - Button
  - Dropdown
  - Modal
  - Tooltip
  - Typeahead
