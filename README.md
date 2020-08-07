# ChugMugs

An E-commerce website selling Mugs developed by Fullstack Academy senior students!

Frontend - React, Redux

Backend - Express, Sequelize, Postgres

Style - Bootstrap

Deployment - Heroku continuous deployment with Travis

### [Production Link](https://chugmugs.herokuapp.com/)

## Installation

```bash
git clone https://github.com/2004-team-gs-sakura/chugmugs.git
cd chugmugs
npm install
npm run seed
createdb graceshopper
npm run start-dev
````

Visit http://localhost:8080 to start shopping on a local server.

If you want to run the server and/or webpack separately, you can also npm run start-server and npm run build-client.

## Customize

* Create a file called secrets.js in the project root
* This file is listed in .gitignore, and will only be required in your development environment
* Its purpose is to attach the secret environment variables that you will use while developing
* It's very important that you not push it to Github! This information is private! Someone else may use your API keys.
* Example of secrets.js file:

```javascript
process.env.GOOGLE_CLIENT_ID = 'Your Google Client ID here'
process.env.GOOGLE_CLIENT_SECRET = 'Your Google Client Secret here'
process.env.GOOGLE_CALLBACK = '/auth/google/callback'
```

# Authors

* [Barish Poole](https://github.com/bpoole1989)
* [Angel Concepcion](https://github.com/Angel-gc)
* [Ian Gelfand](https://github.com/IanGelfand)
* [Vasyl Semak](https://github.com/vasylsemak)
