const initExtensions = require('puppeteer-extensions');
const { configureToMatchImageSnapshot } = require('jest-image-snapshot');

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThreshold: '0.01',
    failureThresholdType: 'percent'
});

expect.extend({ toMatchImageSnapshot });

module.exports = {
    initPage: async page => {
        await page.goto('http://localhost:3000/');
        const extensions = initExtensions(page);
        await extensions.turnOffAnimations();
        return { page, extensions };
    },
    setSnapshotDir: dir => ({
        customSnapshotsDir: dir
    })
};
