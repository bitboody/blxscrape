import * as Scraper from './scrape';
const prompt = require('prompt-sync')();

const url: string = prompt('URL of profile: ');

Scraper.scrape(url, process.env.USER, process.env.PASS);
