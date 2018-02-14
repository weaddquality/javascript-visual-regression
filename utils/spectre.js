const spectreClient = require('spectre-client');
const fs = require('fs');
const conf = require('../conf');
const assert = require('assert');

exports.postScreenshots = function(project, suite, fileName, size) {
  let client = spectreClient(project, suite, conf.spectre.url);
  const screenShot = fs.createReadStream('screenshots/' + fileName + '.' + conf.spectre.imageFormat);
  const testOptions = {
    screenShot,
    name: fileName,
    browser: conf.puppeteer.browser,
    size: size,
  };
  client.then((resolvedClient) => resolvedClient.submitTest(testOptions))
    .then((response) => assert.equal(response.pass, true, 'A diff between the screenshots has been detected'));
};
