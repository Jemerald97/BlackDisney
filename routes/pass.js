const express = require('express');
const router = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const client = require('./mysql');
const moment = require('moment');

router.get('/', function(req,res,next){
    const nick = req.session.nick;
    console.log('enter into get pass');
    client.query('SELECT * FROM reservation WHERE nick = ?', [nick], function(err,data){
        console.log('get pass data', data.length);
        //사용자가 예약한 데이터가 없을 시 
        if(data.length==0){
            res.render('pass', {
                nick : nick, 
                attraction1 : '예약한 어트랙션이 없습니다.', 
                attraction2 : '예약한 어트랙션이 없습니다.', 
                attraction3 : '예약한 어트랙션이 없습니다.'
            });
        //사용자가 예약한 데이터가 1개, 2개, 3개일 때 페이지 렌더링
        }else if(data.length==1){
            res.render('pass', {
                nick : nick, 
                attraction1 : data[0].attraction, 
                attraction2 : '예약한 어트랙션이 없습니다.', 
                attraction3 : '예약한 어트랙션이 없습니다.'
            });
        }else if(data.length==2){
            res.render('pass', {
                nick : nick, 
                attraction1 : data[0].attraction, 
                attraction2 : data[1].attraction, 
                attraction3 : '예약한 어트랙션이 없습니다.'
            });
        }else{
            res.render('pass', {
                nick : nick, 
                attraction1 : data[0].attraction, 
                attraction2 : data[1].attraction, 
                attraction3 : data[2].attraction
            });
        }
    });
});

router.post('/', function(req,res,next){
    console.log('enter into post pass');
    const body = req.body;
    const nick = req.session.nick;
    const attraction = body.attraction;
    console.log(attraction);
    //현재 시간 표시하기
    const today = new Date();
    const hours = today.getHours(); // 시
    const minutes = today.getMinutes();  // 분
    //이용 시간 표시하기 : moment로 이용하기
    //const time = hours + ':' + minutes + ':' + seconds;
    const pre_time = moment().format('HH:mm');
    const next_time = moment().add(1, 'hour').format('HH:mm');
    const time = pre_time + '~' + next_time;

    //1시간 지나면 첫번째 어트랙션 삭제해주는 함수 
    //DELETE FROM comments WHERE num = ?
    function queue(){
        setTimeout(function(){
            client.query('DELETE FROM reservation WHERE nick = ? limit 1', [nick], function(){
            });
        }, 1000*60);
    }
    /*
     1. reservation 테이블에서 세션 들어온 닉이 있는 데이터 찾고 
     2. data.length를 판단한다. => 값이 없을 경우, 값이 3개일 경우, 1-2개일 경우를 나눈다. 
     3. 값이 없을 경우 : INSERT 쿼리문을 통해 데이터베이스에 그냥 넣는다. 
     4. 값이 3개일 경우 : 예약은 3개까지 가능하다는 안내 문구를 띄운다. 예약 불가로 pass 페이지 리다이렉트시킨다. 
     5. 값이 하나라도 있을 경우 고려해야 할 점 :  전 예약시간 +1시간과 현재 시간 비교했을 때 현재 시간이 더 빠르면 예약을 받을 수 없다. 
     6. 4번 조건을 통과했을 경우, INSERT 쿼리문을 통해 넣는다. 
     => SELECT 쿼리문에서 바로 앞 어트랙션 예약시간 + 1시간 한 시간으로 넣어야 한다.  
     
     7. 1시간이 지나게 되면 SELECT data 해서 data[0]을 삭제하는 함수를 추가하고 데이터베이스에 값을 입력 받았을 때 이 함수를 실행시키게 한다. 
    */
    client.query('SELECT * FROM reservation WHERE nick = ?', [nick], function(err,data){
        console.log(data);
        if(data.length == 0){
            console.log('데이터 0인 곳 들어옴.');
            client.query('INSERT INTO reservation(nick, attraction, hours, minutes, validTime) VALUES (?, ?, ?, ?, ?)', [nick, attraction, hours, minutes, time], function(err){
                if(err){
                    console.log(err);
                }
                console.log('데이터 0인 쿼리 들어옴.');
                queue();
                res.redirect('/pass');
                console.log('데이터 넣어줬나..?');
            });
        }else if(data.length == 3){
            console.log('데이터 3인 곳 들어옴.');
            res.send("<script>alert('어트랙션은 3개까지 예약 가능합니다.');history.back();</script>");
            //res.redirect('/pass');
        }else if(data.length == 1){
            //현재시간 > 예약시간 +1
            //시 비교
            if(hours > data[0].hours){
                console.log('시 비교');
                client.query('INSERT INTO reservation(nick, attraction, hours, minutes, validTime) VALUES (?, ?, ?, ?, ?)', [nick, attraction, hours, minutes, time], function(){
                    //queue();
                    res.redirect('/pass');
                });
            }//분 비교
            else if((hours == (data[0].hours)) && (minutes > data[0].minutes)){
                console.log('분 비교');
                client.query('INSERT INTO reservation(nick, attraction, hours, minutes, validTime) VALUES (?, ?, ?, ?, ?)', [nick, attraction, hours, minutes, time], function(){
                    //queue();
                    res.redirect('/pass');
                });
            }
            else{
                console.log('아무것도 없는 경우');
                res.send("<script>alert('예약 가능한 시간이 아닙니다.');history.back();</script>");
                //res.redirect('/pass');
            }
        }else if(data.length == 2){
            if(hours > data[1].hours){
                console.log('데이터 2인 곳 들어옴');
                client.query('INSERT INTO reservation(nick, attraction, hours, minutes, validTime) VALUES (?, ?, ?, ?, ?)', [nick, attraction, hours, minutes, time], function(){
                    //queue();
                    res.redirect('/pass');
                });
            }//분 비교
            else if((hours == (data[1].hours)) && (minutes > data[1].minutes)){
                console.log('데이터 2인 곳 시간 비교');
                client.query('INSERT INTO reservation(nick, attraction, hours, minutes, validTime) VALUES (?, ?, ?, ?, ?)', [nick, attraction, hours, minutes, time], function(){
                    //queue();
                    res.redirect('/pass');
                });
            }
            else{
                console.log('예약 불가능');
                res.send("<script>alert('예약 가능한 시간이 아닙니다.');history.back();</script>");
                //res.redirect('/pass');     
            }
        }else{
            console.log('여기로 왜 오는지 모르겠는데 오면 문제 생긴다.');
            res.redirect('/pass');
        }
    })
})







// router.post('/', function(req,res,next){
//     console.log('패스트 포스 들어옴');
//     const body = req.body;
//     const nick = req.session.nick;
//     const attraction = body.attraction;
//     console.log(attraction);
//     client.query('SELECT * FROM members WHERE nick = ?', [nick], function(err,data){
//         console.log(data[0].attraction1);
//         if(data[0].attraction1==null){
//             client.query('UPDATE members SET attraction1 = ? WHERE nick = ? ', [attraction, nick], function(){
//                 res.redirect('/member');
//             });
//         }else if(data[0].attraction1 !=null){
//             if(data[0].attraction2==null){
//                 client.query('UPDATE members SET attraction2 = ? WHERE nick = ? ', [attraction, nick], function(){
//                     res.redirect('/member');
//                 });
//             }
//             else{
//                 client.query('update members SET attraction3 = ? WHERE nick = ? ', [attraction, nick], function(){
//                     res.redirect('/member');
//                 });
//             }
//         }
//     });
// });


module.exports = router;