const express = require("express");
const adminrouter = express.Router();
const admin = require("../../Controllers/adminController/adminControllers");
const isAuthenticated =require('../../Middleware/isAuthenticated/isAuthenticated')



adminrouter.route("/registration").post(admin.CreateAccount)

adminrouter.route("/login").post(admin.Login)

adminrouter.use(isAuthenticated)

adminrouter.route("/change-password").patch(admin.UpdatePassword)


//Category Handler
exports.AddCategory=FactorHandler.Add(Category)
exports.getAllCategory=FactorHandler.getAll(Category)
exports.EditCategory=FactorHandler.updateOne(Category)
exports.UpdateStatus=FactorHandler.updateOne(Category)
exports.getCategory=FactorHandler.getOne(Category)





module.exports = adminrouter