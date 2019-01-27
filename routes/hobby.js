const HobbyController = require(CONTROLLER_PATH + 'HobbyController');
const router = require('express').Router();
const p = require('passport'), jwt = p.authenticate('jwt', { session: false });

router.get('/', HobbyController.listAllHobbies);
router.post('/', jwt, HobbyController.createHobby);
router.get('/:id', HobbyController.readHobby);
router.put('/:id', jwt, HobbyController.updateHobby);
router.delete('/:id', jwt, HobbyController.deleteHobby);

module.exports = router;