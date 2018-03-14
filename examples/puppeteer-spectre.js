const puppeteer = require('../utils/puppeteer');
const spectre = require('../utils/spectre');
const asserts = require('../utils/asserts');

const settings = {
  url: 'https://www.spotify.com/se/',
  element: '.footer',
  hideElements: ['.footer-logo a', '.col-social .nav'],
  removeElements: ['nav:nth-child(1) > div:nth-child(2)'],
  testName: 'Footer logo',
  width: 1280,
  height: 1024,
  projectName: 'Spotify',
  testSuite: 'Logo',
  fuzzLevel: '2%'
};

describe('VRT Example with Puppeteer and Spectre', function() {
  it('should take a screenshot of the footer logo and post screenshots to spectre', async function() {
    await puppeteer.takeScreenshot(settings);
    const result = await spectre.postScreenshot(settings);
    await asserts.noDifferance(result, settings);
  });
});
