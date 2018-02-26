const puppeteer = require('puppeteer');
const conf = require('../conf');
const cleaner = require('./cleaner');

exports.takeScreenshot = async function(settings) {
  let browser;
  if (conf.puppeteer.useChromeNotChromium === true) {
    browser = await puppeteer.launch( { headless: settings.headless, executablePath: conf.puppeteer.chromePath } );
  } else {
    browser = await puppeteer.launch( { headless: settings.headless } );
  }
  const page = await browser.newPage();
  await page.setViewport({
    width: settings.width,
    height: settings.height
  });
  await page.goto(settings.url, { waitUntil: 'networkidle2' });
  await cleaner.cleanFolder('screenshots');
  const element = await page.$(settings.element);
  if (conf.puppeteer.writeScreenshotToDisk === true) {
    await element.screenshot({ path: 'screenshots/' + settings.imageName + '_' + settings.timestamp + '.png' });
  } else if (conf.puppeteer.writeScreenshotToDisk === false) {
    settings.snapshot = await element.screenshot();
  }
  await browser.close();
};
