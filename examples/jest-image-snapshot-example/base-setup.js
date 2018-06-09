const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const mkdirp = require('mkdirp');

const mkdirIfRequired = async dir => {
    console.log(dir);
    if (!(await promisify(fs.exists)(dir))) {
        await mkdirp(dir);
    }
    return dir;
};

module.exports = testType => async () => {
    const app = express();
    const directory = testType === 'unit' ? 'dist' : 'app';
    app.use(express.static(path.join(__dirname, '../../', directory)));

    app.get('/', (req, res) => {
        res.sendFile('index.html');
    });

    global.__SERVER__ = app.listen(3000);

    const browser = await puppeteer.launch({});
    global.__PUPPETEER__ = puppeteer;
    global.__BROWSER__ = browser;

    const tmpDir = path.join(__dirname, 'tmp');
    await mkdirIfRequired(tmpDir);

    fs.writeFileSync(
        path.join(tmpDir, 'puppeteerEndpoint'),
        browser.wsEndpoint()
    );
};
