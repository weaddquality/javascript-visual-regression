const spectreClient = require('spectre-client');
const fs = require('fs');
const assert = require('assert');

// TODO: break out assert to the testfile
exports.postScreenshots = function(project, suite, fileName, browser, size) {
  let client = spectreClient(project, suite, 'http://localhost:3000');
  const screenShot = fs.createReadStream('screenshots/' + fileName +'.png');
  const testOptions = {
    screenShot,
    name: fileName,
    browser: browser,
    size: size,
  };
  client.then((resolvedClient) => resolvedClient.submitTest(testOptions))
    .then((response) => assert.equal(response.pass, true, 'A diff between the screenshots has been detected'));
};
