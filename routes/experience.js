const ExperienceController = require(CONTROLLER_PATH + 'ExperienceController');
const router = require('express').Router();
const p = require('passport'), opt = { session: false };

router.get('/', ExperienceController.listAllExperiences);
router.post('/', p.authenticate('jwt', opt), ExperienceController.createExperience);
router.get('/:id', ExperienceController.readExperience);
router.put('/:id', p.authenticate('jwt', opt), ExperienceController.updateExperience);
router.delete('/:id', p.authenticate('jwt', opt), ExperienceController.deleteExperience);

module.exports = router;