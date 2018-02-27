const puppeteer = require('../utils/puppeteer');
const spectre = require('../utils/spectre');
const assert = require('assert');

let settings = {
  url: 'https://www.spotify.com/se/',
  element: '.footer-logo',  
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
    assert(result.pass, 'A differance above the set fuzzlevel ' + settings.fuzzLevel + ' has been detected');
  });
});
