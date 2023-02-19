import express from "express";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import moment from "moment";

const server = express();
const port = 3000

const accessLogs = fs.createWriteStream(path.join('./logs/', `request-${moment().format('MMMMYYYY')}.log`), { flags: 'a', interval: '1d' });
server.use(morgan('combined', { stream: accessLogs }));

server.get('/', (req, res) => {
    console.log("aicommits")
    res.send('Hi');
})

server.listen(port, () => {
    console.log("first")
})