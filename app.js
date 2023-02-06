const express = require("express");
const morgan =require('morgan')
const cors = require("cors")
const Error=require('./Utils/ErrorHandler/ErrorHandler')
const GloBalErrorHandler =require('./Middleware/Error/Error')
const admin=require('./api/AdminApi/AdminApi')



const app = express();



app.use(express.urlencoded({extended:true,}))
app.use(express.json())


// adding morgan to log HTTP requests
app.use(morgan('dev'))

//handling the cros errro
app.use(cors());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });




// Hand The employee-routes
app.use('/api/admin',admin)


// Page Not Found Error
app.use('*',(req,res,next)=>{
    next(new Error(`can't find ${req.originalUrl} on this server`,404))
})


// Global Error Handler
app.use(GloBalErrorHandler)



module.exports =app
