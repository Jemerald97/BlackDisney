const express = require('express');
const router = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const client = require('./mysql');
const moment = require('moment');

  router.get('/', function(req, res, next) {
    const nick = req.session.nick;
    /*
      1. members 테이블에서 패스 어트랙션 불러오고 
      2. tickets 테이블에서 티켓 날짜, 인원수 불러오고 
      3. if 조건 : tickets 테이블에서 nick 있으면 
      4. render 넘겨주는 값 있으면 ticket : true로 하기 
    */
    //티켓이 있는 경우
    client.query('SELECT * FROM tickets WHERE nick = ?', [nick], function(err,data){
      if(data.length != 0){
        client.query('SELECT * FROM members WHERE nick =?;SELECT * FROM tickets WHERE nick = ?', [nick, nick], function(err,datas){
          const memberData = datas[0];
          const ticketData = datas[1];
          const name = memberData[0].name;
          console.log(memberData);
          console.log(name);
          res.render('member', {
            title : 'MyPage', 
            nick : nick, 
            name : name,
            attraction1 : memberData[0].attraction1, 
            attraction2 : memberData[0].attraction2, 
            attraction3 : memberData[0].attraction3, 
            logined : true, 
            ticket : true, 
            date : ticketData[0].date, 
            head : ticketData[0].head, 
            moment : moment
          });
        });
        //티켓이 없는 경우
      }else{
        client.query('SELECT * FROM members WHERE nick = ?', [nick], function(err, datas){
          res.render('member', {
            title : 'MyPage', 
            nick : nick, 
            attraction1 : datas[0].attraction1, 
            attraction2 : datas[0].attraction2, 
            attraction3 : datas[0].attraction3, 
            logined : true, 
            ticket : false,
            moment : moment 
          });
        });
      }
    });
  });

  router.get('/pass', function(req,res, next){
    const nick = req.session.nick;

  });

router.post('/pass', function(req,res,next){

})



module.exports = router; 