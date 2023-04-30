# blxscrape
Roblox user profile scraper with Puppeteer js
<br>
<br>
<img src="https://img.shields.io/github/license/brplcc/blxscrape">
<img src="https://img.shields.io/github/last-commit/brplcc/blxscrape">
## Get started:

### Prerequisites:
- Node JS
- NPM
- TSC (Typescript compiler)

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

### Why?

This project was intended to be a part of a backend server used for verification and authentication of a user's ownership to his Roblox account.

### Why not just use the Roblox API?

That would be probably the better choice since it would be a lot more efficient. But the problem here is that you would need to be logged in through a session cookie, which would only be valid if it is running on the same IP address that it was taken from. That means you would need to have a static IP for this to work properly. That's where Blxscrape comes into play.

## How does it work?

It uses Puppeteer which is a bot controlled browser that does everything automatically. It logs into Roblox using the credentials you provide in the .env file. Then it goes to the URL of the user's profile that you've provided, and then it will fetch the username, description and the URL for the user's profile picture, if the user does not already exist, it will save the data to a JSON file. 

### Are you open to suggestions/bug reports?

Yes, if you do encounter a problem please report it.

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
