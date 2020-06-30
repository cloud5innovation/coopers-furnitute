const db = require('./../dbconfig');
getCartById = id => {
  return db("cart")
    .where({ firebase_id: id })
    .first();
};

// getCartItems = id => {
//     return db("cart_item")
//       .innerJoin("products", "cart.product_id", "products.id")
//       .innerJoin('cart', 'cart_item.cart_id', 'cart.firebase_id')  
//       .innerJoin('colors', 'products.title', 'colors.name') 
//       .innerJoin('images', 'products.title', 'images.image_url')       
//       .select([
//         "cart_item.id",
//         "product_id",
//         "products.title",
//         "products.description",
//         "products.price",
//         "products.image_url",
//         "cart.quantity",
       
//       ])
//       .where({cart_id: id })
//       // .where({ "cart_item.cart_id": `cart_item.${id}`});
//   };

getCartItems = id => {
  return db('cart_item')
    .innerJoin('products', 'cart_item.product_id', 'products.id')
    .innerJoin('colors', 'products.title', 'colors.name') 
    .innerJoin('cart', 'cart_item.cart_id', 'cart.firebase_id')
    .select([
      "cart_item.id",
        "product_id",
        "products.title",
        "products.description",
        "products.price",
        "products.image_url",
      // 'cart_item.id',
      // 'product_id',
      // 'product.title',
      // 'product.description',
      // 'product.price',
      // 'product.image_url',
      // 'product.category',
      // 'product.vendor_id',
      // 'cart.firebase_id',
      // 'cart.firebase_id',
      // 'vendor.stripe_id',
      // 'cart_item.quantity',
    ])
    .where({ cart_id: id });
};
  // addToCart = (product_id, firebase_id) => {
  //   let addedItem = {
  //     product_id,
  //     firebase_id
  //   };
  
  //   console.log("added item", addedItem);
  //   return db("cart").insert(addedItem);
  // };

  addToCart = (product_id, quantity, firebase_id, price) => {
    let addedItem = {
      product_id,
      quantity,
      firebase_id,
      price
    };
  
    console.log("added item", addedItem.price);
    return db("cart_item").insert(addedItem);
  };

  removeFromCart = (id) => {
    return db("cart_item").where({ id }).delete();
  };


  editCart = (id, updates) => {
    return db("cart_item").where({ id }).update(updates);
  };

  async function addCart(firebaseId) {
    try {
      let addedCart = {
        firebase_id: firebaseId
      };
      const [id] = await db("cart")
        .insert(addedCart)
        .returning("id");
      return getCartById(id);
    } catch (err) {
      console.log(err);
    }
  };

 

  module.exports = {
      addToCart,
      getCartItems,
      removeFromCart,
      addCart,
      
  };