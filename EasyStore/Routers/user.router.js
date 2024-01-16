const express = require('express')
const UserRouter = express.Router()
const { Login, Signup, updateVerify, update, SendingEmail,isPaid } = require("../Controllers/user.controller")


//Sending a Email for Signup
UserRouter.post("/sendingEmail",SendingEmail)



//Signup Router

UserRouter.post("/Signup",Signup)

//Login

UserRouter.post("/Login", Login)

//Sending a Email for update 
UserRouter.post("/updateVerify", updateVerify)


//update router
UserRouter.put("/update",update)

/**is User Paid or not */
UserRouter.get('/isPaid',isPaid)
module.exports = {UserRouter};