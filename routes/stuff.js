const { Router } = require('express');
const router = Router();
const secured = require('../middleware/authenticate');

const { 
    newStuffMember,
    StuffMembers,
    singleStuff,
    updateStuff,
    deleteStuff } = require('../controllers/stuff');
//
module.exports = router;
