const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    name: {
        type: String,
        required: [true, "Please Enter the Category Name"]
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
    
});

module.exports = mongoose.model('Category', Category); 