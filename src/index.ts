import { scrape } from './scrape';
import prompt from 'prompt-sync';
const input = prompt();

const url: string = input('URL of profile: ');

if (!url.includes('roblox.com' && 'users' && 'profile')) {
  console.log('Error: Invalid URL. Please enter a valid Roblox user URL.');
} else {
  scrape(url, process.env.USER, process.env.PASS);
}

