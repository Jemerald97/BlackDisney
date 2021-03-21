const express = require('express');
const router = express.Router();
const session = require('express-session');

router.use(session({
  secret : 'mintchoco', 
  resave : false, 
  saveUninitialized : true
}));

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session);
  if(req.session.logined == true){
    res.render('index', { 
      title : 'Black Disney', 
      welcome : 'Black Disney in Las Vegas',
      logined : req.session.logined,
      nick : req.session.nick
    });
  }else{
    res.render('index', {
      title : 'Black Disney', 
      welcome : 'Black Disney in Las Vegas',
      logined : false
    });
  }
});

router.get('/logout', function(req,res){
  console.log('로그아웃 성공');
  req.session.destroy(function(err){
      res.redirect('/');
  });
});

module.exports = router;