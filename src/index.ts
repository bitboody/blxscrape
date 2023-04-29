import scrape from './scrape';
import prompt from 'prompt-sync';
import dotenv from 'dotenv';
dotenv.config({
  path: '../config/.env'
});

const input = prompt();
const url: string = input('URL of profile: ');

if (typeof url !== 'string') {
  console.log('Error: Input has to be a string.');
} else if (!url.includes('roblox.com' && 'users' && 'profile')) {
  console.log('Error: Invalid URL. Please enter a valid Roblox user URL.');
} else if (process.env.USER === undefined || process.env.PASS === undefined) {
  console.log('Error: .env is empty. Please provide a username and a password.');
} else {
  scrape(url, process.env.USER!, process.env.PASS!);
}
