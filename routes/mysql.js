const mysql = require('mysql');

// const client = mysql.createConnection({
//     user:'root',
//     password:'0823',
//     database:'lasvegas', 
//     multipleStatements : true
// });

const client = mysql.createConnection({
    host: 'nodejs-008.cafe24.com',
    user: 'betty970823',
    password: 'KL@ttwhyo7D',
    database: 'betty970823',
    port: '3306',
    multipleStatements : true
});

module.exports = client;