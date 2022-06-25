const validator = require("validator")
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: {
        type: String,
        required: [true, "Please Enter the name"]
    },
    company_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, "Please enter your Email"],
        unique: true,
        validate: [validator.isEmail, "Entered email is not valid"]
    },
    password: {
        type: "String",
        required: [true, "Please Enter the password"],
        minlength: [6, "The password should atleast 6 characters"],
        select: false
    },
    otp: String
});

module.exports = mongoose.model('Users', User); 