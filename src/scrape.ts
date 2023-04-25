const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const AnonimizeUa = require('puppeteer-extra-plugin-anonymize-ua');
const path = require('path');
require('dotenv').config({ path: '../config/.env' });

export async function scrape(url?: string, username?: string, password?: string) {
  const browser = await puppeteer.use(StealthPlugin(), AnonimizeUa())
    .launch({ headless: false, userDataDir: "./user_data" });
  const page = await browser.newPage();
  
  await page.goto('https://www.roblox.com');

  if (await page.evaluate(() => document.location.href) !== "https://www.roblox.com/home") {
    console.log('Account logged out, logging in...');
    await page.goto('https://roblox.com/login', { waitUntil: 'networkidle0' });
    await page.type('#login-username', username);
    await page.type('#login-password', password);

    await Promise.all([
      console.log(`Logging into ${process.env.USER}...`),
      page.click('#login-button'),
      page.waitForNavigation({ waitUntil: 'networkidle0' })
    ]);
    console.log('Logged in!');
  }

  await page.goto(url);

  // username 
  console.log('Fetching username...');
  await page.waitForSelector('.profile-display-name');
  const [el]: any = await page.$x('/html/body/div[3]/main/div[2]/div[2]/div/div[1]/div/div[2]/div[2]/div[1]/div[2]');
  let txt: any = await el.getProperty('textContent');
  const usernameTxt: string = await txt.jsonValue();

  // desc
  console.log('Fetching description...');
  const [el2]: any = await page.$x('/html/body/div[3]/main/div[2]/div[2]/div/div[3]/div/div[1]/div[1]/div[2]/div/pre/span');
  const descTxt: string = await page.evaluate((el2: any) => el2.textContent, el2);

  // profile picture 
  console.log('Fetching profile picture...');
  const [el3]: any = await page.$x('/html/body/div[3]/main/div[2]/div[2]/div/div[1]/div/div[2]/div[1]/span/thumbnail-2d/span/img');
  const src: any = await el3.getProperty('src');
  const pfpUrl: string = await src.jsonValue();

  const data: object = {usernameTxt, descTxt, pfpUrl};

  console.log(data);

  browser.close();
}

// scrape('https://www.roblox.com/users/64004875/profile', process.env.USER, process.env.PASS);
