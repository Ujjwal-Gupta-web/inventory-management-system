const express = require("express");
const router = express.Router();

const Category = require("../models/Category");
const Product = require("../models/Product");

const verifyToken = require("../middlewares/verifyToken");


router.get("/", verifyToken, async (req, res) => {
    try {
        const categories = await Category.find({ user_id: req.body.decoded.id }).sort({ name: 1 });
        if (categories.length > 0) {
            let obj = categories;
            return res.json({ "tag": true, "message": obj });
        }
        return res.json({ "tag": false, "message": "No Categories found" });
    }
    catch (error) {
        return res.json({ "tag": false, "message": error })
    }
})


router.get("/:id", verifyToken, async (req, res) => {
    try {
        let _id = req.params.id;
        const category = await Category.findOne({ _id, user_id: req.body.decoded.id });
        if (category) {
            return res.json({ "tag": true, "message": category });
        }
        return res.json({ "tag": false, "message": "No Such Category found" });
    }
    catch (error) {
        return res.json({ "tag": false, "message": error })
    }
})


router.post("/", verifyToken, async (req, res) => {
    try {
        let { name } = req.body;
        const category = new Category({
            name,
            user_id: req.body.decoded.id
        });
        category.save(function (error, document) {
            if (error) {
                console.error(error)
                return res.json({ "message": "try again", "tag": false })
            }
            //console.log(document);
            return res.json({ "message": "Category Added", tag: true })
        })
    }
    catch (error) {
        return res.json({ "tag": false, "message": error })
    }
})


router.put("/", verifyToken, async (req, res) => {
    try {
        let { _id, name } = req.body;
        let category = await Category.findOne({ _id, user_id: req.body.decoded.id });
        category.name = name;
        category.save(function (error, document) {
            if (error) {
                console.error(error)
                return res.json({ "message": "try again", "tag": false })
            }
            //console.log(document);
            return res.json({ "message": "Category Details Updated", tag: true })
        })
    }
    catch (error) {
        return res.json({ "tag": false, "message": error })
    }
})


router.delete("/:id", verifyToken, async (req, res) => {
    try {
        let _id = req.params.id;

        Product.deleteMany({ user_id: req.body.decoded.id, category_id: _id }).then(function () {
            Category.deleteOne({ _id, user_id: req.body.decoded.id }).then(function () {
                return res.json({ "message": "Category Deleted", tag: true })
            }).catch(function (error) {
                return res.json({ "message": "try again", "tag": false })
            });

        }).catch(function (error) {
            return res.json({ "message": "try again", "tag": false })
        });
    }
    catch (error) {
        return res.json({ "tag": false, "message": error })
    }
})


module.exports = router;