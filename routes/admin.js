const express = require('express');
const adminRoutes = require('../controllers/admin');
const router = express.Router();

//POST => /admin/addadmin => REGISTER AN ADMIN
router.post('/addadmin', adminRoutes.addAdmin);

//POST => /admin/addproduct => ADD A PRODUCT
router.post('/addproduct', adminRoutes.addProducts);
//PUT => /admin/id => EDIT A PRODUCT
router.put('/edit/:id', adminRoutes.editProduct);
//DELETE => /admin/deleteprod/id => DELETE A PRODUCT
router.delete('/delete/:id', adminRoutes.deleteProduct);

//USER ROUTES
//DELETE => /admin/delete/id => REMOVE A USER
router.delete('/delete/:id', adminRoutes.deleteUser);
//GET => /admin/users => ALL USERS
router.get('/users',  adminRoutes.getUsers);

module.exports = router;