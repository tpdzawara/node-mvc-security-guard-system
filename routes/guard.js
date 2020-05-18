const { Router } = require('express');
const router = Router();
const secured = require('../middleware/authenticate');

const { addGuard, Guards, getGuard, guardUpdate, deleteGuard } = require('../controllers/guard');

router.route('/guard')
.post(secured, addGuard)
.get(Guards)

router.route('/guard/:id')
.put(secured, guardUpdate)
.get(getGuard)
.delete(secured, deleteGuard)


module.exports = router;