const spectreClient = require('spectre-client');
const fs = require('fs');
const conf = require('../conf');

exports.postScreenshots = async function(settings) {
  const client = await spectreClient(settings.project, settings.suite, conf.spectre.url);
  const screenShot = fs.createReadStream('screenshots/' + settings.imageName + '-' + settings.timestamp + '.' + conf.spectre.imageFormat);
  const testOptions = {
    screenShot,
    name: settings.imageName,
    browser: conf.puppeteer.browser,
    size: settings.width.toString(),
    fuzzLevel: settings.fuzzLevel,
  };
  return await client.submitTest(testOptions);
};
