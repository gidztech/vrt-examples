const testType = process.argv[2];
const setupFile =
    testType === 'unit' ? './unit-test-setup.js' : './e2e-test-setup.js';

module.exports = {
    preset: 'jest-puppeteer',
    globalSetup: setupFile,
    globalTeardown: './teardown.js'
};
