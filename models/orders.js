const db = require("./../dbconfig");

 addOrder = (addedOrder, order_total) => {
     let newOrder = {
         addedOrder,
     }
  return db("order").insert(addedOrder, order_total);

};

filterOrdersBy = (col, filter) => {
    return db("order").where(`${col}`, filter)
};

getOrders = () => {
    return db("order")
    .innerJoin("products", "order.product_id", "products.id")
    .select("order.id", "order.order_total", "order.customer_email", "order.customer_email", "order.customer_address", "order.customer_city", "order.customer_state", "order.customer_zip", "order.customer_phone", "order.agent_id", "order.agent_commision", "products.title", "products.price", "products.item_number", "products.item_name" )
};

getOrdersByAgentId = (agent_id) => {
    return db("order").where({"agent_id": agent_id})
};


async function deleteOrder (id) {
    try{
        return db("order").where({id: id}).delete();
    }
    catch(err){
        console.log(err);
    }
};

async function updateOrder(order, id) {
    try{
        console.log("Our updated order :", order);
        return db("order").where({id: id}).update(order);
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {
    addOrder,
    getOrders,
    filterOrdersBy,
    getOrdersByAgentId,
    deleteOrder,
    updateOrder
}