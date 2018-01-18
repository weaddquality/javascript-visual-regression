const puppeteer = require('puppeteer');
  (async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({
      width: 1280,
      height: 1024
    });
    await page.goto('https://www.spotify.com/se/', { waitUntil: 'networkidle2' });
    const footerlogo = await page.$('.footer-logo a');
    await footerlogo.screenshot({ path: 'screenshots/footerlogoWithoutMocha.png' });
    await browser.close();
  })();
