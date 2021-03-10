const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const ejs = require('ejs');
const app = express();

app.use(bodyParser.urlencoded({extended : false}));

const client = mysql.createConnection({
    host: 'nodejs-008.cafe24.com',
    user: 'betty970823',
    password: 'KL@ttwhyo7D',
    database: 'betty970823',
    port: '3306',
});

//쿼리문 작성
const selectQ = 'SELECT (name, nick, email, pwd, birth) FROM members';
const insertQ = 'INSERT INTO members (name, nick, email, pwd, birth) values (?, ?, ?, ?, ?)';

// GET!

router.get('/', function(req,res){
    //res.render('signup', {title : 'Signup'});
    client.query(selectQ, function(err, members){
        res.render('signup', {members:members});
        console.log('gdgd');
    });
});

// POST!

router.post('/sign_up', function(req,res,next){
    const body = req.body;
    console.log('POSTING');
    client.query(insertQ, [body.name, body.nick, body.email, body.pwd, body.birth], function(){
        res.redirect('/');
    })
});

// router.post('/', function(req,res){
//     const body = req.body;
//     console.log('POSTING');
//     client.query('INSERT INTO members (userName, userNick, userEmail, userPwd, userBirth) values(?, ?, ?, ?, ?)', [
//         body.name, body.nick, body.email, body.pwd, body.birth
//     ], ()=>{
//         res.redirect('/');
//     })
// });

// router.get('/', (req,res,next)=>{
//     res.render('signup', { title: 'Signup' }); //파일
//     client.query('SELECT * FROM members', (error, results)=>{
//         res.send(ejs.render(data, {
//             data: results
//         }));
//     });
// });

// router.get('/', function(req,res){
//     const name = req.query.name;
//     const nick = req.query.nick;
//     const email = req.query.email;
//     const pwd = req.query.pwd;
//     const birth = req.query.birth;
//     console.log('Already Get!');
//     res.render('signup', {title : 'SignUp'}, name:name, nick:nick, email:email, pwd:pwd, birth:birth, method : 'get');
// });





module.exports = client;

















//app.use(bodyParser.urlencoded({extended:false}))
//console.log('안녕하세요');



// http.createServer(function (request, response) {
//     fs.readFile('ejstest.ejs', 'utf8', function (error, data) {
//         response.writeHead(200, { 'Content-Type': 'text/html' });
//         response.end(ejs.render(data));
//     });
// });

router.get('/', (req,res,next)=>{
    res.render('signup', { title: 'Signup' }); //파일
    //fs.readFile('signup.ejs', 'utf-8', function(error, data){
        // res.writeHead(200, {'Content-Type':'text/ejs'});
        // res.end(ejs.render(data));
        // client.query('SELECT * FROM members', (error, results)=>{
        //     console.log('안녕하세요');
        //     // res.send(ejs.render(data, {
        //     //     data: results
        //     // }));
        //     console.log('안녕하세요');
        // });
    });
//});

// router.post('/', function(req,res){
//     const body = req.body;
//     console.log('안녕하세요');
//     client.query('INSERT INTO members (userName, userNick, userEmail, userPwd, userBirth) values(?, ?, ?, ?, ?)', [
//         body.name, body.nick, body.email, body.pwd, body.birth
//     ], ()=>{
//         res.redirect('/');
//     })
// });

module.exports = router;