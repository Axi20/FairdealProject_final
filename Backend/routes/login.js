const express = require('express');
const router = express.Router();
const Userlogin = require('../controllers/login');

// Map the /sign-up URL path to the User controller's signUp method
router.post('/login', Userlogin);

// Export the User router
module.exports = router;
