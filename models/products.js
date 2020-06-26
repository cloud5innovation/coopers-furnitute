const db = require('../dbconfig.js');

products = () => {
    return db('products')
    .select('id', 'title', 'price', 'description', 'image_url', 'category', 'quantity', 'item_number', 'supplier', 'out_of_stock', 'back_in_stock')
};

productById = (id) => {
    console.log("id from model", id)
    return db('products')

    // .innerJoin('colors', 'products.title', 'colors.product_title')
    .select('products.id', 'products.title', 'products.price', 'products.description', 'products.image_url', 'products.category', 'products.quantity', 'products.item_number', 'products.supplier')

    .where({'products.id': id})

};

addProduct = (product) => {
    return db('products').insert(product)
};

addColor =(color) => {
    return db('colors').insert(color);
};

editProduct = (id, product) => {
    return db('products').where({ id }).update(product)
};

deleteProduct = (id) => {
    return db('products').where({ id }).del()
};

filterBy = (col, filter) => {
    // let items  = {
    //     col, filter
    // }
    return db('products')
    .innerJoin('colors', 'products.title', 'colors.product_title')
    .select('products.id', 'products.title', 'products.price', 'products.description', 'products.image_url', 'products.category', 'products.quantity', 'products.item_number', 'products.supplier', 'colors.name as colors', 'products.out_of_stock')

    .where(`products.${col}`, filter)
};

colorBy = (product_title) => {
    console.log("title from backend", product_title)
    return db('colors')
    // .innerJoin('colors', 'products.title', 'colors.product_title')
    .where({'colors.product_title': product_title})
};
module.exports = {
    products,
    productById,
    addProduct,
    editProduct,
    deleteProduct,
    filterBy,
    addColor,
    colorBy
}