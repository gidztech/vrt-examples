const express = require('express');
const { setup: setupPuppeteer } = require('jest-puppeteer-docker');
const path = require('path');

module.exports = testType => async jestConfig => {
    const app = express();
    const directory = testType === 'component' ? 'dist' : 'app';
    app.use(express.static(path.join(__dirname, '../../', directory)));

    app.get('/', (req, res) => {
        res.sendFile('index.html');
    });

    global.__SERVER__ = app.listen(3000);

    await setupPuppeteer(jestConfig);
};
