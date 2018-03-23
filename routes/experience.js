const ExperienceController = require(CONTROLLER_PATH + 'ExperienceController');
const router = require('express').Router();

router.get('/', ExperienceController.listAllExperiences);
router.post('/', ExperienceController.createExperience);
router.get('/:id', ExperienceController.readExperience);
router.put('/:id', ExperienceController.updateExperience);
router.delete('/:id', ExperienceController.deleteExperience);

module.exports = router;