const express = require('express');
const path = require('path');
const { networkInterfaces } = require('os');

module.exports = {
    start: ({ port = 3000, testType = 'component' } = {}) => {
        const app = express();

        const directory = testType === 'component' ? 'dist' : 'app';

        app.use(express.static(path.join(__dirname, '../../', directory)));

        app.get('/', (req, res) => {
            res.sendFile('index.html');
        });

        return new Promise(resolve => {
            const server = app.listen(port, () => {
                console.log(`Test server started on port ${port}`);
                resolve(server);
            });
        });
    },
    stop: server => {
        server.close();
        console.log('Test server stopped');
    },
    IP: []
        .concat(...Object.values(networkInterfaces()))
        .filter(details => details.family === 'IPv4' && !details.internal)
        .pop().address
};
