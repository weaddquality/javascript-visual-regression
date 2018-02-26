const spectreClient = require('spectre-client');
const fs = require('fs');
const conf = require('../conf');

exports.postScreenshot = async function(settings) {
  const client = await spectreClient(settings.project, settings.suite, conf.spectre.url);
  let screenShot = '';
  if (conf.puppeteer.writeScreenshotToDisk) {
    screenShot = fs.createReadStream('screenshots/' + settings.imageName + '_' + settings.timestamp + '.' + conf.spectre.imageFormat);
  } else { screenShot = settings.snapshot; }
  const testOptions = {
    screenShot,
    name: settings.imageName,
    browser: conf.puppeteer.useChromeNotChromium ? 'chrome' : 'chromium',
    size: settings.width.toString(),
    sourceUrl: settings.url,
    fuzzLevel: settings.fuzzLevel
  };
  return await client.submitTest(testOptions);
};
