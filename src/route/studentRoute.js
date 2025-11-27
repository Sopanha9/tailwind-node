const exress = require('express');
const router = exress.Router();
const studentController = require('../controller/studentController');


router.get('/', studentController.getList);
router.post('/', studentController.createStudent);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);
router.get('/:id', studentController.getStudentById);

module.exports = router;