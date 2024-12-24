require('dotenv').config(); // Load environment variables
const http = require('http');
const app = require('./app'); // Import the Express app

// Get the port from environment variables or use a default value
const PORT = process.env.NODE_PORT || 1234;

// Create an HTTP server
const server = http.createServer(app);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle uncaught exceptions and rejections
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1); // Exit the application with an error code
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  // Optionally, you could log or perform specific actions here.
});
