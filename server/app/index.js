var app = require('../server');
var http = require('http');
var debug = require('debug')('server:server');
var port = normalizePort(process.env.PORT || '8234');
app.set('port', port);
var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log('started on http://localhost:' + port);

// var db = require('../mysql/connect');
// var client = db.connectServer();

// function employee_add(client) {
//     var sql = `insert into Employee
//         (title,fistName,middleName,lastName,address,workTelExt,homeTelNo,empEmailAddress,socialSecurutyNumber,DOB,position,sex,salary,dateStarted,EmployeeNO,code,password)
//         values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`
//     var params = [
//         '技术总监',
//         '诸葛',
//         '建',
//         '国',
//         '中南民族大学',
//         '123456',
//         '15963265965',
//         '1102305936@qq.com',
//         '123456789',
//         '1997-06-25',
//         '人力资源部',
//         '男',
//         '60000',
//         '2017-06-08',
//         '20181',
//         60,
//         'NF520233'
//     ];

//     client.query(sql, params, (err, result) => {
//         if (err) throw err
//     })
// }
// employee_add(client);
//对port进行一些处理，使之能用
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }
    return false;
}



function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe' + port :
        'Port' + port

    switch (error.code) {
        case 'EACCES':
            console.log(bind + 'requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + 'is already use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}


function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'Pipe ' + addr :
        'port ' + addr.port;
}