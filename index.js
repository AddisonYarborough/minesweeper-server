// Import express and create an app instance
const app = require('express')();

// Import cors module
const cors = require('cors');

// Import and mount the routes by passing them into the app
app.use(require('./routes/serverTest'));
app.use(require('./routes/start'));
app.use(require('./routes/select'));

// Use cors instance module in the app
app.use(cors());

// Define the server port
const PORT = process.env.PORT || 3001;

// Listener
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
