const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '128.199.214.155', //mysql database host name
    user: 'saveomma', //mysql database user name
    password: 'saveomma2021', //mysql database password
    database: 'saveomma' //mysql database name
});

connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected with saveomma database...');
});


module.exports = {
    connection
};
