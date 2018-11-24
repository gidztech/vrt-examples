# Muppeteer example
[Muppeteer](https://github.com/HuddleEng/Muppeteer) is a visual regression testing framework I wrote after PhantomJS was discontinued and we needed modern headless
browser testing solutions, both for JavaScript and CSS features. 

You can read about the full details and API in the [project repository](https://github.com/HuddleEng/Muppeteer).

## Installation
Run `npm install` to install the required dev dependencies.

## Dependencies
[express](https://expressjs.com/) - Node web server for the example application\
[Muppeteer](https://github.com/HuddleEng/Muppeteer) - Visual regression testing framework for Chrome

## Run tests
`npm run test`

![Running tests](https://i.imgur.com/rAzZoGn.png "Running tests")

## How it works
We use Puppeteer to launch an instance of Chrome before running the tests. During each test, we connect to Chrome via a
WebSocket and then navigate to the URL of our application. We can then perform browser interactions and assertions.


In the test suite, we configure the Muppeteer launcher with the following options:

**Test directory** - directory path for the tests\
**Test filter** - filter for the tests (currently just a substring match)\
**Report directory** - directory path for the report that gets generated after tests run\
**Visual threshold** - percentage of visual failure that is acceptable\
**Docker flag** - whether we should run Chrome in a Docker container or not\
**Chrome version** - the version of Chrome to run on

In the tests, we can call `await assert.visual('some-dom-selector)`, which tells Chrome to take a screenshot of a DOM element, and then tells Muppeteer to compare it with a stored basline image.

The first time around, the image is created and it's up to you to version it as the baseline image in your app repository.
Subsequent test runs will do a pixel comparison with that baseline image, resulting in a pass or failed test. 

A temporary image outlining the differences is output on failed tests.

At the end of the test, we tell Chrome to close, and then after all tests are complete, we kill the local server.