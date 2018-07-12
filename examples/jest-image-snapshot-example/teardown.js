const { teardown: teardownPuppeteer } = require('jest-environment-puppeteer');

module.exports = async function globalTeardown() {
    global.__SERVER__.close();
    await teardownPuppeteer();
};
