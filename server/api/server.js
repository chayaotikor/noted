const express = require('express');
/* Import Middleware */
const configureMiddleware = require('../middleware/globalMiddleware');
const errorHandler = require('../middleware/errorMiddleware');

const server = express();
/* Import Routes */
const noteRoutes = require('../routes/noteRoutes');

configureMiddleware(server);

/* Set Route endpoints*/
server.use('/api/notes', noteRoutes);

/* Use error Middleware */
server.use(errorHandler);

server.get('/', (req,res) => {
    res.status(200).json('sanity check') 
}) 
 
module.exports = server;
