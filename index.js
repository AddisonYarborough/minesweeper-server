// Import express and create an app instance
const app = require('express')();

// Import and mount the routes by passing them into the app
app.use(require('./routes/serverTest'));
app.use(require('./routes/start'));
app.use(require('./routes/select'));

// Define the server port
const PORT = 3001;

// Listener
app.listen(PORT, () => console.log(`Server running at: http://localhost:${PORT}/`));
