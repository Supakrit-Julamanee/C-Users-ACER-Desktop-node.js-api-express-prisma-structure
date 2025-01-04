const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');
const authenticateToken = require('./middleware/authenticateToken');
const authorizeRole = require('./middleware/authorizeRole');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger-output.json');
const itemRoute = require('./routes/itemRoute');
const userRoutes = require('./routes/authRoute');
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Routes
app.use('/items', authenticateToken, authorizeRole('A'), itemRoute);
app.use('/auth', userRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;