const Guard = require('../models/Guard');
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require('../middleware/async');
//add new guard
exports.addGuard = asyncHandler(async(req, res, next) => {
    const guard = new Guard({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber
    });
    const saveGuard = await guard.save();
    res.status(201).json({
        result: saveGuard
    });

    res.status(500).json({
        message: 'Make sure you have entered valid details'
    });
})
//get All guards
exports.Guards =  asyncHandler(async(req, res, next) => {
        const guards = await Guard.find();
        res.status(200).json({
            result: guards
        });
        res.status(500).json({
            message: err
        });
})

//get Single guard
exports.getGuard = asyncHandler(async(req, res, next) => {
        const guard = await Guard.findById(req.params.id);
        if(!guard) {
            return next(
                new ErrorResponse(`Guard not found with id of${req.params.id}`, 404)
            )
        }
        res.status(200).json({result: guard});
})

//update guard details
exports.guardUpdate = asyncHandler(async(req, res, next) => {
    const updateGuard = await Guard.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if(!updateGuard) {
        return next(
            new ErrorResponse(` Guard not found with id of${req.params.id}`, 404)
        )
    }
        res.status(200).json({
            result: updateGuard
        });

})

//Delete guard
exports.deleteGuard = asyncHandler(async(req, res, next) => {
       const removeGuard = await Guard.findByIdAndDelete({_id: req.params.id});
       if (!removeGuard) {
           return next(
               new ErrorResponse(`Guard not found with id of${req.params.id}`, 404)
           )
       }
       res.status(200).json({
           result: removeGuard,
           message: 'Guard deleted'
       })
   
})
