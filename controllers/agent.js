const Users = require('./../models/users');
const Agent = require('./../models/agent');
const Cart = require('./../models/cart');

exports.addAgent = async (req, res) => {
    try{
        const agent = {
            email: req.body.email,
            firebase_id: req.body.firebase_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            address: req.body.address,
           city: req.body.city,
           state: req.body.state,
           zip: req.body.zip,
           phone: req.body.phone,
            agent: true,
        }

        const agentData = {
            cash_app_name: req.body.cash_app_name,
            agent_id: req.body.firebase_id,
        }
        console.log("user", agent)

        console.log("agent data", agentData)
        if (!agent.email || !agent.firebase_id || !agent.first_name || !agent.last_name || !agent.address || !agent.city || !agent.state || !agent.zip || !agent.phone || !agentData.cash_app_name) {
            res.status(400).json({message: 'Please enter all fields'})
        } else {
            const newUser = await Users.addUser(agent);
            const newAgent = await Agent.addAgent(agentData);
            const cart = await Cart.addCart(agent.firebase_id);
            res.status(201).json({message: "Agent account has been created"});
        }
    } catch (err) {
        res.status(500).json({message: err});
        console.log("error from add agent: ", err)
    }
};