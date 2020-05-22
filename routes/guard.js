const { Router } = require('express');
const router = Router();
const secured = require('../middleware/authenticate');

const { addGuard, Guards, getGuard, guardUpdate, deleteGuard } = require('../controllers/guard');
//
module.exports = router;