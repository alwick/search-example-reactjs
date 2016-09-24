# ReactJS Search Example
[![Build Status](https://travis-ci.org/alwick/search-example-reactjs.svg)](https://travis-ci.org/alwick/search-example-reactjs)

## Overview

This project shows how to build a project which makes calls to a nodejs server via Restful call.  The user is able
to enter search criteria which is sent to the server to be processed against a given set of data and the results
are returned to the web client to be shown to the user.

## Featured Frameworks

* [Redux] (http://redux.js.org/) implementation of the Flux model for handling state changes.
* [React-Bootstrap] (https://react-bootstrap.github.io) a reactified version of the Bootstrap UI Framework.
* [Superagent] (https://github.com/visionmedia/superagent) a simple and testable http client.
* [React-fontawesome] (https://www.npmjs.com/package/react-fontawesome) a reactified version of the Font Awesome widgets.

**NOTE:** This project was created based on the [YARSK project](https://github.com/bradleyboy/yarsk#yarsk) for a starting point.

## YARSK Featured Frameworks

* [React](http://facebook.github.io/react/), of course.
* [Webpack](http://webpack.github.io/) for asset bundling.
* [React hot loader](https://github.com/gaearon/react-hot-loader) enabled out of the box. Changes to React components will show in the browser immediately without a full reload.
* [Babel](https://babeljs.io/) for ES6+ transpilation.
* [SASS](http://sass-lang.com/) (SCSS or Sass style), [Less](http://lesscss.org/), and [Autoprefixer](https://github.com/postcss/autoprefixer) enabled by default through Webpack.
* Image loaders setup and ready to go so you can reference your images as `require()` statements in JS, or just use `url()` as usual in CSS and Webpack will take care of the rest. See the [Header](https://github.com/bradleyboy/yarsk/blob/master/app/components/Header/index.js#L9-L18) component and the [Application component stylesheet](https://github.com/bradleyboy/yarsk/blob/master/app/components/Application/style.sass#L2) for examples of each.
* [Karma](http://karma-runner.github.io/0.12/index.html) + [Mocha](http://mochajs.org/) for testing. [Istanbul](https://gotwarlost.github.io/istanbul/) and [isparta](https://github.com/douglasduteil/isparta) are also activated with `karma-coverage` for code coverage analysis, even on your ES6 classes. See [Testing](https://github.com/alwick/search-example-reactjs#tests) below for more info.
* Production configuration with best practices applied for optimizing React file size. The bundled JS file produced from this example is right at 40KB minified and gzipped. See [Building](https://github.com/alwick/search-example-reactjs#building) below for more info.
* Built-in command for publishing your app to GitHub pages. See [Building](https://github.com/alwick/search-example-reactjs#building) below for more info.
* [Optional support for ESLint via babel-eslint](https://github.com/bradleyboy/yarsk#linting).

## Usage

```
npm install
npm start
```

That will fire up a webpack dev server in **hot** mode. Most changes will be reflected in the browser automatically without a browser reload. You can view the app in the browser at `http://localhost:8080`.

## Building

To generate a production build, run:

```
npm run build
```

The above command will generate a `dist` folder with the appropriate index.html file along with the minified CSS and JS files.

You can also automatically publish to GitHub pages. Just run this instead of the regular build command:

```
npm run build:gh
```

You can then view your app at `http://[yourgithubusername].github.io/[reponame]`. For example, you can load this demo at http://alwick.github.io/search-example-reactjs.

## Modifying the HTML

The HTML file is generated using the `conf/tmpl.html` file. This file is used for both the development and production build.

## Tests

The tests use Karma, Mocha and Chai through PhantomJS. See the example test in `app/Application/__tests__/index.js`. The test suite can be run like so:

```
npm test
```

To run the tests in watch mode (tests will re-run each time a file changes), use this instead:

```
npm run test:watch
```

You can generate code coverage reports with:

```
npm run test:coverage
```

See the `coverage` directory once that command is completed.

Finally, the repo is [Travis](https://travis-ci.org) ready. The `.travis.yml` file should work out of the box, just add your repo in Travis.

## Linting

If you'd like your JavaScript to be linted, copy the `.eslintrc.example` to `.eslintrc`. I've included my own defaults, feel free to modify them to your own taste. For more information on configuring ESLint, [consult its documentation](http://eslint.org/docs/rules/). Linting is run before each webpack build when a `.eslintrc` file is present.

## .editorconfig

An example `.editorconfig` file is provided with sensible defaults for JavaScript. Feel free to modify `.editorconfig.example` to match your own preferences, then renamed the file to `.editorconfig` and use an IDE or editor that supports [EditorConfig](http://editorconfig.org/).
