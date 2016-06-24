const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const path = require('path');
const mkdirp = require('mkdirp');
const camelcase = require('camelcase');

module.exports = yeoman.Base.extend({
  initializing: function () {
    this.props = {};
  },
  prompting: function () {
    // Have Yeoman greet the user.
    this.log('Welcome to the ' + chalk.blue('javascript-library') + ' generator!');

    var prompts = [{
      type: 'input',
      name: 'libraryName',
      message: 'What is the name of your library (your github repo should have the same name)?',
      default: path.basename(process.cwd()),
      required: true
    }, {
      type: 'input',
      name: 'libraryDesc',
      message: 'Write a short description for your library.'
    }, {
      type: 'input',
      name: 'githubUsername',
      message: 'What is your github username (or organisation)?',
      required: true
    }, {
      type: 'input',
      name: 'libraryAuthor',
      message: 'Who\'s the author of the library?',
      default: answers => answers.githubUsername
    }, {
      type: 'input',
      name: 'authorEmail',
      message: 'What\'s the author\'s email adress?'
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

    return this.prompt(prompts).then(answers => {
      Object.assign(this.props, answers, {
        githubSlug: `${answers.githubUsername}/${answers.libraryName}`,
        camelCaseLibraryName: camelcase(answers.libraryName)
      });
    });
  },
  default: function () {
    if (path.basename(this.destinationPath()) !== this.props.libraryName) {
      this.log(
        'Your generator must be inside a folder named ' + this.props.libraryName + '\n' +
        'I\'ll automatically create this folder.'
      );
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
  writing: function () {
    const files = [
      'README.md',
      '_babelrc',
      '_eslintrc',
      '_gitignore',
      '_npmignore',
      '_travis.yml'
    ];
    if (this.props.umdBuild) {
      files.push('webpack.config.js');
    }

    const dirs = [
      '**/src/*',
      '**/test/*'
    ];

    files.forEach(f => {
      const destFile = f[0] === '_' ?
        `.${f.substring(1)}` :
        f;

      this.fs.copyTpl(
        this.templatePath(f),
        this.destinationPath(destFile),
        this.props
      );
    });

    dirs.forEach(d => {
      this.fs.copyTpl(
        this.templatePath(d),
        this.destinationPath(''),
        this.props
      );
    });

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      this.props
    );
  },
  install: function () {
    this.log(this.props.libraryName);
    this.npmInstall();
  },
  end: function () {

  }
});
