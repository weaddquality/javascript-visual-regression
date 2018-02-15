const spectre = require('../utils/spectre');
const puppeteer = require('../utils/puppeteer');

describe('VRT Example with Puppeteer and Spectre', function() {
  it('should take a screenshot of the footer logo and post screenshots to spectre', async function() {
    await puppeteer.takeScreenshot('https://www.spotify.com/se/', '.footer-logo a', 'footerLogo', 1280, 1024, false);
    await spectre.postScreenshots('Spotify', 'Logo', 'footerLogo', '1280');
  });
});
