const { ServerDescription } = require('mongodb')
const mongoose = require('mongoose')


const Schema = mongoose.Schema

const ProductSchema = mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discount:{
        type:Number
    },
    Description:{
        type:String,
        required:true 
    },
    productImage:{
        type:String,
        required:true 
    }

},{ timestamps:true})


module.exports =new mongoose.model('Product',ProductSchema)