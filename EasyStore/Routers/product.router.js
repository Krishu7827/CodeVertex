const express = require("express")
const {getProduct,AddProduct,UpdateProduct,DeleteProduct} = require("../Controllers/product.controller");
const ProductRouter = express.Router()



//Getting 
ProductRouter.get("/get",getProduct)


//Post Prodcut
ProductRouter.post("/Add",AddProduct)

//Update
ProductRouter.put("/Update",UpdateProduct)

//Delete
ProductRouter.delete("/Delete",DeleteProduct)


module.exports = {ProductRouter};