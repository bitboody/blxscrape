<div align="center">
<h1>Blxscrape</h1>
Roblox user profile scraper with Puppeteer
<br>
<br>
<img src="https://img.shields.io/github/license/brplcc/blxscrape">
<img src="https://img.shields.io/github/last-commit/brplcc/blxscrape">
<img src="https://img.shields.io/github/languages/top/brplcc/blxscrape">
<br>
</div>

<div align="center">
<a href="#prerequisites">Prerequisites</a> •
<a href="#getting-started">Getting started</a> •
<a href="#faq">FAQ</a> •
<a href="#roadmap">roadmap</a>
</div>


## Prerequisites:
- <a href="https://nodejs.org/en/download">Node</a>
- <a href="https://www.npmjs.com/package/typescript">Typescript</a>

---------------
## Getting started:

```bash 
git clone https://github.com/brplcc/blxscrape.git
cd blxscrape
npm install
npm run build
```
Also make sure that those files exist:
- config/.env
- JSON/data.json

use the example files included for reference.

---------------
## FAQ:

#### Why?

This project was intended to be a part of a backend server used for verification and authentication of a user's ownership to his Roblox account.

#### Why not just use the Roblox API?

That would be probably the better choice since it would be a lot more efficient. But the problem here is that if you wanted to operate properly using the Roblox API, which could be a hassle since you will need to rent a VPS. That's where Blxscrape comes into play.

#### How does it work?

It uses Puppeteer which is a bot controlled browser that does everything automatically. It logs into Roblox using the credentials you provide in the .env file. Then it goes to the URL of the user's profile that you've provided, and then it will fetch the username, description and the user's profile picture URL, if the user does not already exist, it will save the data to a JSON file.

#### Are you open to suggestions/bug reports?

Yes, if you have any suggestions or if you encountered any bugs, please do not hesitate to repot them.

### Is anyone actually asking those questions?

No. At least not yet lol.

---------------
### Roadmap:

- [X] Migrate to Typescript
- [X] Fetch user description
- [X] Add dotenv file
- [X] Avoid captcha by staying logged in
- [X] Get URL from user input
- [X] Save to JSON file
