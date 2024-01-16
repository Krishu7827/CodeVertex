const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema({
  Invoice_No: {
    type: String,
    required: true,
  },
  Order_id:{
    type:String,
    required:true
  },
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  UserName: {
    type: String,
    required: true,
  },
  UserEmail: {
    type: String,
    required: true,
  },
  Products: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      Quantity:{
        type:Number,
      }
      // You can include additional fields related to the products in the invoice
      // For example, Quantity: { type: Number, required: true },
    }
  ],
  Phone_no: {
    type: String,
    required: true,
  },
  Delivery_Add: {
    type: String,
    required: true,
  },
  Delivery_status: {
    type: String,
    enum: ['Shipment created', 'In transit', 'Out for delivery', 'Delivered'],
    default: 'Shipment created',
    required: true,
  },
  Payable_amt: {
    type: Number,
    required: true,
  },
},{
  versionKey:false
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = {Invoice};
