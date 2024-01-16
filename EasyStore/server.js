const express = require('express');
const mongoose = require('mongoose');
const {InterviewRouter} = require("./Routers/Question.router")
const {UserRouter} = require("./Routers/user.router")
const {ProductRouter} = require("./Routers/product.router")
const {paymentRouter} = require("./Routers/payment.router")
const cors = require("cors")
const app = express();
const PORT = process.env.PORT || 3001;
require("dotenv").config()

app.use(express.json());
app.use(cors())
// MongoDB Connection
const mongoURI = process.env.MongoURL
mongoose.connect(mongoURI);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.use("/user",UserRouter)
app.use("/Product",ProductRouter)
app.use("/Payment",paymentRouter)
app.use('/Interview',InterviewRouter) 



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
