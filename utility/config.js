let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  // AWS Lambda Environment
  const chrome = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-core");

  module.exports = async () => {
    return puppeteer.launch({
      args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    });
  };
} else {
  // Local Development
  puppeteer = require("puppeteer");

  module.exports = async () => {
    return puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true,
    });
  };
}
