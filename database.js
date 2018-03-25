const mongoose = require('mongoose');
const db_config = require(CONFIG_PATH + 'database');

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${db_config.user}:${db_config.password}@${db_config.host}/${db_config.database}?${db_config.options}`);

module.exports = mongoose;