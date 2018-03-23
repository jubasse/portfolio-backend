const router = require('express').Router();

router.use('/hobbies', require('./hobby'));
router.use('/skill', require('./skill'));
router.use('/experience', require('./experience'));

module.exports = router;