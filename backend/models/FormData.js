const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema({
    name : String,
    email: String,
    password: String,
    confirmpassword: String,
    phone:Number,
    gender:String,
    securityquestion:String,
    securityanswer:String
    
})

const FormDataModel = mongoose.model('collections', FormDataSchema);

module.exports = FormDataModel;