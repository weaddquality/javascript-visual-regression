const spectreUrl = process.env.spectreUrl || 'http://localhost:3000';

exports.puppeteer = {
  headless: true,
  useChromeNotChromium: false,
  chromePath: '/usr/bin/google-chrome'
};

exports.spectre = {
  url: spectreUrl,
  imageFormat: 'png'
};
