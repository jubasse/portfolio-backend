const cluster = require('cluster');

// clustering
if (cluster.isMaster) {
    let cpuCount = require('os').cpus().length;
    // create a worker for each cpus
    for (let i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
    // on worker exit
    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died.');
        cluster.fork();
    });

    // when a thread start listening
    cluster.on('listening', function(worker, address) {
        console.log('Worker started with PID ' + worker.process.pid + '.');
    });
} else {
    // getting configuration
    global.ROOT_PATH = `${__dirname}/`;
    require('dotenv').config();
    require('./config/paths');

    // variables
    const express    = require('express');
    const app        = express();
    const bodyParser = require('body-parser');
    const Promise = global.Promise = require('bluebird');
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
    app.listen(port, () => {
        console.log(`server listening on port ${port}`);
    });

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // adding exports
    exports.app = app;
    exports.passport = passport;
}
