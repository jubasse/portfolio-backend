const SkillController = require(CONTROLLER_PATH + 'SkillController');
const router = require('express').Router();
const p = require('passport'), opt = { session: false };

router.get('/', SkillController.listAllSkills);
router.post('/', p.authenticate('jwt', opt), SkillController.createSkill);
router.get('/:id', SkillController.readSkill);
router.put('/:id', p.authenticate('jwt', opt), SkillController.updateSkill);
router.delete('/:id', p.authenticate('jwt', opt), SkillController.deleteSkill);

module.exports = router;