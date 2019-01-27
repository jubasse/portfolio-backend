const SkillController = require(CONTROLLER_PATH + 'SkillController');
const router = require('express').Router();
const p = require('passport'), jwt = p.authenticate('jwt', { session: false });

router.get('/', SkillController.listAllSkills);
router.post('/', jwt, SkillController.createSkill);
router.get('/:id', SkillController.readSkill);
router.put('/:id', jwt, SkillController.updateSkill);
router.delete('/:id', jwt, SkillController.deleteSkill);

module.exports = router;