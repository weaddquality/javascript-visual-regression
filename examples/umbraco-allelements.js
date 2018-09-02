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

describe('VRT Example - VingSE', function() {
  let run_id, spectre;
  let selector = '#bookingstart-horizontal';
  let page;

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

    spectre = new Spectre('https://spectre-umbautotest.herokuapp.com/');
    return spectre
      .startRun('UFO', this.test.parent.fullTitle())
      .then(function(id) {
        run_id = id;
      });
  });

  after(async function closeBrowserAndUploadToSpectre() {
    await browser.close();
    return spectre.uploadScreenshots();
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
