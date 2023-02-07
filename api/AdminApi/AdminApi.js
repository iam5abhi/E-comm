const express = require("express");
const adminrouter = express.Router();
const admin = require("../../Controllers/adminController/adminControllers");
const isAuthenticated =require('../../Middleware/isAuthenticated/isAuthenticated')



adminrouter.route("/registration").post(admin.CreateAccount)

adminrouter.route("/login").post(admin.Login)

adminrouter.use(isAuthenticated)

adminrouter.route("/change-password").patch(admin.UpdatePassword)


//Category
adminrouter.route('/add-category').post(admin.AddCategory)
adminrouter.route('/get-all-category').get(admin.getAllCategory)
adminrouter.route('/edit-category/:id').patch(admin.EditCategory)
adminrouter.route('/status/:id').patch(admin.UpdateStatus)
adminrouter.route('/get-category/:id').get(admin.getCategory)





module.exports = adminrouter