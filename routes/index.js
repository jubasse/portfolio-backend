const router = require('express').Router();

router.use('/skills', require('./skill'));
router.use('/hobbies', require('./hobby'));
router.use('/educations', require('./education'));
router.use('/experiences', require('./experience'));

module.exports = router;