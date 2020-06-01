const { Router } = require('express');
const router = Router();

const secured = require('../middleware/authenticate');

const { getClients, addClients, addClient } = require('../controllers/client');

router.route('/clients')
.get(getClients)
.post(addClient)

router.route('/add-client')
.get(addClients)

module.exports = router;
