const express = require('express');
const agentRoutes = require('../controllers/agent');
const authorize = require("./../middleware/auth");
const router = express.Router();

//POST => /admin/addadmin => REGISTER AN ADMIN
router.post('/addagent', agentRoutes.addAgent);

module.exports = router;