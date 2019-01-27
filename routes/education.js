const EducationController = require(CONTROLLER_PATH + 'EducationController');
const router = require('express').Router();
const p = require('passport'), jwt = p.authenticate('jwt', { session: false });

router.get('/', EducationController.listAllEducations);
router.post('/', jwt, EducationController.createEducation);
router.get('/:id', EducationController.readEducation);
router.put('/:id', jwt, EducationController.updateEducation);
router.delete('/:id', jwt, EducationController.deleteEducation);

module.exports = router;