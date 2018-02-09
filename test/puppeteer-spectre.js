const spectreClient = require('spectre-client');
const puppeteer = require('puppeteer');
const fs = require('fs');

describe('Spotify Footer Logo', function() {
  let client;
  before('setup spectre', function() {
    client = spectreClient('Spotify', 'Logo', 'http://localhost:3000');
  });

  it('should take a screenshot of the footer logo and save to disk', async function() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({
      width: 1280,
      height: 1024
    });
    await page.goto('https://www.spotify.com/se/', { waitUntil: 'networkidle2' });
    const footerlogo = await page.$('.footer-logo a');
    await footerlogo.screenshot({ path: 'screenshots/footerLogoWithMocha.png' });
    await browser.close();

    const screenShot = fs.createReadStream('screenshots/footerLogoWithMocha.png');
    const testOptions = {
      screenShot,
      name: 'footerLogoWithMocha',
      browser: 'chromium',
      size: '1280',
    };
    client.then((resolvedClient) => resolvedClient.submitTest(testOptions));
  });
});
