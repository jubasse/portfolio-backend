const mongoose = require('mongoose');
const db_config = require(CONFIG_PATH + 'database');

mongoose.Promise = global.Promise;
const connectionStr = `mongodb+srv://${db_config.user}:${db_config.password}@${db_config.host}/${db_config.database}?${db_config.options}`;
mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    useCreateIndex: true,
});

module.exports = mongoose;