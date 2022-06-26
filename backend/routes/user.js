const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');

const User = require("../models/User");

const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.body.decoded.id }).select("-password");
        return res.json({ "message": user, tag: true })
    }
    catch (error) {
        return res.json({ "message": error, "tag": false })
    }
})

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


router.put("/", verifyToken, async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.body.decoded.id });
        user.name = req.body.name;
        user.company_name = req.body.company_name;

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


router.put("/change_password", verifyToken, async (req, res) => {
    try {
        let { new_password } = req.body;
        let user = await User.findOne({ _id: req.body.decoded.id });

        bcrypt.compare(new_password, user.password, function (err, hashed) {
            if (hashed === true) {
                return res.json({ "message": "New Password cannot be same as old password", "tag": false })
            }
            else {
                var hash = bcrypt.hashSync(new_password, 8);
                User.updateOne({ _id: req.body.decoded.id },
                    { password: hash }, function (err, docs) {
                        if (err) {
                            return res.json({ "message": "Something went wrong", "tag": false })
                        }
                        else {
                            return res.json({ "message": "Password updated", "tag": true })

                        }
                    });
            }
        });
    }
    catch (error) {
        return res.json({ "message": error, "tag": false })
    }
})


router.put("/forgot_password", async (req, res) => {
    try {
        let { email } = req.body;
        let new_password = `${Math.floor(1000 + Math.random() * 9000)}`;
        var hash = bcrypt.hashSync(new_password, 8);
        send_email(email, "Your new password is set by us", `Login with the given password - ${new_password}`);
        User.updateOne({ email },
            { password: hash }, function (err, docs) {
                if (err) {
                    return res.json({ "message": "Something went wrong", "tag": false })
                }
                else {
                    return res.json({ "message": "Check email", "tag": true })
                }
            })
    }
    catch (error) {
        return res.json({ "message": error, "tag": false })
    }
})


async function send_email(to, subject, message) {
    let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.myEmail,
            pass: process.env.myPass
        }
    });


    let details = {
        from: "tech.ujjwal.99@gmail.com",
        to: to,
        subject: subject,
        text: message
    };


    mailTransporter.sendMail(details, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("sent");
        }
    })
}





module.exports = router;