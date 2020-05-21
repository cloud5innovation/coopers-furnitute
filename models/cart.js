const db = require('./../dbconfig');

getCartItems = id => {
    return db("cart")
      .innerJoin("products", "cart.product_id", "products.id")
      .innerJoin("users", "cart.firebase_id", "users.firebase_id")
      .select([
        "cart.id",
        "product_id",
        "products.title",
        "products.description",
        "products.price",
        "products.image_url",
        "cart.quantity",
        "users.firebase_id",
      ])
      .where({ "cart.firebase_id": id });
  };

  addToCart = (product_id, firebase_id) => {
    let addedItem = {
      product_id,
      firebase_id
    };
  
    console.log("added item", addedItem);
    return db("cart").insert(addedItem);
  };

  removeFromCart = (id) => {
    return db("cart").where({ id }).delete();
  };


  editCart = (id, updates) => {
    return db("cart").where({ id }).update(updates);
  };

  module.exports = {
      addToCart,
      getCartItems,
      removeFromCart,
  };