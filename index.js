import { dotenv, express, morgan, fs, path, moment, cors, expressjwt } from "./src/config/index.js";
import { corsDomains } from "./src/config/Cors.js";
import { exceptions } from "./src/routes/Exceptions.js";

dotenv.config();

// Init Server
const server = express();
const port = (process.env.DEBUGGIN_MODE == 'active' ? process.env.SERVERPORT : process.env.LOCALPORT);

// Security Configure
server.use(cors((req, callback) => {
    callback(null, { origin: (corsDomains.indexOf(req.header('Origin')) !== -1 ? true : false) });
}))

// Server Configure 
const accessLogs = fs.createWriteStream(
    path.join('./src/logs/', `request-${moment().format('MMMMYYYY')}.log`), { flags: 'a', interval: '1d' }
);
server.use(morgan('combined', { stream: accessLogs }));
server.use(express.urlencoded({ extended: true }))

// Deploy server
const RoutePath = path.join(path.resolve(), './src/routes');

fs.readdirSync(RoutePath).forEach(async(routeFile) => {
    const file = path.join(RoutePath, routeFile);
    try {
        const item = await
        import (file);
        server.use(
            '/',
            expressjwt({ secret: process.env.KEY, algorithms: ['HS256'] }).unless({ path: exceptions }),
            item.default
        );
    } catch (error) {
        console.log(error.message);
    }
});

server.listen(port, () => {
    console.log(`Express launched on port [${port}] `)
})