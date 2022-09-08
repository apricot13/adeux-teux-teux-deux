const puppeteer = require("puppeteer")
const moment = require("moment")
const fs = require("fs")
const alfy = require('alfy');
const alfredNotifier = require("alfred-notifier")
require('dotenv').config()

alfredNotifier();

const taskText = alfy.input;
const showDate = false; //todo

(async () => {
    const cookiesString = fs.readFileSync('./session.json', 'utf8');
    // alfy.log("cookiesString are ", cookiesString);
    const cookies = JSON.parse(cookiesString);
    // alfy.log("cookies are ", cookies);

    process.on('unhandledRejection', (reason, p) => {
        console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
    });

    const browser = await puppeteer.launch({
        headless: true,
        userDataDir: './puppeteer_data'
    });


    const page = await browser.newPage();
    await page.setViewport({
        width: 1280,
        height: 1024,
        deviceScaleFactor: 1,
    });

    page.waitForNavigation({ waitUntil: 'networkidle0' })
    // console.info("setting cookies")
    await page.setCookie.apply(page, cookies);


    const url = 'https://teuxdeux.com/home';
    await page.goto(url, {waitUntil: 'networkidle0'});
    // console.info("url is ", url);

    if(showDate === 'true') {
      const date = moment().format("ddd Do MMM h:mma"); 
      task = `${taskText} *(${date})*`
    }
    else {
      task = taskText
    }


    await page.type('.todo--current .todo__body .todo__input', task);
    await page.keyboard.press("Enter");

    // const data = await page.evaluate(() => [...document.querySelectorAll('.todo--current .todo__body .todo__input')].map(i => alfy.log(i.outerHTML)));
    const data = await page.evaluate(() => [...document.querySelectorAll(".todo--current .todo__body .todo__list-item:not(.is-done):not(.is-editing) .todo-content__text")].pop().textContent);

    alfy.log(`Successfully added new todo "${task}"`)

    browser.close();

})();

