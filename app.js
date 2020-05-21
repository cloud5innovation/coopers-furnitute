const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');

app.use(express.json());
//TODO: SHOULD MORGAN LOGS BE UPLOADED TO HEORKU OR KEPT FOR DEVELOPMENT
// app.use(morgan('combined', {stream: accessLogStream}));

app.use(helmet());
app.use(cors());
app.use(function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    next();
});

app.get('/sanity', (req, res) => {res.send('sanity check!')});

app.use('/', productsRoutes);
app.use('/user', usersRoutes);
app.use('/admin', adminRoutes);

module.exports = app;