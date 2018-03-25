const HobbyController = require(CONTROLLER_PATH + 'HobbyController');
const router = require('express').Router();
const p = require('passport'), opt = { session: false };

router.get('/', HobbyController.listAllHobbies);
router.post('/', p.authenticate('jwt', opt), HobbyController.createHobby);
router.get('/:id', HobbyController.readHobby);
router.put('/:id', p.authenticate('jwt', opt), HobbyController.updateHobby);
router.delete('/:id', p.authenticate('jwt', opt), HobbyController.deleteHobby);

module.exports = router;