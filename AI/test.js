const mysql = require("mysql");

const con = mysql.createConnection({
    host:"52.79.92.84",
    user:"miliroutine_developer",
    password: "2022MySQL!@",
    port: 53609,
    database: "miliroutine_db",
});

con.query(
    'SELECT * FROM user_routine WHERE user_no=1',
    function (error, results, fields){
        console.log(results);
    }
)