// const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database');

const app = express();

// app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Defining routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// Handle undefined routes
app.use(errorController.get404);

mongoConnect(client => {
    console.log('Client: ', client);
    app.listen(9000);
})

// const server = http.createServer(app);
// server.listen(9000);

// line 16 and 17 can be combined to below

