const path = require('path');
const initExtensions = require('puppeteer-extensions');
const { configureToMatchImageSnapshot } = require('jest-image-snapshot');

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThreshold: '0.01',
    failureThresholdType: 'percent'
});

expect.extend({ toMatchImageSnapshot });

const createVisualCheckFn = dir => {
    return async function(selector) {
        const element = await page.$(selector);
        const image = await element.screenshot();
        expect(image).toMatchImageSnapshot(
            // this is a temp hack until it's possible to globally set the snapshots directory, not just per test
            { customSnapshotsDir: path.join(dir, 'screenshots') }
        );
    };
};

module.exports = async (dir, page) => {
    await page.goto('http://docker.for.mac.host.internal:3000');
    const extensions = initExtensions(page);
    await extensions.turnOffAnimations();
    const visualCheck = createVisualCheckFn(dir);
    return { page, extensions, visualCheck };
};
