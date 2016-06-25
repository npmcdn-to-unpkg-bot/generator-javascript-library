# generator-javascript-library

Kickstart your open-source javascript library with yeoman. This generator will scaffold an open source javascript library with babel, webpack, nyc, travis-ci, codecov.io, commitizen, semantic-release...

[![Travis](https://img.shields.io/travis/BenoitAverty/generator-javascript-library.svg)](https://travis-ci.org/BenoitAverty/generator-javascript-library)
[![npm](https://img.shields.io/npm/v/generator-javascript-library.svg)](https://npmjs.com/package/generator-javascript-library)

## Features

 - Write ES2015 today with [babel](https://babeljs.io/)
 - Write beautiful and maintainable code with [ESLint](http://eslint.org/) and [Airbnb's style guide](https://github.com/airbnb/javascript)
 - Test your code with [Mocha](https://mochajs.org/), [Sinon](sinonjs.org) and [Chai](chaijs.com)
 - Track test coverage easily with [nyc](https://github.com/bcoe/nyc) and publish it on [codecov.io](codecov.io)
 - Release a build for the browser with [Webpack](https://webpack.github.io/)
 - Automatically release new versions on github and npm with [semantic-release](https://github.com/semantic-release/semantic-release)
 - Enforce best practices and high quality standards with [ghooks](https://github.com/gtramontina/ghooks) and [commitizen](https://commitizen.github.io/cz-cli/)

 ## Usage

 ### Kickstart your open-source library!

The yeoman generator itself is very easy to use (like most yeoman generators):

```bash
npm install -g yo generator-javascript-library
yo javascript-library
```

 However, to completely set-up everything, we advise you to follow these steps:

###### Create the github repo first.

Javasript libraries often have their names in lower case with words separated with dashes (e.g.: symmetrical-happiness). This will also be the name of your library on npm. Don't put anything in your repo, the generator will do it for you.

###### Init your repo locally and use the generator

go somewhere convenient and set-up your workspace.

```bash
mkdir symmetrical-happiness && cd symmetrical-happiness
git init
git remote add origin https://github.com/YourUsername/symmetrical-happiness.git
yo javascript-library
```

After answering a few questions, the generator will do all the dirty work for you.

###### Prepare the continuous delivery process.

If you haven't done so already, go to [travis-ci.org](travis-ci.org), sign up for an account and add your repository to their system (More CI services will be supported in the future).

You can also register an account to [codecov.io](codecov.io) and add the repository to their service if you want to publish your code coverage and add a sweet badge to your readme.

Prepare your releasing process :
```
npm install -g semantic-release-cli
semantic-release-cli setup # in the repo folder
```

###### Ready for the next step ?

```bash
git add .
./node_modules/.bin/git-cz # commit using commitizen. Choose the 'feat' commit type for the creation of your library!
git push
```

If everything was setup correctly, many magical things will happen:
 - The newly created library will be present on github, ready to accept contributions (ok, this one is not so magical)
 - Travis-ci will start a build, test your library against node 4, 5 and 5, check code coverage and send it to codecov.io
 - A release will be created on github, along with the appropriate tag. A changelog will be generated describing the changes to the library.
 - Your library will be built and published on NPM. You can install it via `npm install` and dowload the browser build on npmcdn.com.

 ###### Other things that can be fun

 - enable [greenkeeper.io](greenkeeper) on your repo to keep your dependencies up to date : `greenkeeper enable`
 - Install commitizen globally to simplify commits: `npm install -g commitizen && git cz`
 - Adjust the coverage thresholds: change the numbers in package.json, in the `test:check-coverage` command.

### Understand the dev process of your new library

#### Testing

- Run the tests: `npm run test` or `npm tests` or `npm t`
- Run the tests and compute coverage : `npm run test:with-coverage`. Html coverage reports will be in the "coverage/lcov-report/" folder.
- Check that coverage is 100 percent: `npm run test:check-coverage`

#### Building

- Build your library for npm: `npm run build:lib`
- Build your library for the browser: `npm run build:umd` or minified with `npm run build:umd.min`
- All of the above: `npm run build`
- If you chose to not have a browser build, there's just `npm run build` which does the same as `npm run build:lib`.

#### Other useful scripts

- Clean coverage reports: `npm run clean:coverage`
- Clean build artifacts: `npm run clean:build`
- All of the above: `npm run clean`

#### Commiting

You can commit like you normally would, but you'll have to follow the [angular conventional commit format](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit). To help you do this you can use commitizen (see usage section).

Before each commit is taken into account, the tests wil be run and the coverage will be checked. If this fails, you can commit with the same message by running `git cz --retry`.

The commit message is also validated to ensure you respect the format. This is important so that the semantic-release module works properly.

## Inspipration

This generator was built with a lot of inspiration from Kent C. Dodds video series about open source libraries. You can watch it [on egghead.io](https://egghead.io/courses/how-to-write-an-open-source-javascript-library) to better understand everything that's used with this generator.
