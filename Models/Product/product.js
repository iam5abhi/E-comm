const { ServerDescription } = require('mongodb')
const mongoose = require('mongoose')
const SubCategory =require('../category/subcategory')


const Schema = mongoose.Schema

const ProductSchema = mongoose.Schema({
    subCategoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:SubCategory,
        require:true
       },
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
    },
    status:{
        type:String,
        required:true,
        enum:['enable','disable'],
        default:'enable'
    }

},{ timestamps:true})


module.exports =new mongoose.model('Product',ProductSchema)