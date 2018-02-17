const spectre = require('../utils/spectre');
const puppeteer = require('../utils/puppeteer');
const date = require('../utils/timestamp');
const assert = require('assert');

let settings = {
  url: 'https://www.spotify.com/se/',
  element: '.footer-logo a',
  imageName: 'footerLogo',
  width: 1280,
  height: 1024,
  headless: true,
  project: 'Spotify',
  suite: 'Logo',
  fuzzLevel: '0',
  timestamp: date.getTimestamp()
};

describe('VRT Example with Puppeteer and Spectre', function() {
  it('should take a screenshot of the footer logo and post screenshots to spectre', async function() {
    await puppeteer.takeScreenshot(settings);
    const result = await spectre.postScreenshots(settings);
    assert(result.pass, 'A diff between the screenshots has been detected');
  });
});
