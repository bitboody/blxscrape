import puppeteer from 'puppeteer-extra';
import anonimizeUa from 'puppeteer-extra-plugin-anonymize-ua';
import path from 'path';
import fsp from 'fs/promises';

async function scrape(url: string, user: string, password: string) {
  const jsonFile = await fsp.readFile('../json/data.json');
  const jsonText = await JSON.parse(jsonFile.toString());

  if (jsonFile.includes(url!) === true) {
    console.log('User already exists');
    return 0;
  }

  const browser = await puppeteer.use(anonimizeUa())
    .launch({
      headless: false,
      userDataDir: "../config/user_data"
    });
  const page = await browser.newPage();

  await page.goto('https://www.roblox.com');

  if (await page.evaluate(() => document.location.href) !== "https://www.roblox.com/home") {
    console.log('Account logged out, logging in...');
    await page.goto('https://roblox.com/login', {
      waitUntil: 'networkidle0'
    });
    await page.type('#login-username', user!);
    await page.type('#login-password', password!);

    await Promise.all([
      console.log(`Logging into ${process.env.USER}...`),
      page.click('#login-button'),
      page.waitForNavigation({
        waitUntil: 'networkidle0'
      })
    ]);
  }
  console.log('Logged in!');

  await page.goto(url!);

  // URL
  console.log('Fetching URL...');
  const userUrl = await page.evaluate(() => document.location.href);

  // username 
  console.log('Fetching username...');
  const [el1] = await page.$x('/html/body/div[3]/main/div[2]/div[2]/div/div[1]/div/div[2]/div[2]/div[1]/div[2]');
  const txt = await el1.getProperty('innerText');
  const username = await txt.jsonValue();

  // description
  console.log('Fetching description...');
  const [el2] = await page.$x('/html/body/div[3]/main/div[2]/div[2]/div/div[3]/div/div[1]/div[1]/div[2]/div/pre/span');
  let desc;
  if (!el2) {
    desc = '';
  } else {
    desc = await page.evaluate(el2 => el2.textContent, el2);
  }

  // profile picture 
  console.log('Fetching profile picture...');
  const [el3] = await page.$x('/html/body/div[3]/main/div[2]/div[2]/div/div[1]/div/div[2]/div[1]/span/thumbnail-2d/span/img');
  const src = await el3.getProperty('src');
  const pfpUrl = await src.jsonValue();

  const data = {
    userUrl,
    username,
    desc,
    pfpUrl
  };

  browser.close();

  console.log(data);

  if (Array.isArray(jsonText)) {
    jsonText.push(data) 
    await fsp.writeFile('../json/data.json', JSON.stringify(jsonText, null, 4));
    console.log('Written to data.json successfully.');
  } else {
    console.log('Error (failed to write to json): The data.json file has to contain an empty array.');
  }
}

export default scrape;
