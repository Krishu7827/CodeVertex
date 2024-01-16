const jwt = require("jsonwebtoken");


const authentication = (req, res, next) => {
 
    const {token} = req.headers
    try {
        const decoded = jwt.verify(token, "MyStore")
        req.body.UserID = decoded.UserID
        req.body.UserEmail = decoded.UserEmail
        

        next()
    } catch (err) {
        res.status(404).send({ message:err})
    }
}

module.exports = { authentication }