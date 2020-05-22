const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

//Access data from client tabs
router.get('/client', (req, res) => {
  res.render('clients', { user: req.user })
});

//Access data from guard tabs
router.get('/guard', (req, res) => {
  res.render('guards', { user: req.user })
});

//Access data from guard tabs
router.get('/stuff', (req, res) => {
  res.render('stuff', { user: req.user })
});


module.exports = router;
