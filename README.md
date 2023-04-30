# blxscrape
Roblox user profile scraper with Puppeteer js
<br>
<br>
<img src="https://img.shields.io/github/license/brplcc/blxscrape">
<img src="https://img.shields.io/github/last-commit/brplcc/blxscrape">
### Get started:

```bash 
npm install
npm run build
```
Also make sure that those files exist:
- config/.env
- JSON/data.json

use the example files included for reference.

---------------
### FAQ:

#### Why?

This project was intended to be a part of a backend server used for verification and authentication of a user's ownership to his Roblox account.

#### Why not just use the Roblox API?

That would be probably the better choice since it would be a lot more efficient. But the problem here is that you would need to be logged in through a session cookie, which would only be valid if it is running on the same IP address that it was taken from. That means you would need to have a static IP for this to work properly. That's where Blxscrape comes into play. It uses Puppeteer which is a bot controlled Chromium browser that will re-login in case the account is logged out. It will also save the login information so that it doesn't need to login each time and invoke a captcha.

#### Are you open to suggestions/bug reports?

Yes, if you do encounter a problem please do report it.

#### Is anyone actually asking those questions?

No. At least not yet lol.

---------------
### Roadmap:

- [X] Migrate to Typescript
- [X] Fetch user description
- [X] Add dotenv file
- [X] Avoid captcha by staying logged in
- [X] Get URL from user input
- [X] Save to JSON file
