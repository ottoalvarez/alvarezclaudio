import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import moment from "moment";

dotenv.config();

const server = express();
const port = (process.env.DEBUGGIN_MODE == 'active' ? process.env.SERVERPORT : process.env.LOCALPORT);

const accessLogs = fs.createWriteStream(
    path.join('./logs/', `request-${moment().format('MMMMYYYY')}.log`), { flags: 'a', interval: '1d' }
);

server.use(morgan('combined', { stream: accessLogs }));
server.get('/', (req, res) => {
    res.send('Hi');
})

server.listen(port, () => {
    console.log(`Express launched on port [${port}] `)
})