const Admin = require("../../Models/admin/admin");
const Error = require("../../Utils/ErrorHandler/ErrorHandler");
const { validationResult } = require("express-validator");
const FactoryHandler =require('../../FactoryHandler/factoryhandler')
const base64=require('base-64')
const {REGISTRATION_SUCCESS,PASSWORD_NOT_MATCH,COMPARE_PASSWORD_USING_DB,LOGIN_SUCCESS,USER_ALREADY_EXIST} =require('../../ConstandMessage/Message')
const Category =require('../../Models/category/category')
const createSendToken=require('../../suscribers/createSendToken')


exports.CreateAccount = (req, res, next) => {
   //Comparing The Password and confirmpassword
   if ( base64.decode(req.body.password) != base64.decode(req.body.confirmPassword)) return next(new Error(PASSWORD_NOT_MATCH, 400));

   Admin.findOne({ email: req.body.email }, (err, user) => {
      if (user)
         return next(new Error(USER_ALREADY_EXIST, 400));
   });
   let password = base64.decode(req.body.password);
   let confirmPassword = base64.decode(req.body.confirmPassword);
   const data = {
      name: req.body.name,
      email: req.body.email,
      password: password,
      confirmPassword: confirmPassword,
   };

   const newadmin = new Admin(data);

   newadmin.save((err, doc) => {
      if (err) return next(new Error(`${err.message}`, 400));

      res.status(200).send({
         message: REGISTRATION_SUCCESS,
         succes: true,
         name: doc.name,
         email: doc.email,
         phoneNumber: doc.phoneNumber,
      });
   });
};

exports.Login = async (req, res, next) => {
   const password = base64.decode(req.body.password);
   const errors = validationResult(req);
   if (!errors.isEmpty())
      return res.status(422).send({ errors: errors.array() });
      Admin.findOne({email:req.body.email}, async function (err, user) {
      if (!user) return next(new Error(COMPARE_PASSWORD_USING_DB, 400));
      const isMatch = await user.comparepassword(password);
      if (!isMatch) return next(new Error(COMPARE_PASSWORD_USING_DB, 400));
      createSendToken(user,200,req,res,LOGIN_SUCCESS)
   }).select("+password");
};



// Admin Password Update 
exports.UpdatePassword =FactoryHandler.UpdatePasswordHandler(Admin)


//Category Handler
exports.AddCategory=FactoryHandler.Add(Category)
exports.getAllCategory=FactoryHandler.getAll(Category)
exports.EditCategory=FactoryHandler.updateOne(Category)
exports.UpdateStatus=FactoryHandler.updateOne(Category)
exports.getCategory=FactoryHandler.getOne(Category)

