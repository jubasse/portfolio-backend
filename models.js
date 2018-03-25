const mongoose = require('mongoose');
const db_config = require(CONFIG_PATH + 'database');

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${db_config.user}:${db_config.password}@${db_config.host}/${db_config.database}?${db_config.options}`);

const User = require(MODEL_PATH + 'User');
const Hobby = require(MODEL_PATH + 'Hobby');
const Media = require(MODEL_PATH + 'Media');
const Skill = require(MODEL_PATH + 'Skill');
const School = require(MODEL_PATH + 'School');
const Company = require(MODEL_PATH + 'Company');
const Education = require(MODEL_PATH + 'Education');
const Experience = require(MODEL_PATH + 'Experience');
