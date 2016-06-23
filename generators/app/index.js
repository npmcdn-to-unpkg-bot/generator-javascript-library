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
      default: path.basename(process.cwd())
    }, {
      type: 'input',
      name: 'libraryDesc',
      message: 'Write a short description for your library.',
      default: ''
    }, {
      type: 'input',
      name: 'githubUsername',
      message: 'What is your github username (or organisation)?',
      default: ''
    }, {
      type: 'input',
      name: 'libraryAuthor',
      message: 'Who\'s the author of the library?',
      default: answers => answers.githubUsername
    }, {
      type: 'input',
      name: 'license',
      message: 'Which license do you want for your library?',
      default: 'MIT'
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
  },
  writing: function () {
    this.fs.copyTpl(
      this.templatePath('**/*'),
      this.destinationPath(''),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('**/.*'),
      this.destinationPath(''),
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
