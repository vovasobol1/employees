var express = require('express');
var router = express.Router();

/* GET users listing. */
// /api/user/login
router.post('/login', function(req, res, next) {
  res.send('login');
});

// /api/user/register
router.post('/register', function(req, res, next) {
  res.send('register');
});

// /api/user/current
router.post('/current', function(req, res, next) {
  res.send('current');
});

module.exports = router;
