const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const User = require('../models/User');


// Map the /sign-up URL path to the User controller's signUp method
// router.post('/registration', userController.signUp);
router.post('/', userController.signUp);


router.get('/users/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findByEmail(email);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Export the User router
module.exports = router;
