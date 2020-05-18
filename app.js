const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const ejs = require('ejs');
const path = require('path');

const bodyParser = require('body-parser');
const app = express();

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

//import routes;
const DashboardRoute = require('./routes/index');
const AdminRoute = require('./routes/admin');
//Database config
const { mongoURI } = require('./utils/database');
//Connecting to mongoose
mongoose.connect(mongoURI,
    {useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false })
    .then(() => console.log('Database Connected'))
    .catch(err => console.log(err));
//Preventing mongoose from global errors
mongoose.Promise = global.Promise;
//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//EndPoints
app.use('/', DashboardRoute);
app.use('/admin', AdminRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`http://localhost:${port}`))