const SkillController = require(CONTROLLER_PATH + 'SkillController');
const router = require('express').Router();

router.get('/', SkillController.listAllSkills);
router.post('/', SkillController.createSkill);
router.get('/:id', SkillController.readSkill);
router.put('/:id', SkillController.updateSkill);
router.delete('/:id', SkillController.deleteSkill);

module.exports = router;