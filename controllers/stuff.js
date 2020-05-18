const Stuff = require('../models/Stuff');
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require('../middleware/async');

//Add new StaffMenber
exports.newStuffMember = asyncHandler(async( req, res, next) => { 
    const stuffMember = new Stuff({
        firstName: req.body.firstName,
        surName: req.body.surName,
        dateOfBirth: req.body.dateOfBirth,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        idNumber: req.body.idNumber,
        nationality: req.body.nationality,
        gender: req.body.gender,
        department: req.body.department,
        jobDescription: req.body.jobDescription,
        employmentType: req.body.employmentType,
        payRate: req.body.payRate,
        startDate: req.body.startDate
           });
        const saveStuff = await stuffMember.save();
        res.status(200).json({result: saveStuff});
        res.status(500).json({message: err});
});

//Get all Stuff
exports.StuffMembers = asyncHandler(async(req, res, next) =>{
        const stuff = await Stuff.find(req.params.id);
        if(!stuff) {
            return next(
                new ErrorResponse(`StuffMembers not found  ${req.params.id}`, 404)
            );
        }
        res.status(200).json({result:stuff});
})

//Get Single stuff member
exports.singleStuff = asyncHandler(async(req, res, next) => {
       const oneStuff = await Stuff.findById(req.params.id);
       if(!oneStuff) {
           return next(
               new ErrorResponse(`StuffMember not found with id of ${req.params.id}`, 404)
           );
       }
       res.status(200).json({result: oneStuff});

})

//Update stuff
exports.updateStuff = asyncHandler(async(req, res, next) => {
    
        const updateStuff = await Stuff.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updateStuff) {
            return next(
              new ErrorResponse(`StuffMember not found with id of${req.params.id}`, 404)
            );
          }
        res.status(200).json({result: updateStuff, message: "Stuff Member Updated"});
})

//Delete Stuff Member
exports.deleteStuff = asyncHandler(async(req, res, next) => {
      const removeStuff = await Stuff.findByIdAndDelete({_id: req.params.id})
      if (!updateStuff) {
        return next(
          new ErrorResponse(`StuffMember not found with id of${req.params.id}`, 404)
        );
      }
      res.status(200).json({result: removeStuff, message: "Deletion successful"});
    
})