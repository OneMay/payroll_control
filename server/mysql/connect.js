var mysql = require('mysql');
var config = require('../config/config.js')
module.exports = {
    connectServer() {
        var client = mysql.createConnection({
            host: config.host,
            user: config.user,
            port: config.port,
            password: config.password,
            database: config.database
        })

        return client;
    },
    //员工信息添加，code>50为管理员
    employee_add(client, data, callback) {
        var sql = `insert into Employee
            (title,fistName,middleName,lastName,address,workTelExt,homeTelNo,empEmailAddress,socialSecurutyNumber,DOB,position,sex,salary,dateStarted,EmployeeNO)
            values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`
        var params = [
            data.title,
            data.fistName,
            data.middleName,
            data.lastName,
            data.address,
            data.workTelExt,
            data.homTelNo,
            data.empEmailAdress,
            data.socialSecurutyNumber,
            data.DOB,
            data.position,
            data.sex,
            data.salary,
            data.dateStarted,
            data.employeeNO
        ];

        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //登录
    login(client, data, callback) {
        var sql = `select *
                from Employee
                where EmployeeNO = ? and password= ?
            `
        var params = [
            data.employeeNo,
            data.password
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按员工编号查询
    employee_search(client, data, callback) {
        var sql = `select *
                 from Employee
                 where EmployeeNO = ?`;
        client.query(sql, [data], (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //密码修改
    employee_pw_update(client, data, callback) {
        var sql = `update Employee
                set password = ?
                where EmployeeNO = ?`;
        var params = [
            data.password,
            data.employeeNO
        ];
        client.query(sql, params, function(err, result) {
            if (err) throw err
            callback(result);
        })
    },
    //查询所有员工编号
    employeeNo_search(client, callback) {
        var sql = `select *
                from Employee
                order by EmployeeNO desc`;
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按员工社保卡号查询
    socialSecurutyNumber_search(client, data, callback) {
        var sql = `select *
                from Employee
                where socialSecurutyNumber = ?`;
        client.query(sql, [data], (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //员工信息修改
    employee_update(client, data, callback) {
        var sql = `update Employee
                set title = ?, fistName = ?,middleName = ?,lastName = ?, address = ?, workTelExt = ?, homeTelNo = ?, empEmailAddress = ?, socialSecurutyNumber = ?, DOB = ?, position = ?,sex = ?, salary = ?, dateStarted = ?
                where EmployeeNO = ?`;
        var params = [
            data.title,
            data.fistName,
            data.middleName,
            data.lastName,
            data.address,
            data.workTelExt,
            data.homTelNo,
            data.empEmailAdress,
            data.socialSecurutyNumber,
            data.DOB,
            data.position,
            data.sex,
            data.salary,
            data.dateStarted,
            data.employeeNO
        ];
        client.query(sql, params, function(err, result) {
            if (err) throw err
            callback(result);
        })
    },
    //按员工编号删除
    employeeNo_delete(client, data, callback) {
        var sql = `delete from Employee
                    where EmployeeNO = ? `;
        client.query(sql, [data], (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //奖金类别添加
    bouns_add(client, data, callback) {
        var sql = `insert into bonustype
                  (bonusTypeNo,bonusDescription)
                  values(?,?)`;
        var params = [
            data.bonusTypeNo,
            data.bonusDescription
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按奖金类别编号查询
    bonus_search(client, data, callback) {
        var sql = `select *
                  from bonustype
                  where bonusTypeNo = ?`;
        client.query(sql, [data], (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按奖金类别描述模糊查询
    bonus_search_dec(client, data, callback) {
        var sql = `select *
                  from bonustype
                  where bonusDescription like ?`;
        client.query(sql, ['%' + data + '%'], (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //查询所有奖金类别编号
    bouns_search_all(client, callback) {
        var sql = `select *
                  from bonustype
                  order by bonusTypeNo desc`;
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按奖金类别编号删除
    bonus_delete(client, data, callback) {
        var sql = `delete from bonustype
                    where bonusTypeNo = ? `;
        client.query(sql, [data], (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //奖金添加
    bonusSend_add(client, data, callback) {
        var sql = `insert into Bonus
                  (employeeNo,bonusDate,bonusAmount,bonusTypeNo)
                  values(?,?,?,?)
            `;
        var params = [
            data.employeeNo,
            data.bonusDate,
            data.bonusAmount,
            data.bonusTypeNo
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按员工编号和发放时间编号查询
    bonusSend_search(client, data, callback) {
        var sql = `select *
                  from Bonus
                  where employeeNo = ? and bonusDate = ?
            `;
        var params = [
            data.employeeNo,
            data.bonusDate
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按员工编号查询
    bonusSend_search_employee(client, data, callback) {
        var sql = `select *
                  from Bonus
                  where employeeNo = ? and pay = ?
            `;
        var params = [
            data.employeeNo,
            data.pay
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按员工编号设置
    bonusSend_pay(client, data, callback) {
        var sql = `update Bonus
                set pay = ?
                where employeeNo = ?`;
        var params = [
            data.pay,
            data.employeeNo
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //查询所有奖金编号
    bonusSend_search_all(client, callback) {
        var sql = `select *
                  from Bonus`;
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按员工编号和发放时间编号删除
    bonusSend_delete(client, data, callback) {
        var sql = `delete from Bonus
                  where employeeNo = ? and bonusDate = ?`;
        var params = [
            data.employeeNo,
            data.bonusDate
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //查询所有工资扣除信息
    deductType_search_all(client, callback) {
        var sql = `select *
                  from DeductType
                  order by deductTypeNo desc`;
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按工资扣除编号查询
    deductType_search(client, data, callback) {
        var sql = `select *
                  from DeductType
                  where deductTypeNo = ?`;
        client.query(sql, [data], (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //工资扣除添加
    deductType_add(client, data, callback) {
        var sql = `insert into DeductType
                 (deductDescription,deductTypeNo)
                 values(?,?)
            `;
        var params = [
            data.deductDescription,
            data.deductTypeNo
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //工资扣除信息更新
    deductType_update(client, data, callback) {
        var sql = `update DeductType
                set deductDescription = ?
                where deductTypeNo = ?`;
        var params = [
            date.deductDescription,
            data.deductTypeNo
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按工资扣除编号删除
    deductType_delete(client, data, callback) {
        var sql = `delete from DeductType
                  where deductTypeNo = ? `;
        client.query(sql, [data], (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //工资扣除全部查询
    deduction_search_all(client, callback) {
        var sql = `select *
                 from Deduction`;
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按员工编号和时长查询
    deduction_search(client, data, callback) {
        var sql = `select *
                 from Deduction
                 where employeeNo = ? and deductDate = ?`;
        var params = [
            data.employeeNo,
            data.deductDate
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按员工编号查询
    deduction_search_employeeNo(client, data, callback) {
        var sql = `select *
                 from Deduction
                 where employeeNo = ? and pay = ?`;
        var params = [
            data.employeeNo,
            data.pay
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按员工编号设置
    deduction_pay(client, data, callback) {
        var sql = `update Deduction
                set pay = ?
                where employeeNo = ?`;
        var params = [
            data.pay,
            data.employeeNo
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //工资扣除添加
    deduction_add(client, data, callback) {
        var sql = `insert into Deduction
                 (employeeNo,deductDate,deductAmount,deductTypeNo)
                 values(?,?,?,?)`;
        var params = [
            data.employeeNo,
            data.deductDate,
            data.deductAmount,
            data.deductTypeNo
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按员工编号和时长删除
    deduction_delete(client, data, callback) {
        var sql = `delete from Deduction
        where employeeNo = ? and deductDate = ?`;
        var params = [
            data.employeeNo,
            data.deductDate
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //查询所有假期信息
    holiday_search_all(client, callback) {
        var sql = `select *
                 from Holiday`;
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按假期员工编号查询
    holiday_search(client, data, callback) {
        var sql = `select *
                 from Holiday
                 where employeeNo = ?`;
        client.query(sql, [data], (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //假期更新
    holiday_update(client, data, callback) {
        var sql = `update Holiday
                  set startDate = ?,endDate = ?
                  where employeeNo = ?`;
        var params = [
            data.startDate,
            data.endDate,
            data.employeeNo
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //假期添加
    holiday_add(client, data, callback) {
        var sql = `insert into Holiday
                  (startDate,endDate,employeeNo)
                  values(?,?,?)`;
        var params = [
            data.startDate,
            data.endDate,
            data.employeeNo
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //假期删除
    holiday_delete(client, data, callback) {
        var sql = `delete from Holiday
                  where employeeNo = ? `;
        client.query(sql, [data], (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按时间开始和员工编号查询病假
    SickLeave_search(client, employeeNo, startDate, callback) {
        var sql = `select *
                 from SickLeave
                 where employeeNo = ? and startDate = ?`;
        client.query(sql, [employeeNo, startDate], (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //查询所有病假
    SickLeave_search_all(client, callback) {
        var sql = `select *
                 from SickLeave`;
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //病假录入
    SickLeave_add(client, data, callback) {
        var sql = `insert into SickLeave
                 (employeeNo,startDate,endDate,reason)
                 values(?,?,?,?)`;
        var params = [
            data.employeeNo,
            data.startDate,
            data.endDate,
            data.reason
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //病假更新
    SickLeave_update(client, data, callback) {
        var sql = `update SickLeave
                 set endDate= ?,reason= ?
                 where startDate = ? and employeeNo = ?`;
        var params = [
            data.endDate,
            data.reason,
            data.startDate,
            data.employeeNo
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //病假删除
    SickLeave_delete(client, data, callback) {
        var sql = `delete from SickLeave
        where startDate = ? and employeeNo = ?`;
        var params = [
            data.startDate,
            data.employeeNo
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //查询所有支付类型信息
    PayType_search_all(client, callback) {
        var sql = `select *
                  from PayType
                  order by payTypeNo desc`;
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //按支付类型查询
    PayType_search(client, data, callback) {
        var sql = `select *
                  from PayType
                  where payTypeNo = ?`;
        client.query(sql, [data], (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //支付类型添加
    PayType_add(client, data, callback) {
        var sql = `insert into PayType
                 (payTypeDescription,payTypeNo)
                 values(?,?)
            `;
        var params = [
            data.payTypeDescription,
            data.payTypeNo
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //支付类型信息更新
    PayType_update(client, data, callback) {
        var sql = `update PayType
                set payTypeDescription = ?
                where payTypeNo = ?`;
        var params = [
            data.payTypeDescription,
            data.payTypeNo
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //支付类型删除
    PayType_delete(client, data, callback) {
        var sql = `delete from PayType
        where payTypeNo = ?`;
        client.query(sql, [data], (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //支付查询
    PayDetails_serach(client, data, callback) {
        var sql = `select *
                  from PayDetails
                  where employeeNo = ? and startDate = ?`;
        var params = [
            data.employeeNo,
            data.startDate
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //全部支付查询
    PayDetails_serach_all(client, callback) {
        var sql = `select *
                  from PayDetails`;
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //员工支付查询
    PayDetails_serach_employeeNo(client, data, callback) {
        var sql = `select *
                  from PayDetails
                  where employeeNo = ?`;
        client.query(sql, [data], (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //支付添加
    PayDetails_add(client, data, callback) {
        var sql = `insert into PayDetails
                  (employeeNo,startDate,routingNumber,accountType,bankName,bankAddress,payTypeNo)
                  values(?,?,?,?,?,?,?)`;
        var params = [
            data.employeeNo,
            data.startDate,
            data.routingNumber,
            data.accountType,
            data.bankName,
            data.bankAddress,
            data.payTypeNo
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //支付删除
    PayDetails_delete(client, data, callback) {
        var sql = `delete from PayDetails
        where employeeNo = ? and startDate = ?`;
        var params = [
            data.employeeNo,
            data.startDate
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //支付历史表全部
    PayHistory_search_all(client, callback) {
        var sql = `select *
                  from PayHistory
                  order by payNo desc`;
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //支付历史表添加
    PayHistory_add(client, data, callback) {
        var sql = `insert into PayHistory
                  (employeeNo,paydate,checkNumber,payAmount,payNo)
                  values(?,?,?,?,?)`;
        var params = [
            data.employeeNo,
            data.paydate,
            data.checkNumber,
            data.payAmount,
            data.payNo
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
    //单个员工支付历史
    PayHistory_search_One(client, data, callback) {
        var sql = `select *
                  from PayHistory
                  where employeeNo = ?
                  order by payNo desc`;
        client.query(sql, [data], (err, result) => {
            if (err) throw err
            callback(result);
        })
    }
}