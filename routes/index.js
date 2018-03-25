const router = require('express').Router();

router.use('/hobbies', require('./hobby'));
router.use('/skills', require('./skill'));
router.use('/experiences', require('./experience'));

module.exports = router;