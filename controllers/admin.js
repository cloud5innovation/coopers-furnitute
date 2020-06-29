const Products = require('../models/products');
const Users = require('./../models/users');
const Cart = require('./../models/cart');
const generateAdmin = require("./../middleware/auth");

exports.addAdmin = async (req, res) => {
    try{
        const admin = {
            email: req.body.email,
            firebase_id: req.body.firebase_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            admin: true,
        }
        if (!admin.email || !admin.firebase_id || !admin.first_name || !admin.last_name) {
            res.status(400).json({message: 'Please enter all fields'})
        } else {
            const newUser = await Users.addUser(admin);
            const cart = await Cart.addCart(admin.firebase_id);

            res.status(201).json({message: "Admin account has been created"});
        }
    } catch (err) {
        res.status(500).json({message: err});
        console.log("error from add admin: ", err)
    }
};

exports.addProducts = async (req, res) => {
    try {
        const product = {
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            image_url: req.body.image_url,
            category: req.body.category,
            quantity: req.body.quantity,
            item_number: req.body.item_number,
            item_name: req.body.item_name,
            supplier: req.body.supplier,
            
        }
        const colors = req.body.color
        console.log("body colors", colors)
    if (!product.title || !product.price || !product.description || !product.image_url || !product.category || !product.quantity || !product.item_number || !product.item_name  || !product.supplier) {
        res.status(400).json({message: `Please enter all required fields`})
    } else {
        // const addedColors = colors.map(color => ({

        //     return color: color
        // }));
        const addedColors = colors.map(color => ({
           name: color,
           product_title: product.title
          }));
          console.log("added colors", addedColors)

        const productData = await Products.addProduct(product);
        const newColor = await Products.addColor(addedColors);

        res.status(201).json('Product added')
    }
} catch (err) {
    if (err.code === '23505') {
        res.status(500).json({message: "That product already exists"});

    } else {
        res.status(500).json({message: "There was an error adding that product please try again"});

    }
    console.log(err, 'error from add product')
}
};

exports.editProduct = async (req, res, next) => {
    const {id}  = req.params;
    console.log(id, "id")
    const updatedProduct = req.body.updates;
    try {
        const product = await Products.productById(id)
        if(!product) {
            //TODO: BETTER ERROR HANDLING NOT THROWING ERROR HERE
            res.status(404).json({message: "That product was not found"})
        } else {
            const newProduct = await Products.editProduct(id, updatedProduct);
            res.status(200).json(`Your product was edited`)
        }
    } catch (err) {
        if(err == "Undefined binding")
        res.status(500).json(err)
        console.log(err, 'error from edit');
    }
};

exports.deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    console.log("id", id)
    // products.productById(id)
    try {
        const productData = await Products.deleteProduct(id)
        if (productData) {
            res.status(204).json(`product deleted`)
        } else {
            res.status(404).json({message: `There was an error, product not deleted`})
        }
    } catch (err) {
        res.status(500).json(`That product does not exist`)
    }
};

exports.getUsers = async (req, res) => {
    try {
        const UserData = await Users.users();
        if (UserData.length === 0) {
            res.status(404).json({message: "No customers found"})
        } else {
        res.status(200).json(UserData);
        }
    } catch (err) {
        res.status(500).json({message: "Error getting users: ", err});

    }
};

exports.deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            res.status(404).json(`User not deleted`);
        } else {
            const deletedUser = await Users.deleteUser(id);
            res.status(200).json(`User has been deleted`);
        }
    } catch(err) {
        res.status(500).json(`error deleting user`);
    }
};

exports.addOrder = async (req, res, next) => {
    try {
        const {customer_email} = req.body
      if (!customer_email) {
        res.status(404).json({ message: "Please add the customers email to complete this order" });
      } else {
        const orders = req.body;
        const OrdersToInsert = orders.map(order => ({
          product_id: order.product_id,
          customer_id: order.customer_id,
          status: order.status,
          order_total: order.order_total,
          customer_email: order.customer_email,
          agent_id: order.agent_id,
        }));
        console.log("OrdersToInsert: ", OrdersToInsert);
  
        const addedOrder = await Orders.addOrderByVendorId( OrdersToInsert);
  
        console.log("Added Order:", addedOrder);
        res.status(201).json({message: "Your order has beend added"});
      }
    } catch (err) {
      res.status(500).json(`Cannot add order: ${err}`);
      console.log(err);
    }
  };