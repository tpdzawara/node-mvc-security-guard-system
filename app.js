const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const bodyParser = require('body-parser');
const app = express();

const authenticate = require('./middleware/authenticate');

//import routes
const ClientRoute = require('./routes/client');
const GuardRoute = require('./routes/guard');
const StuffRoute = require('./routes/stuff');
const adminROute = require('./routes/admin');
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


app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//EndPoints
app.use('/',  ClientRoute);
app.use('/api',  GuardRoute)
app.use('/api',  StuffRoute)
app.use('/admin', adminROute)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`http://localhost:${port}`))