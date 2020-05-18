const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/async');
const errorHandler = require('../utils/errorResponse');

const  Admin  = require('../models/Admin');

//Get all admin registered
exports.getAllAdmin = asyncHandler(async (req, res, next) => {
       const admin = await Admin.find();
       if(!admin){
           return next(
               new errorHandler(`Users not found please make sure you are using correct route`)
           )
       }
       res
        .status(200)
        .json({ success: true, count: admin.length, data: admin });
});

//Create Admin Account
exports.createNewAdmin =  asyncHandler(async (req, res, next) => {
    const { email, password, username } = req.body;
 //validate
 if(! email || !password || !username) 
     return res.status(400).json({message: "not all fields have been entered"});
 if(password.length < 6)
 return res.status(400).json({message: "the password needs to be at least 6 characters long"});

 const admin = await Admin.findOne({email: email})
 if (admin)
 return res.status(400).json({message: "user with this email already existed"});

 const salt = await bcrypt.genSalt();
 const passwordhash = await bcrypt.hash(password, salt);

 const newAdmin  = new Admin({
     username,
     email,
     password: passwordhash,
 })
 const saveAdmin = await newAdmin.save();
 res.status(200).json(saveAdmin);
});

//Login Admin
exports.loginAdmin = asyncHandler(async(req, res, next) => {
const { email, password } = req.body;
//validate
if(!email || !password)
return res.status(401).json({message: "Not all fields have been entered."});

const admin = await Admin.findOne({email: email})
if(!admin)
return res.status(401).json({message: "No registered account with this email."});
 const isMatch = bcrypt.compare(password, admin.password);
 if(!isMatch)
 return res.status(500).json({message: "invalid credentials"});

 const token = jwt.sign({id: admin._id}, 'mysecretkey');
 res.json({
    admin,
     token
 })
});