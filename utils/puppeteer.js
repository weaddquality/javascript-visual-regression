const puppeteer = require('puppeteer');
const conf = require('../conf');
const elements = require('./elements');

exports.launchBrowser = async function() {
  if (conf.puppeteer.useChromeNotChromium === true) {
    browser = await puppeteer.launch( { headless: conf.puppeteer.headless, executablePath: conf.puppeteer.chromePath } );
  } else {
    browser = await puppeteer.launch( { headless: conf.puppeteer.headless } );
  }
};

exports.takeScreenshot = async function(selector, settings, page) {

  if (!(settings.hideElements === undefined) && !(settings.hideElements.length === 0)) {
    await elements.hide(settings, page);
  }

  if (!(settings.removeElements === undefined) && !(settings.removeElements.length === 0)) {
    await elements.remove(settings, page);
  }

  const element = await page.$(selector);
  return await element.screenshot();
};
