const EducationController = require(CONTROLLER_PATH + 'EducationController');
const router = require('express').Router();
const p = require('passport'), opt = { session: false };

router.get('/', EducationController.listAllEducations);
router.post('/', p.authenticate('jwt', opt), EducationController.createEducation);
router.get('/:id', EducationController.readEducation);
router.put('/:id', p.authenticate('jwt', opt), EducationController.updateEducation);
router.delete('/:id', p.authenticate('jwt', opt), EducationController.deleteEducation);

module.exports = router;