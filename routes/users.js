const express = require('express');
const usersRoutes = require('../controllers/users');
const router = express.Router();


//GET => /user/firebase_id => USER PROFILE
router.get('/:firebase_id',  usersRoutes.getUserById);
//GET => /user/id/cart => USER'S CART
router.get('/:id/cart', usersRoutes.getCart);
//POST => /user/register => SIGN UP 
router.post('/register', usersRoutes.addUser);
//POST => /user/add-to-cart/id => ADD ITEM TO CART
router.post('/add-to-cart/:id',  usersRoutes.addToCart);
//PUT => /user/id => EDIT USER ACCOUNT 
router.put('/:id',  usersRoutes.editUser);
//DELETE => /user/id => REMOVE ACCOUNT
router.delete('/:id',  usersRoutes.deleteUser);
//DELETE => /user/removefromcart/:id?prod=1 => REMOVE PRODUCT FROM CART
router.delete('/removefromcart/:id', usersRoutes.removeFromCart);

module.exports = router 