const express = require('express');
const adminRoutes = require('../controllers/admin');
const authorize = require("./../middleware/auth");
const router = express.Router();

//POST => /admin/addadmin => REGISTER AN ADMIN
// router.post('/addadmin', adminRoutes.addAdmin);

// //POST => /admin/addproduct => ADD A PRODUCT
// router.post('/addproduct',   authorize.auth, authorize.checkadmin, adminRoutes.addProducts);
// //PUT => /admin/id => EDIT A PRODUCT
// router.put('/edit/:id', authorize.auth, authorize.checkadmin, adminRoutes.editProduct);
// //DELETE => /admin/deleteprod/id => DELETE A PRODUCT
// router.delete('/delete/:id', authorize.auth, authorize.checkadmin, adminRoutes.deleteProduct);

// //USER ROUTES
// //DELETE => /admin/delete/id => REMOVE A USER
// router.delete('/delete/:id', authorize.auth, authorize.checkadmin, adminRoutes.deleteUser);
// //GET => /admin/users => ALL USERS
// router.get('/users', authorize.auth, authorize.checkadmin, adminRoutes.getUsers);

router.post('/addadmin', adminRoutes.addAdmin);

//POST => /admin/addproduct => ADD A PRODUCT
router.post('/addproduct',    adminRoutes.addProducts);
//PUT => /admin/id => EDIT A PRODUCT
router.put('/edit/:id',  adminRoutes.editProduct);
//DELETE => /admin/deleteprod/id => DELETE A PRODUCT
router.delete('/delete/:id',  adminRoutes.deleteProduct);

//USER ROUTES
//DELETE => /admin/delete/id => REMOVE A USER
router.delete('/delete/:id',  adminRoutes.deleteUser);
//GET => /admin/users => ALL USERS
router.get('/users',  adminRoutes.getUsers);

module.exports = router;