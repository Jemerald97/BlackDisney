const express = require('express');
const router = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const client = require('./mysql');

  router.get('/', function(req, res, next) {
    const nick = req.session.nick;
    client.query('SELECT * FROM members WHERE nick = ?', [nick], function(err,data){
      res.render('member', {
        title : "MyPage",
        nick : nick,
        attraction1 : data[0].attraction1,
        attraction2 : data[0].attraction2,
        attraction3 : data[0].attraction3,
        logined : true
      });
    });
  });

module.exports = router; 