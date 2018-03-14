# javascript-visual-regression ![Build Status](https://travis-ci.org/weaddquality/javascript-visual-regression.png?branch=master)
Visual Regression Testing with puppeteer and spectre

## Installation & setup

### Prerequisites
you need nodejs, git, docker and docker-compose installed

### Install spectre
`git clone https://github.com/wearefriday/spectre.git`

`docker-compose run --rm app bundle exec rake db:setup`

`docker-compose up`

### Install this repository
`git clone https://github.com/weaddquality/javascript-visual-regression.git`

`npm install`

## Run tests
`npm test` for all tests

`npm test ./examples/<testfile>` for a specific test

## Run tests with jenkins
you need jenkins installed with pipeline plugins

fork this repository

setup a deploykey on your github-repository

add credentials in jenkins with that deploykey

create a pipeline-job in jenkins

click the`Pipeline`-tab and on `Definition` choose `Pipeline script from SCM`

add your repository and credentials with the deploykey

save and run your pipeline!

## Brief plan / TODO
### Generate Screenshots
- [x] puppeteer

### Compare Images (alternatives to look into)
- [x] resemblejs (see branch)
- [ ] pixelmatch
- [x] spectre

### Visualize Results (test report/administration)
- [x] spectre 

### Build
- [x] jenkins
- [x] jenkinsfile
- [x] travisci

### Packaging
- [ ] ansible
- [ ] docker

### Misc.
- [x] eslint
- [ ] gulp
