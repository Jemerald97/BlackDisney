const express = require('express');
const router = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const client = require('./mysql');

router.get('/', function(req, res, next) {
    let members = new Array;
    const nick = req.session.nick;
    client.query('SELECT * FROM members WHERE nick = ?', [nick], function(err,data){
      res.render('member', {
        nick : nick,
        logined : true
      });
    });
  });

module.exports = router; 