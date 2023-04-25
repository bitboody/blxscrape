import { scrape } from './scrape';
const prompt = require('prompt-sync')();

const url: string = prompt('URL of profile: ');

scrape(url, process.env.USER, process.env.PASS);
