const testType = process.argv[2];

module.exports = {
    preset: 'jest-puppeteer-docker',
    setupTestFrameworkScriptFile: './setup-tests.js',
    globalSetup:
        testType === 'unit' ? './unit-test-setup.js' : './e2e-test-setup.js',
    globalTeardown: './teardown.js',
    reporters: [
        'default',
        [
            './node_modules/jest-html-reporter',
            {
                outputPath:
                    testType === 'unit'
                        ? './report/unit-summary.html'
                        : './report/e2e-summary.html',
                pageTitle:
                    testType === 'unit' ? 'Unit Tests' : 'End-to-end Tests',
                includeFailureMsg: true,
                customScriptPath: './inject-fail-images.js'
            }
        ]
    ]
};
