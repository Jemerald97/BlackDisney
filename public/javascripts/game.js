//game logic
//1. random money & betting casino

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

// let casino1 = casino[1];
// let casino2 = casino[2];
// let casino3 = casino[3];
// let casino4 = casino[4];
// let casino5 = casino[5];
// let casino6 = casino[6];

/*
1. 버튼 누르면 1부터 6까지 중에 랜덤으로 나오게 하기 
2. 주사위 6개 
3. 그 중 같은 수끼리 숫자 세기
4. 사용자가 주사위 선택하면 베팅하기
5. 
*/

const id_arr = ['one', 'two', 'three', 'four', 'five', 'six'];
const select = 'select';
//카지노 판 만들기
function makeCasino(){
    let casino = new Array;
    for(let i=0; i<6; i++){
        let money = 10000*(10+Math.floor(Math.random()*10));
        casino.push(money);
    }
}
//버튼 보이기
function show(){
    let con;
    for(let m = 0; m<6; m++){
        con = document.getElementById(id_arr[m]);
        con.style.visibility = 'visible';
    }
}
//버튼 숨기기
// function hide(){
//     let myDice = throw6Dices(6);
//     for(let m = 0; m<6; m++){
//         let con;
//         if(myDice[m] == 0){
//             con = document.getElementById(id_arr[m]);
//             con.style.visibility = 'hidden';
//         }
//     }
//     return ()
// }
//주사위 6개 굴리기
function throw6Dices(n){
    let dice = new Array;
    let count = 0;
    let pos = 0;
    let myDice = new Array;
    for(let i=0; i<n; i++){
        let num = Math.floor(Math.random()*n+1);
        dice.push(num);
    }
    for(let k = 0; k<n; k++){
        pos = dice.indexOf(k+1); //없으면 포지션 값 -1
        while(pos != -1){
            count++;
            pos = dice.indexOf(k+1, pos+1); //position 다음 위치부터 
        }
        console.log('dice_num', k+1, 'count', count);
        myDice.push(count);
        count = 0;
    }
    for(let m = 0; m<6; m++){
        let con;
        if(myDice[m] == 0){
            con = document.getElementById(id_arr[m]);
            con.style.visibility = 'hidden';
        }
    }
}
//유저 주사위 선택
function selectDice(){
    let myDice = throw6Dices(6);
    let select = myDice[n-1];
    console.log(select);
}
//스타트 버튼
function start(){
    makeCasino();
    show();
    throw6Dices(6);
}

// document.getElementById('start').onclick = function(){

// };

//function throwDice(){
    //주사위 6개 굴리기
    // let dice = new Array;
    // for(let i=0; i<6; i++){
    //     let num = Math.floor(Math.random()*6+1);
    //     dice.push(num);
    // }
    // console.log(dice);

    //같은 수 찾기
    //initializing
    // let count = 0;
    // let pos = 0;
    // let myDice = new Array;
    // for(let k = 0; k<6; k++){
    //     pos = dice.indexOf(k+1); //없으면 포지션 값 -1
    //     while(pos != -1){
    //         count++;
    //         pos = dice.indexOf(k+1, pos+1); //position 다음 위치부터 
    //     }
    //     console.log('dice_num', k+1, 'count', count);
    //     myDice.push(count);
    //     count = 0;
    // }
    //주사위 안나온 버튼 숨기기
    // for(let m = 0; m<6; m++){
    //     if(myDice[m] == 0){
    //         hide(id_arr[m]);
    //     }
    // }
//}

let today = new Date();
console.log(today);
let hours = today.getHours(); // 시
let minutes = today.getMinutes();  // 분
let seconds = today.getSeconds();  // 초

console.log(hours);
console.log(minutes);
console.log(seconds);

let time = hours + ':' + minutes + ':' + seconds;
console.log(time);