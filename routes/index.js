const express = require('express');
const router = express.Router();
//const app = require('../app');
const session = require('express-session');

router.use(session({
  secret : 'mintchoco', 
  resave : false, 
  saveUninitialized : true
}));

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('11111111111');
  console.log(req.session);
  if(req.session.logined == true){
    res.render('index', { 
      title : 'Las Vegas', 
      logined : req.session.logined,
      nick : req.session.nick
    });
  }else{
    console.log('222222');
    res.render('index', {
      title : 'Las Vegas',
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

//초기 값으로 세션 접근
// app.get('/', function(req,res){
//   const sess = req.session;
// });

module.exports = router;