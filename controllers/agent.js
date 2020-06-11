const Products = require('../models/products');
const Users = require('./../models/users');
const generateAdmin = require("./../middleware/auth");

exports.addAgent = async (req, res) => {
    try{
        const agent = {
            email: req.body.email,
            firebase_id: req.body.firebase_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            agent: true,
        }
        if (!agent.email || !agent.firebase_id || !agent.first_name || !agent.last_name) {
            res.status(400).json({message: 'Please enter all fields'})
        } else {
            const newUser = await Users.addUser(agent)
            res.status(201).json({message: "Agent account has been created"});
        }
    } catch (err) {
        res.status(500).json({message: err});
        console.log("error from add agent: ", err)
    }
};