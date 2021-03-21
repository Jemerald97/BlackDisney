const express = require('express');
const router = express.Router();
const client = require('./mysql');
const session = require('express-session');

router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  const nick = req.session.nick;
  client.query('SELECT * FROM comments WHERE attraction = ?', [id], function(err,data){
    res.render('view', {
      title : 'Attraction'+id,
      data : data,
      nick : nick,
      logined : true, 
      update : false
    });
  });
});

router.get('/delete/:id', function(req,res,next){
    const num = req.params.id;
    console.log(num);
    client.query('DELETE FROM comments WHERE num = ?', [num], function(err, data){
        //console.log(data);
        res.redirect('/view');
        console.log('완료');
    });
});

router.get('/update/:id', function(req,res,next){
    const num = req.params.id;
    console.log(num);
    const nick = req.session.nick;
    client.query('SELECT * FROM comments',function(err,data){
      res.render('view', {
        title : 'view',
        data : data,
        nick : nick,
        num : num,
        logined : true, 
        update : true
      });
    });
});
// client.query('SELECT comment FROM comments WHERE num = ?', [num], function(err,data){
//     client.query('UPDATE comments SET comment = ? WHERE ')
// })

router.post('/submit/:id', function(req,res,next){
    const num = req.params.id;
    console.log(num);
    const nick = req.session.nick;
    client.query('UPDATE comments SET comment = ? WHERE num =?', [])
})


module.exports = router;