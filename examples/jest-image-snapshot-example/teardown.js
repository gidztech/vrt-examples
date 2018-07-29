const { teardown: teardownPuppeteer } = require('jest-puppeteer-docker');

module.exports = async function globalTeardown() {
    global.__SERVER__.close();
    await teardownPuppeteer();
};
