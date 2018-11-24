# jest-image-snapshot example

[American Express](https://www.americanexpress.com) developers created a [Jest](https://facebook.github.io/jest/) plugin to enable image comparison testing. There's no
dependency on a particular browser interaction library, but [Puppeteer](https://github.com/GoogleChrome/puppeteer) is an obvious choice. 


## Installation
Run `npm install` to install the required dev dependencies.

## Dependencies
[express](https://expressjs.com/) - Node web server for the example application\
[jest](https://facebook.github.io/jest/) - Test framework\
[jest-puppeteer-docker](https://github.com/gidztech/jest-puppeteer-docker) - Dockerized Puppeteer test environment for Jest \
[jest-image-snapshot](https://github.com/americanexpress/jest-image-snapshot) - Jest plugin for image comparisons\
[puppeteer](https://github.com/GoogleChrome/puppeteer) - Chrome interaction library\
[puppeteer-extensions](https://github.com/HuddleEng/puppeteer-extensions) - Puppeteer convienence functions

## Run tests
`npm run component-test` - Test a small panel presentational component\
`npm run e2e2-test` - Test an e2e TODO list application

![Running tests](https://i.imgur.com/LuJiz2g.png "Running tests")

## How it works
We use Puppeteer to launch an instance of Chrome before running the tests. During each test, we connect to Chrome via a
WebSocket, and then navigate to the URL of our application. We can then perform browser interactions and assertions. The browser
is hosted in a Docker container, which is all pre-configured, and prevents anti-aliasing and other environmental differences that would
otherwise cause problems for our tests.

In the test suite, we configure `jest-image-snapshot` to use a particular visual threshold and directory path for storing and 
comparing screenshots. We can tell Chrome to take a screenshot and then tell Jest to run the `expect(image).toMatchImageSnapshot()`
function, providing it the image buffer.

The first time around, the image is created and it's up to you to version it as the baseline image in your app repository.
Subsequent test runs will do a pixel comparison with that baseline image, resulting in a pass or failed test. 
A temporary image outlining the differences is output on failed tests.

At the end of the test, we tell Chrome to close, and then after all tests are complete, we kill the local server.