const Client = require('../models/Client');
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require('../middleware/async');

//Add new Individual client 
exports.newClient = asyncHandler(async( req, res, next) => {
    const client = new Client({
           fullName: req.body.fullName,
           email: req.body.email,
           contactName: req.body.contactName,
           address: req.body.address,
           phoneNumber: req.body.phoneNumber,
           website: req.body.website,
           mobileNumber: req.body.mobileNumber 
    })
 if (client >= 1) {
     return next(
         new ErrorResponse(`Error while adding new client either you put an invalid vlue`, 401)
     )
 }
        const saveClient = await client.save()
        res.status(201).json({
            result: saveClient
        });
});
//Retrieve all clients in system
exports.allClients = asyncHandler(async(req, res, next) => {
      const client = await Client.find();
      res.status(200).json({
          result: client
      })

       res.status(500).json({
           message: "please make sure you enter a valid request"
       })
})
//Retrieve single client
exports.singleClient = asyncHandler(async(req, res, next) => {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return next(
              new ErrorResponse(`Client not found with id of${req.params.id}`, 404)
            );
          }
        res.status(200).json({result: client});
})
//Update client info
exports.updateClient = asyncHandler(async(req, res, next) => {
    
        const updateClient = await Client.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updateClient) {
            return next(
              new ErrorResponse(`Client not found with id of${req.params.id}`, 404)
            );
          }
        res.status(200).json({result: updateClient});
})

//Remove client from database/system
exports.deleteClient = asyncHandler(async(req, res, next) => {
        const removeClient = await Client.findByIdAndDelete({_id: req.params.id});
        if (!removeClient) {
            return next(
              new ErrorResponse(`Client not found with id of${req.params.id}`, 404)
            );
          }
        res.status(200).json({
            relsult: removeClient,
            message: "Client deletion succefully"
        })
})