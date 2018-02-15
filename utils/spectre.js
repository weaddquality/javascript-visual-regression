const spectreClient = require('spectre-client');
const fs = require('fs');
const conf = require('../conf');

exports.postScreenshots = async function(project, suite, fileName, size, fuzzLevel) {
  const client = await spectreClient(project, suite, conf.spectre.url);
  const screenShot = fs.createReadStream('screenshots/' + fileName + '.' + conf.spectre.imageFormat);
  const testOptions = {
    screenShot,
    name: fileName,
    browser: conf.puppeteer.browser,
    size: size,
    fuzzLevel: fuzzLevel,
  };
  return await client.submitTest(testOptions);
};
