const db = require("./../dbconfig");

 addOrder = (addedOrder) => {
  return db("orders").insert(addedOrder);

};

filterOrderBy = (col, filter) => {
    return db("orders").where(`${col}`, filter)
};

getOrders = () => {
    return db("orders")
};

module.exports = {
    addOrder,

}