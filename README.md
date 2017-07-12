# ISP reporter.
This repository will help report and track info relating to your ISP

## Prerequisites
* [Node.js](https://nodejs.org/en/) (Version 5 and up recommended)
* [CouchDB](https://couchdb.apache.org)
* [Python](https://www.python.org/downloads/) (I'm using 2.7.13)
* [SpeedTest-Cli](https://github.com/sivel/speedtest-cli) (`pip install speedtest-cli`)

### Installation

* Clone down the repository.
```
git clone https://github.com/cynical89/isp-reporter.git
```

* Install packages (from inside the koa-starer folder).
```
npm install
```

* Create your config.  There's a `config.json.example` file in the root.  Edit it to include all your values for the site and your OAuth information.  Save it as `config.json` and leave it in the root.

* Start it up.
```
npm start
```

* Enjoy!
