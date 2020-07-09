const db = require('../dbconfig.js');

products = () => {
    return db('products')
    .innerJoin('colors', 'products.title', 'colors.product_title')
    .innerJoin('images', 'products.title', 'images.product_title')
    .select('products.id', 'products.title', 'products.price', 'products.description', 'products.category', 'products.quantity', 'products.item_number', 'products.supplier', 
    'products.out_of_stock', 'products.back_in_stock', 'colors.id as color_id', 'colors.name as colors', 'images.id as image_id', 'images.image_url as images')
};

productById = (id) => {
    console.log("id from model", id)
    return db('products')

    // .innerJoin('colors', 'products.title', 'colors.product_title')
    .select('products.id', 'products.title', 'products.price', 'products.description', 'products.image_url', 'products.category', 'products.quantity', 'products.item_number', 'products.supplier')

    .where({'products.id': id})

};

getByCategory = (cat) => {
    return db('products')
    .innerJoin('colors', 'products.title', 'colors.product_title')
    .innerJoin('images', 'products.title', 'images.product_title')
    .select('products.id', 'products.title', 'products.price', 'products.description', 'products.category', 'products.quantity', 'products.item_number', 'products.supplier', 'products.out_of_stock', 'products.back_in_stock', 'colors.name as colors', 'images.image_url as images')

    .where({'products.category': cat})
}

addProduct = (product) => {
    return db('products').insert(product)
};

addColor =(color) => {
    return db('colors').insert(color);
};

addImage =(image) => {
    return db('images').insert(image);
};
editProduct = (id, product) => {
    return db('products').where({ id }).update(product)
};

deleteProduct = (id) => {
    return db('products').where({ id }).del()
};

filterBy = (col, filter) => {
  
    return db('products')
    .innerJoin('colors', 'products.title', 'colors.product_title')
    .innerJoin('images', 'products.title', 'images.product_title')
    .select('products.id', 'products.title', 'products.price', 'products.description', 'products.category', 'products.quantity', 'products.item_number', 'products.supplier', 'colors.id as color_id',  'colors.name as colors', 'products.out_of_stock', 'images.id as image_id', 'images.image_url as images')

    .where(`products.${col}`, filter)
};

colorBy = (product_title) => {
    console.log("title from backend", product_title)
    return db('colors')
    // .innerJoin('colors', 'products.title', 'colors.product_title')
    .where({'colors.product_title': product_title})
};

imageBy = (product_title) => {
    console.log("title from backend", product_title)
    return db('images')
    // .innerJoin('colors', 'products.title', 'colors.product_title')
    .where({'images.product_title': product_title})
};

getColors = () => {
    return db('colors');
};

getImages = () => {
    return db('images');
};
module.exports = {
    products,
    productById,
    addProduct,
    editProduct,
    deleteProduct,
    filterBy,
    addColor,
    colorBy,
    getColors,
    addImage,
    imageBy,
    getImages,
    getByCategory
}