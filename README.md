Projet de simplification des demandes à la MDPH
================================================


[![Build Status](https://circleci.com/gh/sgmap/mdph.svg?style=svg)](https://circleci.com/gh/sgmap/mdph)

## Getting Started

### Prerequisites

- [Node.js and npm](https://nodejs.org/) Node ^6.5.9, npm ^3.*
- [yarn](https://yarnpkg.com/) ^0.19
- [Ruby](https://www.ruby-lang.org) and then `gem install sass` for [Sass](http://sass-lang.com/)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod` ^3.0
- [pdftk](https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit) pdftk_server-2.02
- [imageMagic](https://www.imagemagick.org/script/download.php) ImageMagic ^7.0.4.6
- [qpdf](https://sourceforge.net/projects/qpdf/files/?SetFreedomCookie) qpdf ^5.1.2

### Developing

1. Run `yarn install` to install server dependencies.

2. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

3. Run `yarn dev` to start the development server. It should automatically open the client in your browser when ready.

## Testing

- `yarn test` will run the tests with karma and mocha.
  - You can also add `-front` or `-back` to run either front or back tests.

- `yarn protractor` will run the integration tests.

- `yarn coverage` will run the test coverage and generate a report in html in the `coverage` directory
  - `lcov-report` is the directory for server coverage, just open the `index.html` to browse the results
  - `PhantomJS` is the directory for client coverage, just open the `index.html` to browse the results

## Docker

Use `docker-compose up` to start the application within a docker container.
The docker application is bundled with an empty database.

## Production

Use `yarn start` to build the application and run it in production mode.
