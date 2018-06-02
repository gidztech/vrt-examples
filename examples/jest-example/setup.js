const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

module.exports = async () => {
    const app = express();
    app.use(express.static(path.join(__dirname, '../../', 'app')));

    app.get('/', (req, res) => {
        res.sendFile('index.html');
    });

    global.__SERVER__ = app.listen(8080);

    const browser = await puppeteer.launch({});
    global.__PUPPETEER__ = puppeteer;
    global.__BROWSER__ = browser;
    fs.writeFileSync(
        path.join(__dirname, 'tmp', 'puppeteerEndpoint'),
        browser.wsEndpoint()
    );
};
