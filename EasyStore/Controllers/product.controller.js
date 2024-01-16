const { Product } = require("../Models/product.model");





const getProduct = async (req, res) => {
    try {
        // Define the query object
        const query = {};

        // Check if a category filter is provided
        if (req.query.category) {
            query.Category = req.query.category;
        }

        // Check if an _id filter is provided
        if (req.query._id) {
            query._id = req.query._id;
        }

        // Define the sort object
        const sort = {};

        // Check if a sort parameter is provided
        if (req.query.sort) {
            // Example: If the sort parameter is "price", sort by the "Price" property
            sort[req.query.sort] = 1; // 1 for ascending order, -1 for descending order
        }

        // Fetch products based on the query and sort
        const products = await Product.find(query).sort(sort);

        // Send the response with the fetched products
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const AddProduct = async (req, res) => {
    try {
        // Extract data from the request body
        const { Image, Name, Price, Category } = req.body;

        // Ensure Name and Category are saved in lowercase
        const product = new Product({
            Image,
            Name,
            Price,
            Category
        });

        // Save the product to the database
        await product.save();

        // Send a success response
        res.status(201).json({ message: 'Product added successfully.' });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const UpdateProduct = async (req, res) => {
    try {
        // Extract data from the request body and query parameters
        const { _id } = req.query;
        const { Image, Name, Price, Category } = req.body;

        // Ensure Name and Category are saved in lowercase
        const updatedProduct = {
            Image,
            Name,
            Price,
            Category,
        };

        // Find the product by _id and update it
        const result = await Product.findByIdAndUpdate(_id, updatedProduct);

        // Check if the product with the given _id was found and updated
        if (result) {
            res.json({ message: 'Product updated successfully.' });
        } else {
            res.status(404).json({ error: 'Product not found.' });
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const DeleteProduct = async (req, res) => {
    try {
        // Extract _id from the query parameters
        const { _id } = req.query;

        // Find the product by _id and remove it
        const result = await Product.findByIdAndDelete(_id);

        // Check if the product with the given _id was found and removed
        if (result) {
            res.json({ message: 'Product deleted successfully.' });
        } else {
            res.status(404).json({ error: 'Product not found.' });
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



module.exports = { getProduct, AddProduct, UpdateProduct, DeleteProduct }

