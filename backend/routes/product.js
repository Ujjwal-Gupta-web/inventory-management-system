const express = require("express");
const router = express.Router();

const Category = require("../models/Category");
const Product = require("../models/Product");

const verifyToken = require("../middlewares/verifyToken");


router.get("/", verifyToken, async (req, res) => {
    try {
        const products = await Product.find({ user_id: req.body.decoded.id }).sort({ name: 1 });
        if (products.length > 0) {
            let obj = products;
            return res.json({ "tag": true, "message": obj });
        }
        return res.json({ "tag": false, "message": "No products found" });
    }
    catch (error) {
        return res.json({ "tag": false, "message": error })
    }
})


router.get("/:id", verifyToken, async (req, res) => {
    try {
        let _id = req.params.id;
        const product = await Product.findOne({ _id, user_id: req.body.decoded.id });
        if (product) {
            return res.json({ "tag": true, "message": product });
        }
        return res.json({ "tag": false, "message": "No Such product found" });
    }
    catch (error) {
        return res.json({ "tag": false, "message": error })
    }
})


router.get("/category/:category_id", verifyToken, async (req, res) => {
    try {
        let category_id = req.params.category_id;
        const products = await Product.find({ category_id, user_id: req.body.decoded.id });

        if (products.length > 0) {
            let obj = products;
            return res.json({ "tag": true, "message": obj });
        }
        return res.json({ "tag": false, "message": "No products found" });

    }
    catch (error) {
        return res.json({ "tag": false, "message": error })
    }
})


router.post("/", verifyToken, async (req, res) => {
    try {
        let { name, quantity,
            price,
            category_id } = req.body;

        const product = new Product({
            name,
            quantity,
            price,
            category_id,
            user_id: req.body.decoded.id
        });
        product.save(function (error, document) {
            if (error) {
                console.error(error)
                return res.json({ "message": "try again", "tag": false })
            }
            //console.log(document);
            return res.json({ "message": "Product Added", tag: true })
        })
    }
    catch (error) {
        return res.json({ "tag": false, "message": error })
    }
})


router.put("/", verifyToken, async (req, res) => {
    try {
        let { _id,
            name,
            quantity,
            price,
            category_id
        } = req.body;
        let product = await Product.findOne({ _id, user_id: req.body.decoded.id });

        product.name = name;
        product.price = price;
        product.quantity = quantity;
        product.category_id = category_id;

        product.save(function (error, document) {
            if (error) {
                console.error(error)
                return res.json({ "message": "try again", "tag": false })
            }
            //console.log(document);
            return res.json({ "message": "Product Details Updated", tag: true })
        })
    }
    catch (error) {
        return res.json({ "tag": false, "message": error })
    }
})


router.put("/increment_quantity", verifyToken, async (req, res) => {
    try {
        let { _id, increment } = req.body;
        let product = await Product.findOne({ _id, user_id: req.body.decoded.id });

        product.quantity += increment;

        product.save(function (error, document) {
            if (error) {
                console.error(error)
                return res.json({ "message": "try again", "tag": false })
            }
            //console.log(document);
            return res.json({ "message": "Product Quantity Inreased", tag: true })
        })
    }
    catch (error) {
        return res.json({ "tag": false, "message": error })
    }
})


router.put("/decrement_quantity", verifyToken, async (req, res) => {
    try {
        let { _id, decrement } = req.body;
        let product = await Product.findOne({ _id, user_id: req.body.decoded.id });

        product.quantity -= decrement;
        if (product.quantity < 0) {
            return res.json({ "message": "Product Quantity Cannot be negative", tag: false })
        }

        product.save(function (error, document) {
            if (error) {
                console.error(error)
                return res.json({ "message": "try again", "tag": false })
            }
            //console.log(document);
            return res.json({ "message": "Product Quantity Decreased", tag: true })
        })
    }
    catch (error) {
        return res.json({ "tag": false, "message": error })
    }
})



router.delete("/:id", verifyToken, async (req, res) => {
    try {
        let _id = req.params.id;
        Product.deleteOne({ _id, user_id: req.body.decoded.id }).then(function () {
            return res.json({ "message": "Product Deleted", tag: true })
        }).catch(function (error) {
            return res.json({ "message": "try again", "tag": false })
        });
    }
    catch (error) {
        return res.json({ "tag": false, "message": error })
    }
})


module.exports = router;