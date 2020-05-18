const { Router } = require('express');
const router = Router();
const secured = require('../middleware/authenticate');

const { 
    newStuffMember,
    StuffMembers,
    singleStuff,
    updateStuff,
    deleteStuff } = require('../controllers/stuff');


router.route('/stuff')
.post(secured, newStuffMember)
.get(StuffMembers)

router.route('/stuff/:id')
.get(singleStuff)
.put(secured, updateStuff)
.delete(secured, deleteStuff)


module.exports = router;
