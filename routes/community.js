const express = require('express');
const router = express.Router();
const client = require('./mysql');
const session = require('express-session');

router.get('/', function(req, res, next) {
  const nick = req.session.nick;
  client.query('SELECT * FROM members WHERE nick = ?', [nick], function(err,data){
    res.render('community', {
      title : 'myAttraction',
      nick : nick,
      logined : true
    });
  });
});

router.post('/', function(req,res,next){
  const 
})

module.exports = router;