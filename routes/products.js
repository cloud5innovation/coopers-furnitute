const express = require('express');
const productsRoutes = require('../controllers/products');
const router = express.Router();

router.get('/',  productsRoutes.getProducts);
router.get('/product/:id', productsRoutes.getProductById);
router.get('/product', productsRoutes.filterBy);
// router.get('/product/category/:cat', productsRoutes.getByCat);

// router.post('/addproduct', productsRoutes.addProducts);
// router.delete('/:id', productsRoutes.deleteProduct);

module.exports = router;