FrameJS Component library starter is a setup using [FractalJS](fractal.build/guide) for docmenting the components, while being a playground for development. 

TodoMVC is included for reference, showing how to write documentation and serves as an example on how to use [FrameJS](https://github.com/framejs/framejs).

## Getting started

Install dependencies:

```sh
$ npm install
```

Start a development server:

```sh
$ npm start
```

Build for production and generate static documentation:

```sh
$ npm run build
```

## Writing unit and e2e tests

This starter-kit comes with Karma test runner for testing components.
Webpack is preconfigured to compile all test files called `[file].spec.(ts|tsx)` in the `/src` directory, and Karma is configured to load all test files and the compiled `src/index.tsx`.

To run all tests:

```sh
$ npm test
```

To run all tests and run on every test file change:

```sh
$ npm run test:watch
```

Settings for Karma can be configured in `karma.conf.js`

Enjoy!


