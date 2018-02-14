const puppeteer = require('puppeteer');
const spectre = require('../utils/spectre');

describe('VRT Example with Puppeteer and Spectre', function() {
  it('should take a screenshot of the footer logo and submit test to spectre', async function() {
    const browser = await puppeteer.launch( { headless: false } );
    const page = await browser.newPage();
    await page.setViewport({
      width: 1280,
      height: 1024
    });
    await page.goto('https://www.spotify.com/se/', { waitUntil: 'networkidle2' });
    const footerlogo = await page.$('.footer-logo a');
    await footerlogo.screenshot({ path: 'screenshots/footerLogoWithMocha.png' });
    await browser.close();

    spectre.postScreenshots('Spotify', 'Logo', 'footerLogoWithMocha',test '1280');
  });
});
