const Orders = require("../models/orders.js");
const Products = require("../models/products");

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Orders.getOrders();
    console.log("orders", orders)
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(`No orders found: ${err}`);
    console.log(err);
  }
};


exports.filterOrderBy = async (req, res) => {
    //products?col=catergory&filter=rings
    try {
        const {col, filter} = req.query
        console.log("col", col)
        console.log("filter", filter)

        if (!col && !filter) {
            res.status(404).json({message: "Enter a column and filter"})
        } else {
            const orders = await Orders.filterOrdersBy(col, filter)
          
            console.log("orders", orders)
            res.status(200).json(orders)
        }        
    } catch (err) {
        res.status(500).json(err)
        console.log(err, "error from filter by")
    }
}

exports.getOrderById = async (req, res, next) => {
  try {
    const id = req.params.order_id;
    console.log(id);
    const order = await Orders.getOrderById(id);
    // console.log(stall)
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: `error getting order` });
    console.log(err, "error from order by id");
  }
};

exports.getOrdersByAgentId = async (req, res, next) => {
  try {
    const agent_id = req.params.id;
    console.log("agent id,", agent_id);
    if (!agent_id) {
      res.status(404).json({ message: "That agent could not be found" });
    } else {
      const orders = await Orders.getOdersByAgentId(agent_id);
      console.log("Order Data:", orders);
      res.status(200).json(orders);
    }
  } catch (err) {
    res.status(500).json(`No orders found: ${err}`);
    console.log(err);
  }
};

exports.addOrder = async (req, res, next) => {
  try {
    const {customer_email} = req.body
    const order = req.body.order;
    console.log("order", order)
   const total = req.body.total
    if (!order) {
      res.status(404).json({ message: "Error processing your order"  });
    } else {
      const OrdersToInsert = order.map(order => (
      
        {
        
        product_id: order.product_id,
        status: order.status,
        customer_email: order.customer_email,
        customer_first_name: order.customer_first_name,
        customer_last_name: order.customer_last_name,
        customer_address: order.customer_address,
        customer_city: order.customer_city,
        customer_state: order.customer_state,
        customer_zip: order.customer_city,
        customer_phone: order.customer_phone,
        agent_commision: order.agent_commision,
        agent_id: order.agent_id,
        notes: order.notes
      }
      
      ));

      const product = await Products.filterBy('id', OrdersToInsert[0].product_id)
console.log("product", product)
      //INSERT AGENT COMMISION INTO AGENT PAGE
      console.log("OrdersToInsert: ", OrdersToInsert)
      const newOrder = {OrdersToInsert, order_total: total }
      const customer_email = OrdersToInsert.forEach(function(message, index) {
        let data = []
       
        let newstuff = Object.keys(message).forEach(function(prop) { 
              console.log(message[prop]);
const concatData = data.push(message[prop]) 
console.log("concat data", concatData)
          return   concatData
        })
console.log("data",data)
console.log("new stuff", newstuff)

        return data
    });
      const addedOrder = await Orders.addOrder(OrdersToInsert, total);
     
      console.log("customer email bottom", OrdersToInsert[0].customer_email)
      // console.log("a new order has been made they ordered", 
      
      //   customer_email[0], customer_email[1], customer_email[2], customer_email[3], customer_email[4],
      //   customer_email[5], customer_email[6], customer_email[7], customer_email[8], customer_email[9],
      //   customer_email[10], customer_email[11], customer_email[12],
      // )
      const msg = {
        to: "dailancooper@gmail.com",
        from: 'latifah.pres@gmail.com',
        subject: 'Order conformation',
        text: `We recieved a new order from ${OrdersToInsert[0].customer_email}, they ordered ${OrdersToInsert[0].product_id}. Items need to be shipped to ${OrdersToInsert[0].customer_address}, ${OrdersToInsert[0].customer_city}, ${OrdersToInsert[0].customer_state}, ${OrdersToInsert[0].customer_zip}. 
          The customer can be contacted at ${OrdersToInsert[0].customer_phone},
        `,
        html: 
        `
        <div>
       
        <div>
          This is a conformation that your order has been processed.
          You will receive a delivery time with in the next 24 hours. 
        Thanks for being a valued customer. Please see order below. 
        If any part of this order is incorrect please reach out to us at booking@coopershomefurniture.com
        <img src="${product[0].images}" alt="${product[0].title}"/> 
          <h4>${product[0].title}</h4>
          <h4>${product[0].price}</h4>
          <h4>${product[0].colors}</h4>
        </div>
        <div>
          <h2>Shipping Details</h2>
          <h4>Email ${OrdersToInsert[0].customer_email}</h4>
          <h4>Street address${OrdersToInsert[0].customer_address}</h4>
          <h4>City ${OrdersToInsert[0].customer_city}</h4>
          <h4>State ${OrdersToInsert[0].customer_state}</h4>
          <h4>Zip ${OrdersToInsert[0].customer_state}</h4>
          <h4>Phone ${OrdersToInsert[0].customer_phone}</h4>
        </div>
        </div>`
        // html: `<strong> We recieved a new order from ${OrdersToInsert[0].customer_email}, they ordered ${product[0].title}, price: ${product[0].price}, color: ${product[0].colors}. The item number is ${product[0].item_number} .
        // <img src="${product[0].images}" alt="${product[0].title}"/> Items need to be shipped to ${OrdersToInsert[0].customer_address}, ${OrdersToInsert[0].customer_city}, ${OrdersToInsert[0].customer_state}, ${OrdersToInsert[0].customer_zip}. 
        // The customer can be contacted at ${OrdersToInsert[0].customer_phone},</strong>`,
      };
      sgMail.send(msg).then(() => {
        console.log('Message sent', msg)
    }).catch((error) => {
        console.log(error.response.body)
        // console.log(error.response.body.errors[0].message)
    })
      console.log("Added Order:", newOrder);
      res.status(200).json(addedOrder);
    }
  } catch (err) {
    res.status(500).json(`Cannot add order: ${err}`);
    console.log(err);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const id = req.params.order_id;
    console.log("order ID:", id);
    if (!id) {
      res.status(404).json({ message: "You are missing an order id" });
    } else {
      let order = req.body;
      const updatedOrder = await Orders.updateOrder(order, id);
      console.log("Updated Order:", updatedOrder);
      res.status(200).json(updatedOrder);
    }
  } catch (err) {
    res.status(500).json(`Cannot update order: ${err}`);
    console.log(err);
  }
};

exports.removeOrder = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log("order ID:", id);
    if (!id) {
      res.status(404).json({ message: "You are missing a order id" });
    } else {
      const deletedOrder = await Orders.deleteOrder(id);
      console.log("Deleted order", deletedOrder);
      res.status(200).json(deletedOrder);
    }
  } catch (err) {
    res.status(500).json(`Cannot delete order: ${err}`);
    console.log(err);
  }
};


