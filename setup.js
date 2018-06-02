const { promisify } = require('util');
const extract = promisify(require('extract-zip'));
const path = require('path');
require('colors');

const file = 'app.zip';
const source = path.join(__dirname, file);

(async () => {
    const extractErrors = await extract(source, { dir: `${__dirname}/app` });

    if (!extractErrors) {
        console.log(`Post-setup script complete`.green);
    } else {
        throw Error(`Unable to extract ${file}`.red);
    }
})();
