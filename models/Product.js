const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    name: {
        type: String,
        required: [true, "Please Enter the Product Name"]
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    quantity:{
        type: Number,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    category_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    }
    
});

module.exports = mongoose.model('Product', Product); 