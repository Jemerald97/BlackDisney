const moment = require('moment');
let time = moment();
console.log(time);
let now = moment().add(1,'hour').format('HH:mm');
console.log(now);