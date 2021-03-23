const express = require('express');
const router = express.Router();
const client = require('./mysql');
const session = require('express-session');
const moment = require('moment');

router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  const nick = req.session.nick;
  client.query('SELECT * FROM comments WHERE attraction = ?', [id], function(err,data){
    res.render('view', {
      title : 'Attraction'+id,
      data : data,
      nick : nick,
      logined : true, 
      update : false, 
      moment : moment
    });
  });
});

router.post('/:id/write', function(req,res,next){
  const body = req.body;
  const id = req.params.id;
  const nick = req.session.nick;
  const comment = body.comment;

  client.query('select * from comments; INSERT INTO comments (attraction, nick, comment) VALUES (?, ?, ?)', [id, nick, comment], function(){
    res.redirect('/view/'+id);
  })
});

router.get('/:id/delete/:num', function(req,res,next){
    //const id = req.params.id;
    const num = req.params.num;
    console.log(num);
    client.query('DELETE FROM comments WHERE num = ?', [num], function(err, data){
        res.redirect('/view');
    });
});

router.get('/:id/update/:num', function(req,res,next){
    const id = req.params.id;
    const num = req.params.num;
    console.log(num);
    const nick = req.session.nick;
    client.query('SELECT * FROM comments WHERE attraction = ?', [id] , function(err,data){
      res.render('view', {
        title : 'view',
        data : data,
        nick : nick,
        num : num,
        logined : true, 
        update : true, 
        moment : moment
      });
    });
});

router.post('/:id/submit/:num', function(req,res,next){
    const num = req.params.num;
    const id = req.params.id;
    const comment = req.body.updateComment;
    const nick = req.session.nick;
    client.query('UPDATE comments SET comment = ? WHERE num =?', [comment, num], function(err,data){
      res.redirect('/view/'+id);
    });
});

// router.post('/:id/like', function(req,res,next){
//   const id = req.params.id;
//   const like = req.body.like;
//   client.query('INSERT INTO attractions(attraction) VALUES (?) WHERE nick = ?', [id], function(){

//   })
// })

module.exports = router;