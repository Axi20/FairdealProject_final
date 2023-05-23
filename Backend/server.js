const express = require('express');
const registration = require('./routes/user')
const Userlogin = require('./routes/login');
const carsRoutes = require('./routes/cars');
const rentRoutes = require('./routes/rents');
const rentModel = require('./models/rent');
const allUserRoutes = require('./routes/allUser');
const openRoutes = require('./routes/open');
const rentplaceRoutes = require('./routes/rentplace');
const { sendConfirmationEmail } = require('./sendEmail');
const app = express();
app.use(express.json());


// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
  next();
});


// Mount the User router at the /sign-up URL path
app.use('/registration', registration);
app.use(Userlogin);
app.use('/cars', carsRoutes);
app.use('/rent', rentRoutes);
app.use('/open', openRoutes);
app.use('/rentplace', rentplaceRoutes);
app.use('/customers', allUserRoutes);

// app.use('/registration', registration);
// app.use('/login', login);

app.post('/send-confirmation-email', async (req, res) => {
  // Call the sendConfirmationEmail function here
  try {
    // Get the necessary data from the request body
    const { email, name, carName, carPlateNumber, carModel, carYear, rentalStart, rentalEnd, finalPrice, office, phoneNumber, contactEmail } = req.body;

    // Call the sendConfirmationEmail function with the necessary arguments
    await sendConfirmationEmail(email, name, carName, carPlateNumber, carModel, carYear, rentalStart, rentalEnd, finalPrice, office, phoneNumber, contactEmail);

    res.status(200).json({ message: 'Confirmation email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send confirmation email' });
  }
});

// Set the port number using the PORT environment variable
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
