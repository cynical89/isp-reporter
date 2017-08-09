# Isp-reporter
A kit to check your isp speeds and report the data back to you.

## Prerequisites
* [Node.js](https://nodejs.org/en/) (Version 5 and up recommended)
* [Github Client ID and Secret](https://github.com/settings/developers) (for OAuth - Not currently required)
* [Redis](https://redis.io/) (for session storage)
* [CoucDB](http://couchdb.apache.org/) (for database)
* [Python](https://www.python.org/downloads/) (I'm using 2.7.13)
* [SpeedTest-Cli](https://github.com/sivel/speedtest-cli) (`pip install speedtest-cli`)

### Installation

* Clone down the repository.
```
git clone https://github.com/cynical89/isp-reporter.git
```

* Install packages (from inside the koa-starter folder).
```
npm install
```

* Create your config.  There's a `config.json.example` file in the root.  Edit it to include all your values for the site and your OAuth information.  Save it as `config.json` and leave it in the root.

* If you want to use Google Analytics, set `config.site.analytics` to your Tracking ID and make sure the analytics partial (analytics.hbs) contains the correct Universal Analytics tracking code.  If you don't want to use Google Analytics, remove that property or set it to false. Being that this is mostly for showing reports you probably don't need this.

* Start it up.
```
npm start
```

* Enjoy!

### Speed testing

* The speed tests are currently set to only run in prod. This is to keep it running while you are trying to develop. If you wish to run the tests, you can run them separately with `npm run speed-test` to log the results, or `speedtest` to run without logging results.

* Run the production server which serves the reports and does testing.
```
npm run prod
```

* Enjoy
