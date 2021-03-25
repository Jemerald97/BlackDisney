const express = require('express');
const mysql = require('mysql');
const client = require('./mysql');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const moment = require('moment');

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cookieParser()); //세션도 쿠키의 종류 
//세션 사용 설정 
router.use(session({
    secret : 'mintchoco', //쿠키를 임의로 변조하는 것을 방지하기 위한 값
    resave : false, //세션을 언제나 저장할지 정하는 값 : true로 하면 변경되지 않아도 값이 계속 저장된다. 
    saveUninitialized : true //세션이 저장되기 전에 초기화하지 않고 저장할지 
}));

router.get('/', function(req,res){
    if(req.session.logined == true){
        res.render('login', {
            title : 'Login',
            logined : req.session.logined, 
            nick : req.session.nick
        });
    }else{
        res.render('login', {
            title : 'Login',
            logined : false
        });
    }
});

//ejs에서 쓰려고 하는 값 : 쿼리문 결과 값
//res.render('login',{members : members}); 

router.post('/', function(req,res,next){
    const body = req.body;
    const nick = body.nick;
    const pwd = body.pwd;
    if(nick == null || pwd == null){
        res.send("<script>alert('please input your data');</script>")
    }else{
        client.query('SELECT * FROM members WHERE nick = ?', [nick], function(err, members){
            if(nick == members[0].nick && pwd == members[0].pwd){
                console.log('로그인 성공');
                req.session.logined = true;
                req.session.name = members[0].name;
                req.session.nick = members[0].nick;
                req.session.pwd = members[0].pwd;
                req.session.birth = members[0].birth;
                
                const day = moment().format('YYYY-MM-DD');
                console.log('today', day);
                const birth = moment(req.session.birth).format('YYYY-MM-DD');
                console.log('birth', birth);
                req.session.save(function(){
                    if(day == birth){
                        res.render('index', {
                            title : 'Black Disney', 
                            welcome : 'Black Disney in Las Vegas',
                            name : members[0].name,
                            nick : members[0].nick, 
                            birth : members[0].birth, 
                            logined : true, 
                            birth : true
                        });
                    }else{
                        res.render('index', {
                            title : 'Black Disney', 
                            welcome : 'Black Disney in Las Vegas',
                            name : members[0].name,
                            nick : members[0].nick, 
                            birth : members[0].birth, 
                            logined : true, 
                            birth : false
                        });
                    }
                });
            }else{
                console.log('로그인 실패');
                res.render('login', {
                    title : 'Black Disney', 
                    welcome : 'Black Disney in Las Vegas'
                });
            }
        });
    }
 
});

module.exports = router;
