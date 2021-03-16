const express = require('express');
const router = express.Router();

router.get('/', function(req,res,next){
    res.render('game', {title : 'Las Vegas'});
})


//game logic
//1. random money & betting casino
let casino = new Array;
for(let i=0; i<6; i++){
    let money = 10000*(10+Math.floor(Math.random()*10));
    casino.push(money);
}
console.log(casino);
 
//name 처리 1. 그냥 변수 지정 2. 객체 value로 3. map? 
// function name(n){
//     let name;
//     for(i=0; i<6; i++){
//         name.push('casino'+String(i+1));
//     }
//     return name[n];
// }

// for(i=0; i<6; i++){
//     name.push('casino'+String(i+1));
//     name[1] = casino.map
// }
// console.log(name);

let casino1 = casino[1];
let casino2 = casino[2];
let casino3 = casino[3];
let casino4 = casino[4];
let casino5 = casino[5];
let casino6 = casino[6];









module.exports = router;