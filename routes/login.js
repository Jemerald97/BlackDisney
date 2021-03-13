const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');
// const client = mysql.createConnection({
//     user : 'root', 
//     password : '0823', 
//     database : 'lasvegas'
// });
//heidsql cafe24 로그인할 때 사용
const client = mysql.createConnection({
    host: 'nodejs-008.cafe24.com',
    user: 'betty970823',
    password: 'KL@ttwhyo7D',
    database: 'betty970823',
    port: '3306',
});
const selectQ = 'SELECT * FROM members';
const searchQ = 'SELECT nick, pwd FROM members WHERE nick = ?';

app.use(bodyParser.urlencoded({extended : false}));
//세션 사용 설정 
// app.use(session({
//     secret : 'asdjha!@#@#$dd', 
//     resave : false,
//     saveUninitialized : true
// }))

router.get('/', (req,res,next)=>{
    res.render('login', { title: 'Login' }); //파일
    client.query(selectQ, function(err, members){
        res.render('login',{members : members}); //ejs에서 쓰려고 하는 값 : 쿼리문 결과 값
    });
});

router.post('/', function(req,res,next){
    const body = req.body;
    client.query(searchQ, [body.nick], function(err,members){
         if((undefined == members[0])&&(undefined == members[0])){
            console.log('왜');
            console.log('3', body.nick);
            console.log('4', members[0]);
            res.redirect('/login');
        }else{
            res.redirect('/index_mem');
        }
    })
});

module.exports = router;