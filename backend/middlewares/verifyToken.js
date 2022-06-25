const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.token;
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (decoded) {
            req.body['decoded'] = decoded;
            next()
        }
        else {
            return res.json({
                "tag": false,
                "message": "Not Atuhenticated User"
            });
        }
    }
    catch (e) {
        console.log(e)
        return res.json({
            "tag": false,
            "message": "Not Atuhenticated User"
        });
    }
}

module.exports = verifyToken;