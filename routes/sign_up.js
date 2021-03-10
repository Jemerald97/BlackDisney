const express = require('express');
const { models } = require('mysql');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const ejs = require('ejs');
const fs = require('fs');
const app = express();
// const client = mysql.createConnection({
//     user : 'root', 
//     password : '0823', 
//     database : 'lasvegas'
// });

//app.use(bodyParser.urlencoded({extended:false}))
console.log('안녕하세요');

// router.get('/', (req,res,next)=>{
//     res.render('signup', { title: 'Signup' }); //파일
//     client.query('SELECT * FROM members', (error, results)=>{
//         res.send(ejs.render(data, {
//             data: results
//         }));
//     });
// });

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
        client.query('SELECT * FROM members', (error, results)=>{
            console.log('안녕하세요');
            // res.send(ejs.render(data, {
            //     data: results
            // }));
            console.log('안녕하세요');
        });
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