'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
var mkdirp = require('mkdirp');
var camelcase = require('camelcase');
var gitConfig = require('git-config');

module.exports = yeoman.Base.extend({
  initializing: function initializing() {
    this.props = {};
    this.gitc = gitConfig.sync();
    this.gitc.user = this.gitc.user || {};
  },
  prompting: function prompting() {
    var _this = this;

    // Have Yeoman greet the user.
    this.log('Welcome to the ' + chalk.blue('javascript-library') + ' generator!');

    var prompts = [{
      type: 'input',
      name: 'libraryName',
      message: 'What is the name of your library (your github repo should have the same name)?',
      default: path.basename(process.cwd()),
      validate: function validate(v) {
        return v !== null && v !== undefined && v !== '';
      }
    }, {
      type: 'input',
      name: 'libraryDesc',
      message: 'Write a short description for your library.'
    }, {
      type: 'input',
      name: 'githubUsername',
      message: 'What is your github username (or organisation)?',
      default: this.gitc.github ? this.gitc.github.user : null,
      validate: function validate(v) {
        return v !== null && v !== undefined && v !== '';
      }
    }, {
      type: 'input',
      name: 'libraryAuthor',
      message: 'Who\'s the author of the library?',
      default: function _default(answers) {
        return _this.gitc.user.name || answers.githubUsername;
      }
    }, {
      type: 'input',
      name: 'authorEmail',
      message: 'What\'s the author\'s email adress?',
      default: this.gitc.user.email
    }, {
      type: 'input',
      name: 'authorWebsite',
      message: 'What\'s the website of the author?'
    }, {
      type: 'confirm',
      name: 'umdBuild',
      message: 'Will you be releasing an umd build for the browser?',
      default: true
    }];

    return this.prompt(prompts).then(function (answers) {
      Object.assign(_this.props, answers, {
        githubSlug: answers.githubUsername + '/' + answers.libraryName,
        camelCaseLibraryName: camelcase(answers.libraryName)
      });
    });
  },
  default: function _default() {
    if (path.basename(this.destinationPath()) !== this.props.libraryName) {
      this.log('Your generator must be inside a folder named ' + this.props.libraryName + '\n\n        I\'ll automatically create this folder.');
      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.libraryName));
    }

    this.composeWith('license', {
      options: {
        name: this.props.libraryAuthor,
        email: this.props.authorEmail,
        website: this.props.authorWebsite
      }
    }, {
      local: require.resolve('generator-license')
    });
  },
  writing: function writing() {
    var _this2 = this;

    var files = ['README.md', '_babelrc', '_eslintrc', '_gitignore', '_npmignore', '_travis.yml'];
    if (this.props.umdBuild) {
      files.push('webpack.config.js');
    }

    var dirs = ['**/src/*', '**/test/*'];

    files.forEach(function (f) {
      var destFile = f[0] === '_' ? '.' + f.substring(1) : f;

      _this2.fs.copyTpl(_this2.templatePath(f), _this2.destinationPath(destFile), _this2.props);
    });

    dirs.forEach(function (d) {
      _this2.fs.copyTpl(_this2.templatePath(d), _this2.destinationPath(''), _this2.props);
    });

    this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json'), this.props);
  },
  install: function install() {
    this.log(this.props.libraryName);
    this.npmInstall();
  }
});
