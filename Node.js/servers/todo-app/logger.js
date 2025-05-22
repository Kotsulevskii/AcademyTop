// logger.js
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'data', 'log.txt');

function log(action, detail = '') {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] ${action} ${detail}\n`;

    const stream = fs.createWriteStream(logFile, { flags: 'a', encoding: 'utf-8' });
    stream.write(entry);
    stream.end();
}
module.exports = { log };