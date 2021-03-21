const express = require('express');
const router = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const client = require('./mysql');

router.get('/', function(req, res, next) {
    const nick = req.session.nick;
    client.query('SELECT * FROM members WHERE nick = ?', [nick], function(err,data){
      res.render('reserve', {
        title : 'reservation',
        nick : nick,
        logined : true
      });
    });
  });

router.post('/', function(req,res,next){
    const body = req.body;
    const nick = req.session.nick;
    const attractions = body.attractions;
    console.log(attractions);
    client.query('SELECT * FROM members WHERE nick = ?', [nick], function(err,data){
        if(data[0].attraction1==null){
            client.query('update members SET attraction1 = ? WHERE nick = ? ', [attractions, nick], function(){
                res.redirect('/member');
            })
        }else if(data[0].attraction1 !=null){
            if(data[0].attraction2==null){
                client.query('update members SET attraction2 = ? WHERE nick = ? ', [attractions, nick], function(){
                    res.redirect('/member');
                });
            }
            else{
                client.query('update members SET attraction3 = ? WHERE nick = ? ', [attractions, nick], function(){
                    res.redirect('/member');
                });
            }
        }
    })
})

module.exports = router;