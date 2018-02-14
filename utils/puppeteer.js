const puppeteer = require('puppeteer');

exports.takeScreenshot = async function(url, elementSelector, screenshotName, viewportWidth, viewportHeight, mode) {
  const browser = await puppeteer.launch( { headless: mode } );
  const page = await browser.newPage();
  await page.setViewport({
    width: viewportWidth,
    height: viewportHeight
  });
  await page.goto(url, { waitUntil: 'networkidle2' });
  const footerlogo = await page.$(elementSelector);
  await footerlogo.screenshot({ path: 'screenshots/' + screenshotName + '.png' });
  await browser.close();
};
