const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    Image: {
      type: String, 
      required: true,
    },
    Name: {
      type: String,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    Category: {
        type: String,
        required: true,
      }
  },
  {
    versionKey: false, 
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = {Product};
