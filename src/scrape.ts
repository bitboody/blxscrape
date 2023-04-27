const puppeteer = require('puppeteer-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth');
const anonimizeUa = require('puppeteer-extra-plugin-anonymize-ua');
const path = require('path');
const fs = require('fs/promises');
require('dotenv').config({ path: '../config/.env' });

export async function scrape(url?: string, user?: string, password?: string) {
  const jsonFile = await fs.readFile('../json/data.json');
  const jsonText = await JSON.parse(jsonFile);

  if (jsonFile.includes(url) === true) {
    console.log('User already exists');
    return 0;
  }

  const browser = await puppeteer.use(stealthPlugin(), anonimizeUa())
    .launch({ headless: false, userDataDir: "../config/user_data" });
  const page = await browser.newPage();

  await page.goto('https://www.roblox.com');

  if (await page.evaluate(() => document.location.href) !== "https://www.roblox.com/home") {
    console.log('Account logged out, logging in...');
    await page.goto('https://roblox.com/login', { waitUntil: 'networkidle0' });
    await page.type('#login-username', user);
    await page.type('#login-password', password);

    await Promise.all([
      console.log(`Logging into ${process.env.USER}...`),
      page.click('#login-button'),
      page.waitForNavigation({ waitUntil: 'networkidle0' })
    ]);
  }
  console.log('Logged in!');

  await page.goto(url);

  // URL
  console.log('Fetching URL...');
  let userUrl: any = await page.evaluate(() => document.location.href);  

  // username 
  console.log('Fetching username...');
  const [el1]: any = await page.$x('/html/body/div[3]/main/div[2]/div[2]/div/div[1]/div/div[2]/div[2]/div[1]/div[2]');
  let txt: any = await el1.getProperty('textContent');
  let username: JSON = await txt.jsonValue();

  // desc
  console.log('Fetching description...');
  const [el2]: any = await page.$x('/html/body/div[3]/main/div[2]/div[2]/div/div[3]/div/div[1]/div[1]/div[2]/div/pre/span');
  let desc: string;
  if (el2 === undefined) {
    desc = '';
  } else {
    desc = await page.evaluate((el2: any) => el2.textContent, el2);
  }

  // profile picture 
  console.log('Fetching profile picture...');
  const [el3]: any = await page.$x('/html/body/div[3]/main/div[2]/div[2]/div/div[1]/div/div[2]/div[1]/span/thumbnail-2d/span/img');
  const src: any = await el3.getProperty('src');
  const pfpUrl: JSON = await src.jsonValue();

  const data: object = {userUrl, username, desc, pfpUrl};

  if (Array.isArray(jsonText)) jsonText.push(data);

  console.log(data);
  
  await fs.writeFile('../json/data.json', `${JSON.stringify(jsonText, null, 4)}`);

  browser.close();
}
