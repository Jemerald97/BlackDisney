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

    client.query('SELECT * FROM tickets WHERE nick = ? and date = ?', [nick, date], function(err,data){ //data[0]은 회원 정보 데이터베이스이고, data[1]은 티켓 데이터베이스이다. 
        console.log(data);
        
        if(data.length == 0){
            client.query('SELECT * FROM members; INSERT INTO tickets(nick, date, head) VALUES (?, ?, ?)', [nick, date, head], function(err,data){
                res.render('member', {
                    title : "MyPage",
                    nick : nick,
                    attraction1 : data[0].attraction1,
                    attraction2 : data[0].attraction2,
                    attraction3 : data[0].attraction3,
                    logined : true, 
                    ticket : true,
                    date : date, 
                    head : head 
                  });
            });
        }else{
            console.log('이미 같은 날짜 예약이 있습니다.');
        }
    });


    // if(consumer == nick){
    //     if(date == data[0].)
    //     client.query('UPDATE tickets SET (nick, date, head) WHERE nick = ?', [nick, date, head], function(){

    //     });
    // }else{
    //     client.query()
    // }
    
    // client.query('SELECT * FROM members WHERE nick = ?; UPDATE tickets SET (nick, date, head) WHERE INSERT INTO tickets(nick, date, head) values (?, ?, ?)', [nick,nick, date, headCount], function(err, data){
    //     console.log(data[0].attraction1);
    //     res.get('member', {
    //         title : "MyPage", 
    //         nick : nick, 
    //         attraction1 : data[0].attraction1,
    //         attraction2 : data[0].attraction2,
    //         attraction3 : data[0].attraction3,
    //         date : date, 
    //         head : headCount,
    //         logined : true, 
    //         ticket : true
    //     });
    //     console.log('데이터 넘겨줌');
    // });
});

router.post('/')


router.post('/pass', function(req,res,next){
    console.log('패스트 포스 들어옴');
    const body = req.body;
    const nick = req.session.nick;
    const attraction = body.attraction;
    console.log(attraction);
    client.query('SELECT * FROM members WHERE nick = ?', [nick], function(err,data){
        console.log(data[0].attraction1);
        if(data[0].attraction1==null){
            client.query('UPDATE members SET attraction1 = ? WHERE nick = ? ', [attraction, nick], function(){
                res.redirect('/member');
            });
        }else if(data[0].attraction1 !=null){
            if(data[0].attraction2==null){
                client.query('UPDATE members SET attraction2 = ? WHERE nick = ? ', [attraction, nick], function(){
                    res.redirect('/member');
                });
            }
            else{
                client.query('update members SET attraction3 = ? WHERE nick = ? ', [attraction, nick], function(){
                    res.redirect('/member');
                });
            }
        }
    });
});

module.exports = router;