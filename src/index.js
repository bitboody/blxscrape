const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrape(url, username, password) {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto('https://roblox.com/login', { waitUntil: 'networkidle0' });
  await page.type('#login-username', username);
  await page.type('#login-password', password);

  await Promise.all([
    console.log('Logging in...'),
    page.click('#login-button'),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ]);
  console.log('Logged in!')

  await page.goto(url);


  // username 
  await console.log('Fetching username...');
  const [el] = await page.$x('/html/body/div[3]/main/div[2]/div[2]/div/div[1]/div/div[2]/div[2]/div[1]/div[2]');
  let txt = await el.getProperty('textContent');
  const usernameTxt = await txt.jsonValue();

  // desc
  await console.log('Fetching description...');
  const [el2] = await page.$x('/html/body/div[3]/main/div[2]/div[2]/div/div[3]/div/div[1]/div[1]/div[2]/div/pre/span');
  txt = await el2.getProperty('innerText');
  const descTxt = await el2.jsonValue();


  // profile picture 
  await console.log('Fetching profile picture...');
  const [el3] = await page.$x('/html/body/div[3]/main/div[2]/div[2]/div/div[1]/div/div[2]/div[1]/span/thumbnail-2d/span/img');
  const src = await el3.getProperty('src');
  const pfpUrl = await src.jsonValue();

  const data = {usernameTxt, pfpUrl, descTxt};

  console.log(data);

  browser.close();
}

scrape('https://www.roblox.com/users/64004875/profile', 'gl0ck11', '12341234islam');
