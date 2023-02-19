import { dotenv, express, morgan, fs, path, moment, cors, expressjwt } from "./src/config/index.js";
import { corsDomains } from "./src/config/cors.js";
import { exceptions } from "./src/routes/exceptions.js";

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
server.use(
    '/v1',
    expressjwt({ secret: process.env.KEY, algorithms: ['HS256'] }).unless({ path: exceptions }),
    (req, res) => {
        res.send('HelloWorld');
    }
)
server.listen(port, () => {
    console.log(`Express launched on port [${port}] `)
})