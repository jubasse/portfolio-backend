const cluster = require('cluster');
const log = global.log = (...args) => console.log(...args);

// clustering
if (cluster.isMaster) {
    let cpuCount = require('os').cpus().length;
    // create a worker for each cpus
    for (let i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
    // on worker exit
    cluster.on('exit', worker => {
        log(`Worker ${worker.process.pid} died.`);
        cluster.fork();
    });

    // when a thread start listening
    cluster.on('listening', worker => log(`Worker started with PID ${worker.process.pid}.`));
} else {
    // getting configuration
    global.ROOT_PATH = `${__dirname}/`;
    require('dotenv').config();
    require('./config/paths');

    // variables
    const express    = require('express');
    const app        = express();
    const bodyParser = require('body-parser');
    Promise = global.Promise = require('bluebird');
    const port = process.env.PORT || 9093;
    const passport = require('passport');
    const morgan = require('morgan');

    require('./models');

    // configure middleware
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // init passport
    app.use(passport.initialize());
    require(CONFIG_PATH + 'passport')(passport);

    // init morgan
    const logger = process.env.ENV === 'local' ? morgan('dev') : morgan('combined');
    app.use(logger);

    // api routes
    app.use('/api/v1', require(ROUTE_PATH));

    // auth route
    const AuthController = require(CONTROLLER_PATH + 'AuthController');
    app.post('/auth', AuthController.authenticate);

    // starting server
    app.listen(port, () => log(`server listening on port ${port}`));

    // catch 404 and forward to error handler
    app.use((req, res) => {
        res.status(404);
        // respond with json
        if (req.accepts('json')) {
            return res.send({ error: 'Not found' });
        }
        // default to plain-text. send()
        return res.type('txt').send('Not found');
    });

    // adding exports
    exports.app = app;
    exports.passport = passport;
}
