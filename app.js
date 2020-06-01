const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const exphbs = require('express')
const flash = require('connect-flash');
const path = require('path');

const bodyParser = require('body-parser');
const app = express();

// Passport Config
require('./config/passport')(passport);

app.use(morgan('dev'))

//Set views

app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

//import routes;
const DashboardRoute = require('./routes/index');
const AdminRoute = require('./routes/admin');
const ClientRoute = require('./routes/client');
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
//middleware (you can now also use express as body parser)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
  
  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Connect flash
  app.use(flash());
  
  // Global variables
  app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });
  


//EndPoints
app.use('/', DashboardRoute);
app.use('/admin', AdminRoute);
app.use('/clients', ClientRoute);

const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`http://localhost:${port}`))