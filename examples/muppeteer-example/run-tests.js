const server = require('./server.js');
const ConfigureLauncher = require('muppeteer');
const program = require('commander');

program
    .version('0.0.1')
    .option('-u, --unit', 'Run unit tests')
    .option('-e, --e2e', 'Run e2e tests')
    .parse(process.argv);

(async () => {
    const testType = program.unit ? 'unit' : 'e2e';

    const serverInstance = await server.start({
        port: 3000,
        testType
    });

    const testDir = testType === 'unit' ? 'tests/unit' : 'tests/e2e';

    await ConfigureLauncher({
        testDir,
        testFilter: 'test.js',
        reportDir: `${testDir}/report`,
        componentTestUrlFactory: () => `http://${server.IP}:3000`,
        visualThreshold: 0.05,
        useDocker: true,
        dockerChromeVersion: '65.0.3325.181',
        onFinish: () => server.stop(serverInstance)
    }).launch();
})();
