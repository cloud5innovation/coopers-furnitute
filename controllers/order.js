const Orders = require("../models/orders.js");
const Products = require("../models/products");

// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
    const id = req.params.id;
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
    console.log("product_id", req.body.product_id)
    const order = 
    {
      customer_first_name: req.body.customer_first_name, 
      customer_last_name: req.body.customer_last_name, 
      email: req.body.email, 
      customer_address: req.body.customer_address, 
      customer_city: req.body.customer_city, 
      customer_state: req.body.customer_state, 
      customer_zip: req.body.customer_zip, 
      customer_phone: req.body.customer_phone, 
      agent_id: req.body.agent_id, 
      order_total: req.body.order_total, 
      notes: req.body.notes,
      product_id: req.body.product_id,
      status: req.body.status
    } 
    // const order = req.body.order;
   const total = req.body.total
   const order_items = req.body.order_items
    if (!order) {
      res.status(404).json({ message: "Error processing your order"  });
    } else {
      const addedOrder = await Orders.addOrder(order);
      console.log("addedOrder", addedOrder)
      const addedOrderItems =  order_items.map(item => ({
        order_id: addedOrder[0],
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
        color_id: item.color_id,
        image_id: item.image_id,
      }))
      const newOrder = {order, addedOrderItems}
      const addItem = await Orders.addToOrderItems(addedOrderItems)
console.log("can i loop foe email", addedOrderItems.order_id)
      // const OrdersToInsert = order.map(order => (
      
      //   {
        
      //   product_id: order.product_id,
      //   status: order.status,
      //   customer_email: order.customer_email,
      //   customer_first_name: order.customer_first_name,
      //   customer_last_name: order.customer_last_name,
      //   customer_address: order.customer_address,
      //   customer_city: order.customer_city,
      //   customer_state: order.customer_state,
      //   customer_zip: order.customer_city,
      //   customer_phone: order.customer_phone,
      //   agent_commision: order.agent_commision,
      //   agent_id: order.agent_id,
      //   notes: order.notes
      // }
      
      // ));


      
      //INSERT AGENT COMMISION INTO AGENT PAGE
   

      // const custOrder = await Orders.getOrdersByCustomer(order.email);

      // console.log("customer order", custOrder)
    //   const msg = {
    //     to: "latifahpresident@gmail.com",
    //     from: 'latifah.pres@gmail.com',
    //     subject: 'Order conformation',
    //     text: `We recieved a new order from ${customer_email}, they ordered ${OrdersToInsert[0].product_id}. Items need to be shipped to ${OrdersToInsert[0].customer_address}, ${OrdersToInsert[0].customer_city}, ${OrdersToInsert[0].customer_state}, ${OrdersToInsert[0].customer_zip}. 
    //       The customer can be contacted at ${OrdersToInsert[0].customer_phone},
    //     `,
    //     html: `
    //     <p>
    //     Order conformation. This is a conformation that your order has been processed.
    //       You will receive a delivery time with in the next 24 hours. Thanks for being a valued customer. Please see order below. If any part of this order is incorrect please reach out to us at booking@coopershomefurniture.com
        
    //     </p>
    //     {{#each product}}
     
    //       <p>{{this.title}}</p>
       
      
    //   {{/each}}
        
        
    //     `
       
    //     // html: `<strong> We recieved a new order from ${OrdersToInsert[0].customer_email}, they ordered ${product[0].title}, price: ${product[0].price}, color: ${product[0].colors}. The item number is ${product[0].item_number} .
    //     // <img src="${product[0].images}" alt="${product[0].title}"/> Items need to be shipped to ${OrdersToInsert[0].customer_address}, ${OrdersToInsert[0].customer_city}, ${OrdersToInsert[0].customer_state}, ${OrdersToInsert[0].customer_zip}. 
    //     // The customer can be contacted at ${OrdersToInsert[0].customer_phone},</strong>`,
    //   };
    //   sgMail.send(msg).then(() => {
    //     console.log('Message sent', msg)
    // }).catch((error) => {
    //     console.log(error.response.body)
    //     // console.log(error.response.body.errors[0].message)
    // })
      res.status(200).json({message: `Order Created`});
    }
  } catch (err) {
    res.status(500).json(`Cannot add order: ${err.message}`);
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


