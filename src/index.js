const path = require('path');
// Server template
const express = require('express');
// Show log request
const morgan = require('morgan');
// Config template view
const handlebars = require('express-handlebars');
// Create app express
const app = express();
const port = 8080;

// Import routes
const route = require('./routes');

// Import db
const db = require('./config/db/index');
// Connect db
db.connect();

// Create path static
app.use(express.static(path.join(__dirname, 'public')));

//middle ware form
app.use(express.urlencoded({
  extended: true
}));
//middle ware js
app.use(express.json());

// app.use(morgan('combined'))

// Template engine
app.engine('hbs', handlebars({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

// Server listen
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});