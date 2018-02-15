const spectre = require('../utils/spectre');
const puppeteer = require('../utils/puppeteer');
const assert = require('assert');

describe('VRT Example with Puppeteer and Spectre', function() {
  it('should take a screenshot of the footer logo and post screenshots to spectre', async function() {
    await puppeteer.takeScreenshot('https://www.spotify.com/se/', '.footer-logo a', 'footerLogo', 1280, 1024, true);
    const result = await spectre.postScreenshots('Spotify', 'Logo', 'footerLogo', '1280', '0');
    assert(result.pass, 'A diff between the screenshots has been detected');
  });
});
