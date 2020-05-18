const NodeGeocoder = require('node-geocoder');
const dotenv = require('dotenv');
dotenv.config({path:  ('../config/config.env')});

const options = {
    provider: process.env.GEOCODER_PROVIDER,
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY,
    fomatter: null
}

const geocorder = NodeGeocoder(options);

module.exports = geocorder;