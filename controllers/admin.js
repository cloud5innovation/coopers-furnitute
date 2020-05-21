const Products = require('../models/products');
const Users = require('./../models/users');

//TODO: ADD GET ADMIN BY ID
exports.addAdmin = async (req, res) => {
    try{
        const {email, firebase_id, first_name, last_name, admin} = req.body;
        if (!email || !firebase_id || !first_name || !last_name || !admin) {
            res.status(400).json({message: 'Please enter all fields'})
        } else {
            const newUser = await Users.addUser(req.body)
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
            supplier: req.body.supplier,
        }
        console.log(product);
       
    if (!product.title || !product.price || !product.description || !product.image_url || !product.category || !product.quantity || !product.item_number || !product.supplier) {
        res.status(400).json({message: `Please enter all required fields`})
    } else {
        const productData = await Products.addProduct(product);
        res.status(201).json('Product added')
    }
} catch (err) {
    res.status(500).json(`Product not added`);
    console.log(err, 'error from product by id')
}
};

exports.editProduct = async (req, res, next) => {
    const {id}  = req.params;
    console.log(id, "id")
    const updatedProduct = req.body;
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
        res.status(500).json(`No users found`);

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