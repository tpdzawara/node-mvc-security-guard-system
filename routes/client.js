const { Router } = require('express');
const router = Router();

const secured = require('../middleware/authenticate');

const { newClient, allClients, singleClient, updateClient, deleteClient } = require('../controllers/client');
//get client page render all clients
module.exports = router;
