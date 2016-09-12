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

###### Set up you local workspace (Init your repo, install tools and use the generator)

go somewhere convenient and set-up your workspace.

```bash
# create the repo locally
mkdir symmetrical-happiness && cd symmetrical-happiness
git init
git remote add origin https://github.com/YourUsername/symmetrical-happiness.git

# Install tools
npm install -g yo generator-javascript-library commitizen semantic-release-cli

# Let's go!
yo javascript-library
```

After answering a few questions, the generator will do all the dirty work for you.

###### Prepare the continuous delivery process.

While the dependencies are being installed, go to [travis-ci.org](travis-ci.org), sign up for an account and add your repository to their system (More CI services will be supported in the future).

You can also register an account to [codecov.io](codecov.io) and add the repository to their service if you want to publish your code coverage and add a sweet badge to your readme.

Prepare your releasing process :
```
semantic-release-cli setup # in the repo folder
```

###### Ready for the next step? Release!

**Important:** This will release a 1.0.0 version on NPM. See below if you're not ready.

```bash
git add .
git cz # commit using commitizen. Choose the 'feat' commit type for the creation of your library!
git push origin master
```

If everything was setup correctly, many magical things will happen:
 - The newly created library will be present on github, ready to accept contributions (ok, this one is not so magical)
 - Travis-ci will start a build, test your library against node 4, 5 and 6, check code coverage and send it to codecov.io
 - A release will be created on github, along with the appropriate tag. A changelog will be generated describing the changes to the library.
 - Your library will be built and published on NPM. You can install it via `npm install` and dowload the browser build on unpkg.com.

*This will release a 1.0.0 version on NPM.* If your library is not yet ready, it may be better to start with a 0.1.0 version. semantic-release does not support this, so you'll have to publish this version yourself. After commiting, before pushing, change the "version" field in package.json to 0.0.0 and run this:
```bash
npm version minor
npm publish
```

and then push including tags:
```bash
git push origin master --tags
```

Don't worry, this is only for the first version. You can now forget about releases, semantic-release will do it for you.

###### Other useful things

 - enable [greenkeeper.io](greenkeeper) on your repo to keep your dependencies up to date : `greenkeeper enable`
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

## Inspiration

This generator was built with a lot of inspiration from Kent C. Dodds video series about open source libraries. You can watch it [on egghead.io](https://egghead.io/courses/how-to-write-an-open-source-javascript-library) to better understand everything that's used with this generator.

## Roadmap

Here is a list of options and features that are planned for the future (in approximate order of priority)
 - Add the option to CircleCI instead of Travis-CI
 - Tests (for the generator)
 - Add the option to use gulp instead of npm scripts
 - Add the option to disable code coverage checking/reporting
 - Add more options for code coverage publishing (coveralls instead of codecov.io for example)
 - Add the option to use other testing frameworks instead of mocha (Tape or Jasmine come to mind)
 - Better .gitignore and .npmignore
 - Add all the parameters as options so that the generator plays better with others
 - Add the option to use rollup instead of webpack (contribution welcome on this one, as I don't know rollup myself)
 - Add the option to use other style guides for eslint instead of Airbnb
 - Add the option to customize which badges are present in the readme
