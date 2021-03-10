const express = require('express');
//const { models } = require('mysql');
const router = express.Router();

console.log('안녕하세요');

router.get('/', (req,res,next)=>{
    res.render('login', { title: 'Login' }); //파일
});

router.post('/', function(req,res,next){

});

module.exports = router;