const puppeteer = require('puppeteer');
const fs = require('fs');
const compareImages = require('resemblejs/compareImages');
const assert = require('assert');


// TODO: 
// - Refactor to increase reusability and maintainability.
describe('VRT Example with Puppeteer and Resemble.js', function() {
  describe('Spotify Footer Logo', function() {
    // this.title is: 'Spotify Footer Logo'
    const baselinePath = './screenshots/baseline/' + this.title + '.png';
    const comparisonPath = './screenshots/comparison/' + this.title + '.png';
    const diffPath = './screenshots/diff/' + this.title + '.png';
    let browser;
    let page;
    
    // resemblejs options - used when comparing images
    const options = {
      output: {
        errorColor: {
          red: 255,
          green: 0,
          blue: 255
        },
        errorType: 'movement',
        transparency: 0.3,
        largeImageThreshold: 1200,
        useCrossOrigin: false,
        outputDiff: true
      },
      scaleToSameSize: true,
      // Below ('ignore' property) is commented out, because it doesn't seem to work. Not sure why yet.
      // ignore: ['nothing', 'less', 'antialiasing', 'colors', 'alpha'],
    };
    
    before('start browser and generate baseline image if it doesn\'t exist', async function() {
      browser = await puppeteer.launch( { headless: false } );
      page = await browser.newPage();
      await page.setViewport({
        width: 1280,
        height: 1024
      });
      await page.goto('https://www.spotify.com/se/', { waitUntil: 'networkidle2' });
      // If the baseline image is not found, then we assume that this is the very first test run.
      // This means that we create a new baseline image.
      if(!fs.existsSync(baselinePath)) {
        const footerlogo = await page.$('.footer-logo a');
        await footerlogo.screenshot({ path: baselinePath });
      }
    });
    
    it('should take a comparison image', async function() {
      const footerlogo = await page.$('.footer-logo a');
      await footerlogo.screenshot({ path: comparisonPath });
    });
    
    it('should not have any mismatch between baseline and comparison images', async function () {
      const baseline = 'data:image/jpeg;base64,' + fs.readFileSync(baselinePath, 'base64');
      const comparison = 'data:image/jpeg;base64,' + fs.readFileSync(comparisonPath, 'base64');
      const compareImagesResults = await compareImages(
        baseline,
        comparison,
        options,
      );
       
      if(compareImagesResults.misMatchPercentage > 0) {
        await fs.writeFile(diffPath, compareImagesResults.getBuffer());
        assert.fail('The images don\'t match. Mismatch percentage was: ' + compareImagesResults.misMatchPercentage);
      }
    });
    
    it('should take a bogus image for demonstrating diff image and mismatch values', async function() {
      const headerlogo = await page.$('.navbar-logo');
      await headerlogo.screenshot({ path: './screenshots/comparison/bogusImage.png' });
    });
    
    it('should report a mismatch value and create diff image when comparison mismatches', async function () {
      // I'm forcing a mismatch here, by comparing the footer logo with the header logo
      const baseline = 'data:image/jpeg;base64,' + fs.readFileSync(baselinePath, 'base64');
      const bogusImage = 'data:image/jpeg;base64,' + fs.readFileSync('./screenshots/comparison/bogusImage.png', 'base64');
      
      const compareImagesResults = await compareImages(
        baseline,
        bogusImage,
        options,
      );
      
      const misMatchDetected = compareImagesResults.misMatchPercentage > 0 ? true : false;
      
      if(misMatchDetected) {
        await fs.writeFile('./screenshots/diff/bogusImage.png', compareImagesResults.getBuffer());
      }
      
      assert.equal(misMatchDetected, true, 'The images match. This is incorrect, because we\'re trying to force an error. ' + 
      compareImagesResults.misMatchPercentage);
    });
    
    after('close the browser', async function() {
      await browser.close();
    });
  });
});
