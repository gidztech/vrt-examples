const path = require('path');
const initExtensions = require('puppeteer-extensions');
const { setSnapshotDir } = require('../snapshot-settings');

const container = '.todoapp';
const input = 'header input';
const listItem = '.todo-list li';
const firstItem = `${listItem}:nth-of-type(1)`;
const firstItemToggle = `${firstItem} .toggle`;
const firstItemRemoveButton = `${firstItem} button`;
const secondItem = `${listItem}:nth-of-type(2)`;
const todoCount = '.todo-count';

describe('Add a todo item', () => {
    let page;
    let extensions;

    const visualCheck = async selector => {
        const element = await page.$(selector);
        const image = await element.screenshot();
        expect(image).toMatchImageSnapshot(
            setSnapshotDir(path.join(__dirname, 'snapshots'))
        );
    };

    beforeAll(async () => {
        page = await global.__BROWSER__.newPage();
        await page.goto('http://localhost:8080/');
        extensions = initExtensions(page);
        await extensions.turnOffAnimations();
    }, 5000);

    afterAll(async () => {
        await page.close();
    });

    it('typing text and hitting enter key adds new item', async () => {
        await page.waitForSelector(input);
        await page.type(input, 'My first item');
        await page.keyboard.press('Enter');
        await page.waitForSelector(firstItem);
        expect(await extensions.getText(firstItem)).toContain('My first item');
        await visualCheck(container);
    });
    it('clicking checkbox marks item as complete', async () => {
        await page.waitForSelector(firstItemToggle);
        await page.click(firstItemToggle);

        // something to break the tests
        // await page.addStyleTag({ content: '.header { padding-top: 50px; }' });

        await extensions.waitForNthSelectorAttributeValue(
            listItem,
            1,
            'class',
            'completed'
        );
        await visualCheck(container);
    });
    it('typing more text and hitting enter adds a second item', async () => {
        await page.type(input, 'My second item');
        await page.keyboard.press('Enter');
        await page.waitForSelector(secondItem);
        expect(await extensions.getText(secondItem)).toContain(
            'My second item'
        );
        visualCheck(container);
    });
    it('hovering over first item shows x button', async () => {
        await page.hover(firstItem);
        await visualCheck(container);
    });
    it('clicking on first item x button removes it from the list', async () => {
        await page.click(firstItemRemoveButton);
        await extensions.waitForElementCount(listItem, 1);
        expect(await extensions.getText(todoCount)).toContain('1 item left');
        await visualCheck(container);
    });
});
