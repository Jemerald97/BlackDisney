const express = require('express');
const router = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const client = require('./mysql');

  router.get('/', function(req, res, next) {
      const nick = req.session.nick;
      res.render('community', {
          title : "community", 
          nick : nick
      })
  });

module.exports = router; 