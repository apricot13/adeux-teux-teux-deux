const puppeteer = require("puppeteer")
const fs = require("fs")
const alfy = require('alfy');
const alfredNotifier = require("alfred-notifier")
require('dotenv').config()

alfredNotifier();


const url='https://teuxdeux.com/home';

(async() => {
    const browser = await puppeteer.launch({headless: true, userDataDir: './puppeteer_data' });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1280,
        height: 1024,
        deviceScaleFactor: 1,
    });
    await page.goto(url, {waitUntil: 'networkidle0'});
    alfy.log(`Navigated to ${page.url()}`);

    alfy.log(process.env.USERNAME)

    // Type our username and password
    await page.type('#login-username-input', process.env.USERNAME);
    await page.type('#login-password-input', process.env.PASSWORD);

    // Submit form
    await Promise.all([
        page.click('#login-submit'),
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);

    
    const cookies = await page.cookies()
    // alfy.log(cookies);

    fs.writeFile('session.json', JSON.stringify(cookies, null, 2), function(err) {
        if (err) throw err;
        alfy.log('completed write of cookies');
    });

    browser.close();

})();
