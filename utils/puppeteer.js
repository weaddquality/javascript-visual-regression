const puppeteer = require('puppeteer');

exports.takeScreenshot = async function(settings) {
  const browser = await puppeteer.launch( { headless: settings.headless } );
  const page = await browser.newPage();
  await page.setViewport({
    width: settings.width,
    height: settings.height
  });
  await page.goto(settings.url, { waitUntil: 'networkidle2' });
  const element = await page.$(settings.element);
  await element.screenshot({ path: 'screenshots/' + settings.imageName + '-' + settings.timestamp + '.png' });
  await browser.close();
};
