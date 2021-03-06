const express = require('express');
const router = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const client = require('./mysql');
const moment = require('moment');

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

router.post('/ticket', function(req,res,next){
    console.log('티켓 구매 들어옴');
    const nick = req.session.nick;
    const body = req.body;
    const date = body.reserveDate;
    const head = body.headCount;
    /* 
        구현 : 회원은 티켓을 한번밖에 살 수 없다. 날짜 다른지 비교!
        1. tickets 쿼리문에서 세션 닉이랑 같은 닉을 찾고 if 문에서 값이 있다면 update 쿼리를 실행하는 것으로 
        2. tickets 쿼리문에서 날짜 비교하고 같으면 에러 페이지 표시
    */
    client.query('SELECT * FROM tickets WHERE nick = ? and date = ?', [nick, date], function(err,data){ //data[0]은 티켓 데이터베이스이다. 
        console.log(data);
        
        if(data.length == 0){
            client.query('SELECT * FROM members WHERE nick = ?; INSERT INTO tickets(nick, date, head) VALUES (?, ?, ?)', [nick, nick, date, head], function(err,data){
              console.log('member data', data);  
              const name = data[0][0].name;
                console.log(name);
                res.render('member', {
                    title : "MyPage",
                    nick : nick,
                    name : name,
                    logined : true, 
                    ticket : true,
                    date : date, 
                    head : head , 
                    moment : moment
                  });
            });
        }else{
          res.send("<script>alert('이미 같은 날짜 예약이 있습니다.');history.back();</script>");
        }
    });
});

module.exports = router;