const puppeteer = require('puppeteer');

describe('Spotify Footer Logo', function() {
  it('should take a screenshot of the footer logo and save to disk', async function() {
    const browser = await puppeteer.launch( { headless: false } );
    const page = await browser.newPage();
    await page.setViewport({
      width: 1280,
      height: 1024
    });
    await page.goto('https://www.spotify.com/se/', { waitUntil: 'networkidle2' });
    const footerlogo = await page.$('.footer-logo a');
    await footerlogo.screenshot({ path: 'screenshots/footerlogoWithMocha.png' });
    await browser.close();
  });
});
