//모듈 불러오기
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const client = require('./mysql');
const ejs = require('ejs');
const { checkout } = require('../app');
const app = express();
//const expValidator = require('express-validator');

app.use(bodyParser.urlencoded({extended : false}));

// GET!

router.get('/', function(req,res,next){
    res.render('signup', {title : 'signup'});
});

router.post('/', function(req,res,next){
    const body = req.body;
    const name = body.name;
    const nick = body.nick;
    const email = body.email;
    const pwd = body.pwd;
    const cfPwd = body.cfPwd;
    const birth = body.birth;

    client.query('select * from members where nick = ?', [nick], function(err,data){
        if(data.length == 0){
            console.log('success');
            if(pwd == cfPwd){
                client.query('INSERT INTO members (name, nick, email, pwd, birth) values (?, ?, ?, ?, ?)', [name, nick, email, pwd, birth], function(){
                    res.redirect('/');
                });
            }else{
                res.send('<script>alert("비밀번호를 다시 확인하세요.");history.back();</script>');
            }//전송할 것을 두 번 보내면 안된다!!
        }else{
            console.log('fail');
            res.send('<script>alert("회원가입 실패");</script>');
        }
    });
});

router.post('/correct', function(req,res,next){
    console.log('ajax 호출');
    console.log(req.body.members);
    const nick = req.body.members;
    console.log(nick);
    client.query('SELECT nick FROM members WHERE nick = ?', [nick], function(err, data){
        if(err) console.log(err);
        if(data.length == 0){
            res.send({
                correct : true
            });
            console.log('사용가능');
        }else{
            console.log(nick);
            res.send({
                correct : false
            });
        }
    });
});

// client.query('SELECT * FROM members', function(err, members){
//     res.render('signup',{
//         title : 'signup',
//         members : members
//     }); //어디 페이지에 렌더링해주는지 경로 설정해줘야 한다!!
// });

// POST!
//result[0].id == undefined
// router.post('/', function(req,res,next){
//     const body = req.body;
//     const name = body.name; //입력 값과 데이터베이스 값과 일치하는 것을 찾는다. 
//     client.query(selectQ, [name], function(err, result){
//         console.log('result', result);
//         if(result !== undefined){
//             res.send('이미 회원입니다!');
//         }else{
//             if((result[0].pwd == body.pwd)&&(body.pwd.length > 6) && (body.nick.length > 1)){
//                 client.query(insertQ, [body.name, body.nick, body.email, body.pwd, body.birth], function(){
//                     res.redirect('/');
//                 });
//             }else{
//                 console.log('err', err);
//             }
//         }
//     })
// });


// POST, GET 처리 
// POST : 데이터베이스의 값을 찾아서 입력값과 비교하고 

// form data 처리 함수

// 1. 닉네임 중복 체크 (닉네임에 primary key)
// 2. 비밀번호 확인
// 3. 회원가입 조건 : 이름 2글자 이상, 닉네임 1글자 이상, 비밀번호 6자리 이상
// 4. 비밀번호 조건 : 문자와 숫자 반드시 함께 포함

// 1. 닉네임 : 닉네임의 id는 유일, count(id)
//닉네임 중복 체크
// function idCheck(){
//     window.open("idCheckForm.ejs", "닉네임 중복확인", "width=400", "height=350");
// }
// //이메일 중복 체크
// function emailCheck(){
//     window.open("emailCheckForm.ejs", "이메일 중복 확인", "width=400", "height350");
// }

// blankCheck(data){
//     const id = data.id.value;
//     id = id.trim();
//     if(id.length < 6){
//         alert('비밀번호를 6자 이상 입력해주십시오');
//         return false;
//     }
//     return true;
// }

// 3. 회원가입 조건 
// body.name.length > 2
// body.nick.length > 1
// body.pwd.length > 5

//유효성 검사
// async function isValid(req,res,next){
//     await check()
// }

module.exports = router;
