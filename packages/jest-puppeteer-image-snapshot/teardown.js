const fs = require('fs');
const { teardown: teardownPuppeteer } = require('jest-puppeteer-docker');

module.exports = async function globalTeardown(jestConfig) {
    global.__SERVER__.close();
    await teardownPuppeteer(jestConfig);

    fs.copyFileSync(
        './inject-fail-images.js',
        './report/inject-fail-images.js'
    );
};
