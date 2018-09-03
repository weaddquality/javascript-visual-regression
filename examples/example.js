const puppeteer = require('../utils/puppeteer');
const Spectre = require('node-spectre');

const settings = {
  url: 'https://www.ving.se/',
  hideElements: [],
  removeElements: [],
  testName: '',
  width: 1280,
  height: 1024,
  projectName: 'UFO',
  testSuite: 'Sanity',
  fuzzLevel: '2%'
};

describe('VRT Example', function() {
  let run_id, spectre;
  let selector = '#bookingstart-horizontal';
  let page;
  let failMessage = '';

  before(async function() {
    await puppeteer.launchBrowser();

    page = await browser.newPage();

    if (settings.width && settings.length) {
      await page.setViewport({
        width: settings.width,
        height: settings.height
      });
    } else {
      settings.width = await page.viewport().width;
      settings.height = await page.viewport().height;
    }

    await page.goto(settings.url, { waitUntil: 'networkidle2' });
    // TODO: Get spectre url from config
    spectre = new Spectre('https://spectre-umbautotest.herokuapp.com/');
    return spectre
      .startRun('UFO', this.test.parent.fullTitle())
      .then(function(id) {
        run_id = id;
      });
  });

  afterEach(async function closeBrowserAndUploadToSpectre() {
    await browser.close();
    let results = await spectre.uploadScreenshots();
    let failedTests = results.filter(function(result) {
      return result.body.pass === false;
    });
    if (failedTests.length > 0) {
      failedTests.forEach(function(failedTest) {
        let test = failedTest;
        failMessage += `     Name: ${test.body.name}\n     Diff: ${
          test.body.diff
        }\n\n`;
      });
      this.test.error(
        new Error(
          `One or many screenshots didn't pass Spectre validation.\n${failMessage}`
        )
      );
    }
  });

  it('should take a screenshot and queue to spectre', async function() {
    let screenshot = await puppeteer.takeScreenshot(selector, settings, page);
    await spectre.queueScreenshot(
      run_id,
      'test',
      'chrome',
      `${settings.width}x${settings.height}`,
      screenshot
    );
  });
});
