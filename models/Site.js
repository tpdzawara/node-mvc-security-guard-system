const mongoose = require('mongoose');
const  geocoder = require('../utils/geocoder');

const SiteSchema = mongoose.Schema({
    address: {
        type: String,
        required: [false, "Please add an address"],
      },
      location: {
        //GeoJSON Point
        type: {
          type: String,
          enum: ["Point"],
          required: false,
        },
        coordinates: {
          type: [Number],
          required: false,
          index: "2dsphere",
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String,
      }

});

//Geocode and create location field
SiteSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coodinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
        country: loc[0].countryCode
    }

    //Do
    this.address = undefined
    next()
})

module.exports = mongoose.model('Sites', SiteSchema);