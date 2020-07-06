const express = require('express');
const ordersRoutes = require('../controllers/order');
const router = express.Router();
const isAuthenticated = require("./../middleware/auth");

router.post('/place-order', ordersRoutes.addOrder);
router.get('/', ordersRoutes.getOrders);

module.exports = router