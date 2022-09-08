const puppeteer = require("puppeteer")
const fs = require("fs")
require('dotenv').config()

const url = 'https://teuxdeux.com/home';
const userDataDir = './../data/puppeteer_data';
const userSession = './../data/session.json';

(async() => {
    const browser = await puppeteer.launch({headless: true, userDataDir: userDataDir });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1280,
        height: 1024,
        deviceScaleFactor: 1,
    });
    await page.goto(url, {waitUntil: 'networkidle0'});
    console.log(`Navigated to ${page.url()}`);

    console.log(process.env.USERNAME)

    // Type our username and password
    await page.type('#login-username-input', process.env.USERNAME);
    await page.type('#login-password-input', process.env.PASSWORD);

    // Submit form
    await Promise.all([
        page.click('#login-submit'),
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);

    
    const cookies = await page.cookies()
    // console.log(cookies);

    fs.writeFile(userSession, JSON.stringify(cookies, null, 2), function(err) {
        if (err) throw err;
        console.log('completed write of cookies');
    });

    browser.close();

})();
