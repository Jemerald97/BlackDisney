const express = require('express');
const router = express.Router();
const session = require('express-session');

//쿼리문 작성
router.use(session({
    secret : 'mintchoco', 
    resave : false, 
    saveUninitialized : true
}));

router.get('/', function(req, res, next){
    res.render('community', { title : '1등 자랑 게시판!'});
});

router.get('/', function(req, res, next) {
  console.log(req.session);
  if(req.session.logined == true){
    res.render('community', { 
      title : '1등 자랑 게시판', 
      logined : req.session.logined,
      nick : req.session.nick
    });
  }else{
    res.render('community', {
      title : '1등 자랑 게시판', 
      logined : false
    });
  }
});

module.exports = router;