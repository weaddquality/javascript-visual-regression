const spectreClient = require('spectre-client');
const conf = require('../conf');

exports.postScreenshot = async function(settings) {
  const client = await spectreClient(settings.projectName, settings.testSuite, conf.spectre.url);
  const testOptions = {
    screenShot: settings.snapshot,
    name: settings.testName,
    browser: conf.puppeteer.useChromeNotChromium ? 'chrome' : 'chromium',
    size: (settings.width + 'x' + settings.height).toString(),
    sourceUrl: settings.url,
    fuzz_level: settings.fuzzLevel
  };
  return await client.submitTest(testOptions);
};
