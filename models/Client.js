const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Individual = new Schema({
    client: {type: String, required: true},
    email: {type: String, required: true, unique: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    contact: { type: String, required: true },
    address: { type: String, required: true},
    phone: { type: String, unique: true, required: true },

});

const ClientModel = mongoose.model('Clients', Individual);
module.exports = ClientModel;