const spectre = require('node-spectre');
const conf = require('../conf');

let client = new spectre(conf.spectre.url);

exports.postScreenshot = async function(settings) {
  client = await client(settings.projectName, settings.testSuite, conf.spectre.url);
  const testOptions = {
    screenShot: settings.snapshot,
    name: settings.testName,
    browser: conf.puppeteer.useChromeNotChromium ? 'chrome' : 'chromium',
    size: (settings.width + 'x' + settings.height).toString(),
    sourceUrl: settings.url,
    fuzz_level: settings.fuzzLevel
  };
  return await client.uploadScreenshot(testOptions);
};
