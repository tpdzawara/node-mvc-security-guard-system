const { Router } = require('express');
const router = Router();

const secured = require('../middleware/authenticate');

const { newClient, allClients, singleClient, updateClient, deleteClient } = require('../controllers/client');

router.route('/client')
.post(secured, newClient)
.get(allClients)

router.route('/client/:id')
.get(singleClient)
.put(secured, updateClient)
.delete(secured, deleteClient)

module.exports = router;
