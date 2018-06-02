const { configureToMatchImageSnapshot } = require('jest-image-snapshot');

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThreshold: '0.01',
    failureThresholdType: 'percent'
});

expect.extend({ toMatchImageSnapshot });

module.exports = {
    // this is a temp hack until it's possible to globally set the snapshots directory, not just per test
    setSnapshotDir: dir => ({
        customSnapshotsDir: dir
    })
};
