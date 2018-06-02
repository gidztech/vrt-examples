const initExtensions = require('puppeteer-extensions');
const { configureToMatchImageSnapshot } = require('jest-image-snapshot');

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThreshold: '0.01',
    failureThresholdType: 'percent'
});

expect.extend({ toMatchImageSnapshot });

module.exports = {
    initPage: async browser => {
        const page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        const extensions = initExtensions(page);
        await extensions.turnOffAnimations();
        return { page, extensions };
    },
    teardownPage: async page => {
        await page.close();
    },
    setSnapshotDir: dir => ({
        customSnapshotsDir: dir
    })
};
