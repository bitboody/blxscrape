import { scrape } from './scrape';
import prompt from 'prompt-sync';
const input = prompt();

const url: string = input('URL of profile: ');

scrape(url, process.env.USER, process.env.PASS);
