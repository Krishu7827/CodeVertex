const express = require("express")
const paymentRouter = express.Router()
const {authentication} = require("../Middleware/authentication")
const {checkout,getAPIkey,paymentVerification} = require("../Controllers/payment.controller")





paymentRouter.post("/checkout",authentication,checkout)
paymentRouter.get("/ApiKey", getAPIkey)
paymentRouter.post('/paymentVerification',authentication,paymentVerification)




module.exports = {paymentRouter};
