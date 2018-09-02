const spectreUrl = process.env.spectreUrl || 'http://localhost:3000';
let browser;

exports.puppeteer = {
  headless: false,
  useChromeNotChromium: false,
  chromePath: '/usr/bin/google-chrome'
};

exports.spectre = {
  url: spectreUrl,
  imageFormat: 'png'
};

global.browser = browser;