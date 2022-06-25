const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs');

const User = require("../models/User");

const verifyToken=require("../middlewares/verifyToken");

router.post("/login", async (req, res) => {

    const obj = req.body;
    const result = await User.findOne({ email: obj.email });
    if (result) {
        bcrypt.compare(req.body.password, result.password, function (err, hashed) {
            if (hashed === true) {
                const token = jwt.sign({ id: result._id }, process.env.SECRET_KEY);
                return res.json({ "message": "Login success", "token": token, "tag": true })
            }
            else {
                return res.json({ "message": "Login failed", "tag": false })
            }
        });
    }
    else {
        return res.json({ "message": "Login failed", "tag": false })
    }

})


router.post("/signup", async (req, res) => {
    try {
        let { email,
            company_name,
            password,
            name } = req.body;

        const result = await User.findOne({ email });

        if (result) {
            return res.json({ "message": "User already exists", "tag": false })
        }
        else {
            var hash = bcrypt.hashSync(password, 8);
            password = hash;
            const user = new User({
                name,
                company_name,
                email,
                password
            })
            user.save(function (error, document) {
                if (error) {
                    console.error(error)
                    return res.json({ "message": "try again", "tag": false })
                }
                //console.log(document);
                return res.json({ "message": "User SignUp Success", tag: true })
            })
        }
    }
    catch (error) {
        return res.json({ "message": error, "tag": false })
    }
})


router.put("/",verifyToken, async (req, res) => {
    try {
        let user=await User.findOne({_id:req.body.decoded.id});
        user.name=req.body.name;
        user.company_name=req.body.company_name;

            user.save(function (error, document) {
                if (error) {
                    console.error(error)
                    return res.json({ "message": "try again", "tag": false })
                }
                //console.log(document);
                return res.json({ "message": "Personal Details Updated", tag: true })
            })
        
    }
    catch (error) {
        return res.json({ "message": error, "tag": false })
    }
})


router.put("/change_password",verifyToken, async (req, res) => {
    // TODO
    // try {
    //     let user=await User.findOne({_id:req.body.decoded.id});
    //     user.name=req.body.name;
    //     user.company_name=req.body.company_name;

    //         user.save(function (error, document) {
    //             if (error) {
    //                 console.error(error)
    //                 return res.json({ "message": "try again", "tag": false })
    //             }
    //             //console.log(document);
    //             return res.json({ "message": "Personal Details Updated", tag: true })
    //         })
        
    // }
    // catch (error) {
    //     return res.json({ "message": error, "tag": false })
    // }
})


router.post("/forgot_password", async (req, res) => {
    // TODO
    // try {
    //     let user=await User.findOne({_id:req.body.decoded.id});
    //     user.name=req.body.name;
    //     user.company_name=req.body.company_name;

    //         user.save(function (error, document) {
    //             if (error) {
    //                 console.error(error)
    //                 return res.json({ "message": "try again", "tag": false })
    //             }
    //             //console.log(document);
    //             return res.json({ "message": "Personal Details Updated", tag: true })
    //         })
        
    // }
    // catch (error) {
    //     return res.json({ "message": error, "tag": false })
    // }
})


router.post("/verify_otp", async (req, res) => {
    // TODO
    // try {
    //     let user=await User.findOne({_id:req.body.decoded.id});
    //     user.name=req.body.name;
    //     user.company_name=req.body.company_name;

    //         user.save(function (error, document) {
    //             if (error) {
    //                 console.error(error)
    //                 return res.json({ "message": "try again", "tag": false })
    //             }
    //             //console.log(document);
    //             return res.json({ "message": "Personal Details Updated", tag: true })
    //         })
        
    // }
    // catch (error) {
    //     return res.json({ "message": error, "tag": false })
    // }
})


module.exports = router;