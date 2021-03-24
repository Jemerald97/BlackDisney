const express = require('express');
const router = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const client = require('./mysql');
const moment = require('moment');

  router.get('/', function(req, res, next) {
    /*
      1. members 테이블에서 패스 어트랙션 불러오고 
      2. tickets 테이블에서 티켓 날짜, 인원수 불러오고 
      3. if 조건 : tickets 테이블에서 nick 있으면 
      4. render 넘겨주는 값 있으면 ticket : true로 하기 
    */
    const nick = req.session.nick;
    client.query('SELECT * FROM tickets WHERE nick = ?', [nick], function(err,data){
      console.log('이사람이 가진 티켓의 갯수', data.length);
      //티켓이 있는 경우
      if(data.length != 0){
        client.query('SELECT * FROM members WHERE nick =?;SELECT * FROM tickets WHERE nick = ?', [nick, nick], function(err,datas){
          const memberData = datas[0];
          const ticketData = datas[1];
          const name = memberData[0].name;
          console.log('티켓 있어서 누군지 이름 찾기');
          console.log('memberData with tickets', memberData);
          console.log('name with tickets', name);
          //마이페이지 띄우기
          res.render('member', {
            nick : nick, 
            name : name,
            logined : true, 
            ticket : true, 
            date : ticketData[0].date, 
            head : ticketData[0].head, 
            moment : moment
          });
        });
      //티켓이 없는 경우
      }else{
        res.render('member', {
          nick : nick,
          logined : true, 
          ticket : false
        });
        // client.query('SELECT * FROM members WHERE nick = ?', [nick], function(err, datas){
        //   console.log(datas);
        // });
      }
    });
  });

module.exports = router; 