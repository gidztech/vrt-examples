const express = require('express');
const path = require('path');
const { networkInterfaces } = require('os');

const app = express();

app.use(express.static(path.join(__dirname, '../../', 'app')));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

module.exports = {
    start: port =>
        new Promise(resolve => {
            const server = app.listen(port, () => {
                console.log(`Test server started on port ${port}`);
                resolve(server);
            });
        }),
    stop: server => {
        server.close();
        console.log('Test server stopped');
    },
    IP: []
        .concat(...Object.values(networkInterfaces()))
        .filter(details => details.family === 'IPv4' && !details.internal)
        .pop().address
};
