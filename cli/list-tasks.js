const puppeteer = require("puppeteer")
const moment = require("moment")
const fs = require("fs")
const Table = require('tty-table')
require('dotenv').config()
const url = 'https://teuxdeux.com/home';
const userDataDir = './../data/puppeteer_data';
const userSession = './../data/session.json';

// chalk docs https://github.com/chalk/chalk/tree/v4.1.2

(async () => {


    
    const cookiesString = fs.readFileSync(userSession, 'utf8');
    // console.log("cookiesString are ", cookiesString);
    const cookies = JSON.parse(cookiesString);
    // console.log("cookies are ", cookies);

    process.on('unhandledRejection', (reason, p) => {
        console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
    });

    const browser = await puppeteer.launch({
        headless: true,
        userDataDir: userDataDir
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

    await page.goto(url, {waitUntil: 'networkidle0'});
    // console.info("url is ", url);

    const data = await page.evaluate(() => [...document.querySelectorAll(".todo--current .todo__body .todo__list-item.draggable .todo-content__text")].map((i)=>i.textContent));

    
    const tasks = data.map((t,i) => ([t.trim()])); 
    const header = [
    {
      value: "task",
      color: "red",
      align: "left",
      width: 200,
    }];
    const options = {
      width: "80%"
    }
    const table = new Table(header, tasks, options);
    console.log(table.render());
    
    // console.log(`Successfully added new todo "${task}"`)

    browser.close();

})();

