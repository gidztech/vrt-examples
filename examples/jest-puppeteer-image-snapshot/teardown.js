const fs = require('fs');
const { teardown: teardownPuppeteer } = require('jest-puppeteer-docker');

module.exports = async function globalTeardown() {
    global.__SERVER__.close();
    await teardownPuppeteer();

    fs.copyFileSync(
        './inject-fail-images.js',
        './report/inject-fail-images.js'
    );
};
