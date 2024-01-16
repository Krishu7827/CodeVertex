const { instance } = require("../config")
const { User } = require("../Models/user.model")
const crypto = require('crypto')
require("dotenv").config()


/************** to Creating Order for Payment ***************/

const checkout = async (req, res) => {
  
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
};

/********** to Get Razor API Key   *************/

const getAPIkey = (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })


/*********to Payment Confirmation*************/

const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body.response;

  const { UserEmail, UserID } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  /*****  Comparing   *******/
  const isAuthentic = expectedSignature === razorpay_signature;
  
  if (isAuthentic) {

    /******** Database    ********/
    try {

      await User.updateOne({ Email: UserEmail }, { isPaid: true })
      res.status(200).json({
        success: true,
      });
    } catch (err) {

      res.status(200).send({ msg:"error" })

    }



  } else {
    res.status(400).json({
      success: false,
    });
  }
};

module.exports = { checkout, getAPIkey, paymentVerification }