const server = require('./server.js');
const ConfigureLauncher = require('muppeteer');

(async () => {
    const serverInstance = await server.start(3000);

    await ConfigureLauncher({
        testDir: 'tests',
        testFilter: 'test.js',
        reportDir: 'tests/report',
        componentTestUrlFactory: () => {
            console.log(`http://${server.IP}:3000`);
            return `http://${server.IP}:3000`;
        },
        visualThreshold: 0.05,
        useDocker: true,
        dockerChromeVersion: '65.0.3325.181',
        onFinish: () => server.stop(serverInstance)
    }).launch();
})();
