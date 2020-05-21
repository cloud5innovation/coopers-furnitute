const express = require('express');
const productsRoutes = require('../controllers/products');
const router = express.Router();

router.get('/',  productsRoutes.getProducts);
router.get('/product', productsRoutes.filterBy);
// router.post('/addproduct', productsRoutes.addProducts);
router.get('/:id', productsRoutes.getProductById);
// router.delete('/:id', productsRoutes.deleteProduct);

module.exports = router;