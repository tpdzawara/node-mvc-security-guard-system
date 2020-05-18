const { Router } = require('express');
const router = Router();

const AdminController = require('../controllers/admin');

//Get All registered adminstrators
router.get('/', AdminController.getAllAdmin);

//register admin
router.post('/signup', AdminController.createNewAdmin);
 
//login admin
router.post('/login', AdminController.loginAdmin)

module.exports = router;