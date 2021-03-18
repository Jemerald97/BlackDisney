const express = require('express');
const router = express.Router();

router.get('/', function(req,res,next){
    res.render('game', {title : 'Las Vegas'});
})
//API 키
//AIzaSyAa4u54fNkXwZdXYSou1V_2hp7lw9mtW14

module.exports = router;