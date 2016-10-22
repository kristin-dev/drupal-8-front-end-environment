# Quick Start Notes

############## TESTED VERSION #######

node.js v5.0.0 (https://nodejs.org/en/download/releases/)
Add 'export PATH=./node_modules/.bin:$PATH' to you bash settings (.bash_profile etc)

#####################################


If you have Node.js installed, you can just run the following commands from this theme folder:
  npm install
  gulp

Then you're done!

If you need more information, please see detailed description below.

# Theme Summary

This theme includes Susy grids, Breakpoint, Live Reload, Compass, ES Lint, SCSS Lint, JS Uglify, and JS Concat.

# Required programs

Node.js is required. It's really easy to install:
"If you're using Mac or Windows, the best way to install Node.js is to use one of the installers from nodejs.org."
For more details, see https://docs.npmjs.com/getting-started/installing-node

# Installing Node.js dependencies

The first time you develop with the theme, install npm dependencies; from this theme folder, run:
  npm install
If that doesn't work and you get errors about permissions, you may have to run:
  sudo npm install

# Regular workflow

To compile and watch for changes, from this theme folder, run:
  gulp

# Note about Node.js module updates.

If any Node.js packages are deleted, make sure to run the following:
  npm prune
If any Node.js packages are added, deleted, or updated, make sure to run the following:
  npm shrinkwrap --dev
See https://www.npmjs.org/doc/cli/npm-shrinkwrap.html

# Configuration file descriptions

.gitignore
* Ignores the node_modules folder so it isn't committed to the git repo.

.eslintrc
* Configuration for ES Lint.
* "[ESLint's] goal is to provide a pluggable linting utility for JavaScript."

.scss-lint.yml
* Configuration for SCSS Lint.

gulpfile.js
* Configuration for Gulp (the task runner, built on node.js, that automates everything for SASS, JS, and stylyguide development in this theme.)

npm-shrinkwrap.json
* Used by NPM to keep track of which node modules are used for the theme.

package.json
* Keeps track of the Node.js packages

scss/_breakpoints-auto-generated.scss
* This is automatically generated from toweltheme.breakpoints.yml. See gulpfile.js

