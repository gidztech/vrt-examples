const testType = process.argv[2];

module.exports = {
    preset: 'jest-puppeteer-docker',
    setupTestFrameworkScriptFile: './setup-tests.js',
    globalSetup:
        testType === 'component'
            ? './component-test-setup.js'
            : './e2e-test-setup.js',
    globalTeardown: './teardown.js',
    reporters: [
        'default',
        [
            '<rootDir>/../../node_modules/jest-html-reporter',
            {
                outputPath:
                    testType === 'component'
                        ? './report/component-summary.html'
                        : './report/e2e-summary.html',
                pageTitle:
                    testType === 'component'
                        ? 'Component Tests'
                        : 'End-to-end Tests',
                includeFailureMsg: true,
                customScriptPath: './inject-fail-images.js'
            }
        ]
    ]
};
