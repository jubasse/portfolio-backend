const HobbyController = require(CONTROLLER_PATH + 'HobbyController');
const router = require('express').Router();

router.get('/', HobbyController.listAllHobbies);
router.post('/', HobbyController.createHobby);
router.get('/:id', HobbyController.readHobby);
router.put('/:id', HobbyController.updateHobby);
router.delete('/:id', HobbyController.deleteHobby);

module.exports = router;