// Import dependencies, routes
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

//PORT Set-up
const PORT = process.env.port || 3001;
const app = express();

//Initialize Express.js with Routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//Connecting database to PORT
db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });