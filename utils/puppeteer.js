const puppeteer = require('puppeteer');
const conf = require('../conf');
const elements = require('./elements');

exports.takeScreenshot = async function(settings) {
  let browser;
  if (conf.puppeteer.useChromeNotChromium === true) {
    browser = await puppeteer.launch( { headless: conf.puppeteer.headless, executablePath: conf.puppeteer.chromePath } );
  } else {
    browser = await puppeteer.launch( { headless: conf.puppeteer.headless } );
  }
  const page = await browser.newPage();

  if(settings.width && settings.length) {
    await page.setViewport({
      width: settings.width,
      height: settings.height
    });
  }
  else {
    settings.width = await page.viewport().width;
    settings.height = await page.viewport().height;
  }

  await page.goto(settings.url, { waitUntil: 'networkidle2' });

  if(elements.hide.length) {
    await elements.hide(settings, page);
  }

  if(elements.remove.length) {
    await elements.remove(settings, page);
  }

  const element = await page.$(settings.element);
  settings.snapshot = await element.screenshot();
  await browser.close();
};
