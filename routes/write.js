const express = require('express');
const router = express.Router();
const client = require('./mysql');
const session = require('express-session');

router.get('/', function(req, res, next) {
  const id = req.params.id;
  console.log(id);
  const nick = req.session.nick;
  client.query('SELECT * FROM comments WHERE attraction = ?', [id], function(err,data){
    res.render('write', {
      title : 'writeSubject',
      nick : nick,
      logined : true
    });
  });
});

router.post('/', function(req,res,next){
  const body = req.body;
  const nick = req.session.nick;
  const comment = body.comment;

  client.query('select * from comments; INSERT INTO comments (nick, comment) values (?, ?)', [nick, comment],  function(err,data){
    res.redirect('/community');
  });
});

router.post('/update', function(req,res,next){
  const body = req.body;
  const nick = req.session.nick;
  const comment = body.comment;
  client.query('UPDATE comments SET comment = ?  WHERE nick = ?', [comment, nick], function(){
    res.redirect('/community');
  });
});

module.exports = router;