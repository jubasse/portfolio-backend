const ExperienceController = require(CONTROLLER_PATH + 'ExperienceController');
const router = require('express').Router();
const p = require('passport'), jwt = p.authenticate('jwt', { session: false });

router.get('/', ExperienceController.listAllExperiences);
router.post('/', jwt, ExperienceController.createExperience);
router.get('/:id', ExperienceController.readExperience);
router.put('/:id', jwt, ExperienceController.updateExperience);
router.delete('/:id', jwt, ExperienceController.deleteExperience);

module.exports = router;