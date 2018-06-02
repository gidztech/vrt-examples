const fs = require('fs');
const path = require('path');
const JestNodeEnvironment = require('jest-environment-node');
const puppeteer = require('puppeteer');

class TestEnvironment extends JestNodeEnvironment {
    async setup() {
        await super.setup();

        const wsEndpoint = fs.readFileSync(
            path.join(__dirname, 'tmp', 'puppeteerEndpoint'),
            'utf8'
        );

        if (!wsEndpoint) {
            throw new Error('wsEndpoint not found');
        }

        this.global.__BROWSER__ = await puppeteer.connect({
            browserWSEndpoint: wsEndpoint
        });
    }

    async teardown() {
        await super.teardown();
    }

    runScript(script) {
        return super.runScript(script);
    }
}

module.exports = TestEnvironment;
