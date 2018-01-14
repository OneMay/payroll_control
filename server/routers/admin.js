var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var moment = require('moment');
var db = require('../mysql/connect');
//统一返回格式
var responseData;
var num = 0;
router.use(function(req, res, next) {
        responseData = {
            code: 200,
            message: ''
        }
        next();
    })
    //时间格式化
Date.prototype.Format = function(fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份         
            "d+": this.getDate(), //日         
            "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时         
            "H+": this.getHours(), //小时         
            "m+": this.getMinutes(), //分         
            "s+": this.getSeconds(), //秒         
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度         
            "S": this.getMilliseconds() //毫秒         
        };
        var week = {
            "0": "/u65e5",
            "1": "/u4e00",
            "2": "/u4e8c",
            "3": "/u4e09",
            "4": "/u56db",
            "5": "/u4e94",
            "6": "/u516d"
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }
    // router.use(function(req, res, next) {
    //     var originalUrl = ['/user/login', 'user/logout']
    //     if (originalUrl.indexOf(req._parsedUrl.pathname) < 0) {
    //         if (req.session.adminuser_id) {
    //             adminUser.findOne({
    //                 _id: req.session.adminuser_id
    //             }).then(function(userInfo) {
    //                 if (userInfo) {
    //                     res.cookies.set('adminuserInfo', JSON.stringify({
    //                         _id: userInfo._id,
    //                         username: userInfo.username
    //                     }), {
    //                         'httpOnly': false,
    //                         'path': '/admin'
    //                     });
    //                     next()
    //                 }
    //             })
    //         } else {
    //             res.cookies.set('adminuserInfo', null, {
    //                 'httpOnly': false,
    //                 'path': '/admin'
    //             });
    //             res.redirect(301, '/admin/login.html');
    //             return;
    //         }
    //     } else {
    //         next();
    //     }
    // })
    //员工添加
router.post('/employee/add', function(req, res, next) {
        var title = req.body.title;
        var fistName = req.body.fistName;
        var middleName = req.body.middleName;
        var lastName = req.body.lastName;
        var address = req.body.address;
        var workTelExt = req.body.workTelExt;
        var homTelNo = req.body.homTelNo;
        var empEmailAdress = req.body.empEmailAdress;
        var socialSecurutyNumber = req.body.socialSecurutyNumber;
        var DOB = req.body.DOB;
        var position = req.body.position;
        var sex = req.body.sex;
        var salary = req.body.salary;
        var dateStarted = req.body.dateStarted;
        var count;
        console.log(req.body)
        if (title && fistName && (middleName || lastName) && address && workTelExt && homTelNo && empEmailAdress && socialSecurutyNumber && DOB && position && sex && salary && dateStarted) {
            var client = db.connectServer();
            db.socialSecurutyNumber_search(client, socialSecurutyNumber, function(result) {
                if (result[0]) {
                    responseData.code = 404;
                    responseData.message = '社保号码已被使用';
                    return res.json(responseData);
                } else {
                    db.employeeNo_search(client, function(result) {
                        count = result.length;
                        var data;
                        if (count > 0) {
                            var reg = /2018(\d*)/;
                            var num = parseInt(reg.exec(result[0].EmployeeNO)[1]);
                            data = {
                                title: title,
                                fistName: fistName,
                                middleName: middleName,
                                lastName: lastName,
                                address: address,
                                workTelExt: workTelExt,
                                homTelNo: homTelNo,
                                empEmailAdress: empEmailAdress,
                                socialSecurutyNumber: socialSecurutyNumber,
                                DOB: DOB,
                                position: position,
                                sex: sex,
                                salary: salary,
                                dateStarted: dateStarted,
                                employeeNO: '2018' + (num + 1)
                            }
                        } else {
                            data = {
                                title: title,
                                fistName: fistName,
                                middleName: middleName,
                                lastName: lastName,
                                address: address,
                                workTelExt: workTelExt,
                                homTelNo: homTelNo,
                                empEmailAdress: empEmailAdress,
                                socialSecurutyNumber: socialSecurutyNumber,
                                DOB: DOB,
                                position: position,
                                sex: sex,
                                salary: salary,
                                dateStarted: dateStarted,
                                employeeNO: '2018' + (count + 1)
                            }
                        }
                        db.employee_add(client, data, function(result) {
                            responseData.code = 200;
                            responseData.message = '添加成功';
                            return res.json(responseData);
                        })
                    })
                }
            })
        } else {
            responseData.code = 404;
            responseData.message = '信息不完整';
            return res.json(responseData);
        }

    })
    //按员工编号查询
router.post('/employee/employeeNo_search', function(req, res, next) {
        var employeeNO = req.body.employeeNO;
        if (employeeNO) {
            var client = db.connectServer();
            db.employee_search(client, employeeNO, function(result) {
                if (result[0]) {
                    responseData.userInfo = result[0];
                    responseData.code = 200;
                    responseData.message = '查询成功';
                    return res.json(responseData);
                } else {
                    responseData.userInfo = {};
                    responseData.code = 404;
                    responseData.message = '无此员工信息记录';
                    return res.json(responseData);
                }
            })
        } else {
            responseData.code = 404;
            responseData.message = '请输入员工编号';
            return res.json(responseData);
        }
    })
    //按修改密码
router.post('/employee/password', function(req, res, next) {
        var employeeNO = req.body.employeeNO;
        var password = req.body.password;
        if (employeeNO && password) {
            var client = db.connectServer();
            db.employee_search(client, employeeNO, function(result) {
                if (result[0]) {
                    var data = {
                        password: password,
                        employeeNO: employeeNO
                    };
                    db.employee_pw_update(client, data, function(result) {
                        responseData.code = 200;
                        responseData.message = '修改成功';
                        return res.json(responseData);
                    })
                } else {
                    responseData.userInfo = {};
                    responseData.code = 404;
                    responseData.message = '无此员工信息记录';
                    return res.json(responseData);
                }
            })
        } else {
            responseData.code = 404;
            responseData.message = '请输入员工编号';
            return res.json(responseData);
        }
    })
    //所有员工编号查询
router.post('/employee/search', function(req, res, next) {
        var client = db.connectServer();
        db.employeeNo_search(client, function(result) {
            var employeeNO = [];
            for (var i = 0; i < result.length; i++) {
                employeeNO.push(result[i].EmployeeNO);
            }
            responseData.userInfo = result;
            responseData.employeeNO = employeeNO;
            responseData.code = 200;
            responseData.message = 'success';
            return res.json(responseData);
        })
    })
    //员工信息修改
router.post('/employee/update', function(req, res, next) {
        var title = req.body.title;
        var fistName = req.body.fistName;
        var middleName = req.body.middleName;
        var lastName = req.body.lastName;
        var address = req.body.address;
        var workTelExt = req.body.workTelExt;
        var homTelNo = req.body.homTelNo;
        var empEmailAdress = req.body.empEmailAdress;
        var socialSecurutyNumber = req.body.socialSecurutyNumber;
        var DOB = req.body.DOB;
        var position = req.body.position;
        var sex = req.body.sex;
        var salary = req.body.salary;
        var dateStarted = req.body.dateStarted;
        var employeeNO = req.body.employeeNO;
        if (title && fistName && (middleName || lastName) && address && workTelExt && homTelNo && empEmailAdress && socialSecurutyNumber && DOB && position && sex && salary && dateStarted && employeeNO) {
            var client = db.connectServer();
            db.socialSecurutyNumber_search(client, socialSecurutyNumber, function(result) {
                if (result[0] && result[0].EmployeeNO != employeeNO) {
                    responseData.code = 404;
                    responseData.message = '社保号码已被使用';
                    return res.json(responseData);
                } else {
                    var data = {
                        title: title,
                        fistName: fistName,
                        middleName: middleName,
                        lastName: lastName,
                        address: address,
                        workTelExt: workTelExt,
                        homTelNo: homTelNo,
                        empEmailAdress: empEmailAdress,
                        socialSecurutyNumber: socialSecurutyNumber,
                        DOB: DOB,
                        position: position,
                        sex: sex,
                        salary: salary,
                        dateStarted: dateStarted,
                        employeeNO: employeeNO
                    }
                    db.employee_update(client, data, function(result) {
                        responseData.code = 200;
                        responseData.message = '更新成功';
                        return res.json(responseData);
                    })
                }
            })
        } else {
            responseData.code = 404;
            responseData.message = '信息不完整';
            return res.json(responseData);
        }
    })
    //按员工编号删除
router.delete('/employee/delete', function(req, res, next) {
    var employeeNO = req.body.EmployeeNO;
    if (employeeNO) {
        var client = db.connectServer();
        db.employee_search(client, employeeNO, function(result) {
            if (result[0]) {
                db.employeeNo_delete(client, employeeNO, function() {
                    responseData.code = 200;
                    responseData.message = '删除成功';
                    return res.json(responseData);
                })
            } else {
                responseData.code = 404;
                responseData.message = '无此员工信息记录';
                return res.json(responseData);
            }
        })

    } else {
        responseData.code = 404;
        responseData.message = '请输入员工编号';
        return res.json(responseData);
    }
})

//奖金类型添加
router.post('/bouns/add', function(req, res, next) {
        var count;
        var bonusDescription = req.body.bonusDescription;
        if (bonusDescription) {
            var client = db.connectServer();
            db.bouns_search_all(client, function(result) {
                count = result.length;
                var data;
                if (count > 0) {
                    var reg = /42(\d*)/;
                    var num = parseInt(reg.exec(result[0].bonusTypeNo)[1]);
                    var data = {
                        bonusTypeNo: '42' + (num + 1),
                        bonusDescription: bonusDescription
                    }
                } else {
                    data = {
                        bonusTypeNo: '42' + (count + 1),
                        bonusDescription: bonusDescription
                    }
                }
                db.bouns_add(client, data, function(result) {
                    responseData.code = 200;
                    responseData.message = '添加成功';
                    return res.json(responseData);
                })
            })
        } else {
            responseData.code = 404;
            responseData.message = '信息输入不完整';
            return res.json(responseData);
        }
    })
    //按奖金类别编号查询
router.post('/bonus/search', function(req, res, next) {
        var bonusTypeNo = req.body.bonusTypeNo;
        if (bonusTypeNo) {
            var client = db.connectServer();
            db.bonus_search(client, bonusTypeNo, function(result) {
                if (result[0]) {
                    responseData.bonus = result[0];
                    responseData.code = 200;
                    responseData.message = '查询成功';
                    return res.json(responseData);
                } else {
                    responseData.bonus = {};
                    responseData.code = 404;
                    responseData.message = '无此奖金类别记录';
                    return res.json(responseData);
                }
            })
        } else {
            responseData.code = 404;
            responseData.message = '请输入奖金类别编号';
            return res.json(responseData);
        }
    })
    //按奖金类别描述模糊查询
router.post('/bonus/search_dec', function(req, res, next) {
        var bonusDescription = req.body.bonusDescription;
        if (bonusDescription) {
            var client = db.connectServer();
            db.bonus_search_dec(client, bonusDescription, function(result) {
                if (result[0]) {
                    responseData.bonus = result;
                    responseData.code = 200;
                    responseData.message = '查询成功';
                    return res.json(responseData);
                } else {
                    responseData.bonus = [];
                    responseData.code = 404;
                    responseData.message = '无此奖金类别记录';
                    return res.json(responseData);
                }
            })
        } else {
            responseData.code = 404;
            responseData.message = '请输入奖金类别描述';
            return res.json(responseData);
        }
    })
    //查询所有奖金类别编号
router.post('/bonus/searchAll', function(req, res, next) {
        var client = db.connectServer();
        db.bouns_search_all(client, function(result) {
            var bonusTypeNo = [];
            for (var i = 0; i < result.length; i++) {
                bonusTypeNo.push(result[i].bonusTypeNo);
            }
            responseData.bonus = result;
            responseData.bonusTypeNo = bonusTypeNo;
            responseData.code = 200;
            responseData.message = 'success';
            return res.json(responseData);
        })
    })
    //按奖金类别编号删除
router.delete('/bonus/delete', function(req, res, next) {
        var bonusTypeNo = req.body.bonusTypeNo;
        if (bonusTypeNo) {
            var client = db.connectServer();
            db.bonus_search(client, bonusTypeNo, function(result) {
                if (result[0]) {
                    console.log(99999)
                    db.bonus_delete(client, bonusTypeNo, function(result) {
                        responseData.code = 200;
                        responseData.message = '删除成功';
                        return res.json(responseData);
                    })
                } else {
                    responseData.code = 404;
                    responseData.message = '无此奖金类别记录';
                    return res.json(responseData);
                }
            })
        } else {
            responseData.code = 404;
            responseData.message = '请输入奖金类别编号';
            return res.json(responseData);
        }
    })
    //奖金添加
router.post('/bonusSend/add', function(req, res, next) {
        var count;
        var employeeNo = req.body.employeeNo;
        var bonusDate = req.body.bonusDate;
        var bonusAmount = req.body.bonusAmount;
        var bonusTypeNo = req.body.bonusTypeNo;
        if (employeeNo && bonusDate && bonusAmount && bonusTypeNo) {
            var client = db.connectServer();
            var data = {
                employeeNo: employeeNo,
                bonusDate: bonusDate
            };
            db.bonusSend_search(client, data, function(result) {
                if (result[0]) {
                    responseData.code = 404;
                    responseData.message = '已经添加了奖金';
                    return res.json(responseData);
                } else {
                    var data = {
                        employeeNo: employeeNo,
                        bonusDate: bonusDate,
                        bonusAmount: bonusAmount,
                        bonusTypeNo: bonusTypeNo
                    };
                    db.bonusSend_add(client, data, function(result) {
                        responseData.code = 200;
                        responseData.message = '添加成功';
                        return res.json(responseData);
                    })
                }
            })
        } else {
            responseData.code = 404;
            responseData.message = '信息输入不完整';
            return res.json(responseData);
        }
    })
    //按员工编号和发放时间查询
router.post('/bonusSend/search', function(req, res, next) {
        var employeeNo = req.body.employeeNo;
        var bonusDate = req.body.bonusDate;
        if (employeeNo && bonusDate) {
            var client = db.connectServer();
            var data = {
                employeeNo: employeeNo,
                bonusDate: bonusDate
            }
            db.bonusSend_search(client, data, function(result) {
                if (result[0]) {
                    responseData.bonus = result[0];
                    responseData.code = 200;
                    responseData.message = '查询成功';
                    return res.json(responseData);
                } else {
                    responseData.bonus = {};
                    responseData.code = 404;
                    responseData.message = '无此奖金记录';
                    return res.json(responseData);
                }
            })
        } else {
            responseData.code = 404;
            responseData.message = '请输入奖金编号';
            return res.json(responseData);
        }
    })
    //查询所有奖金
router.post('/bonusSend/searchAll', function(req, res, next) {
        var client = db.connectServer();
        db.bonusSend_search_all(client, function(result) {
            responseData.bonus = result;
            responseData.code = 200;
            responseData.message = 'success';
            return res.json(responseData);
        })
    })
    //按奖金删除
router.delete('/bonusSend/delete', function(req, res, next) {
    var employeeNo = req.body.employeeNo;
    var bonusDate = req.body.bonusDate;
    if (employeeNo && bonusDate) {
        var client = db.connectServer();
        var data = {
            employeeNo: employeeNo,
            bonusDate: bonusDate
        }
        db.bonusSend_search(client, data, function(result) {
            if (result[0]) {
                db.bonusSend_delete(client, data, function(result) {
                    responseData.code = 200;
                    responseData.message = '删除成功';
                    return res.json(responseData);
                })
            } else {
                responseData.code = 404;
                responseData.message = '无此奖金记录';
                return res.json(responseData);
            }
        })
    } else {
        responseData.code = 404;
        responseData.message = '请输入奖金编号';
        return res.json(responseData);
    }
})

//工资扣除类型添加
router.post('/deductType/add', function(req, res, next) {
        var deductDescription = req.body.deductDescription;
        var count;
        if (deductDescription) {
            var client = db.connectServer();
            db.deductType_search_all(client, function(result) {
                count = result.length;
                var data;
                if (count > 0) {
                    var reg = /de(\d*)/;
                    var num = parseInt(reg.exec(result[0].deductTypeNo)[1]);
                    data = {
                        deductDescription: deductDescription,
                        deductTypeNo: 'de' + (num + 1)
                    }
                } else {
                    data = {
                        deductDescription: deductDescription,
                        deductTypeNo: 'de' + (count + 1)
                    }
                }

                db.deductType_add(client, data, function(result) {
                    responseData.code = 200;
                    responseData.message = '添加成功';
                    return res.json(responseData);
                })
            });

        } else {
            responseData.code = 404;
            responseData.message = '输入信息不完整';
            return res.json(responseData);
        }
    })
    //按资产编号查询
router.post('/deductType/search', function(req, res, next) {
        var deductTypeNo = req.body.deductTypeNo;
        if (deductTypeNo) {
            var client = db.connectServer();
            db.deductType_search(client, deductTypeNo, function(result) {
                if (result[0]) {
                    responseData.deductType = result[0];
                    responseData.code = 200;
                    responseData.message = '查询成功';
                    return res.json(responseData);
                } else {
                    responseData.deductType = {};
                    responseData.code = 404;
                    responseData.message = '无此信息';
                    return res.json(responseData);
                }
            })
        } else {
            responseData.code = 404;
            responseData.message = '请输入编号';
            return res.json(responseData);
        }
    })
    //查询所有工资扣除
router.post('/deductType/searchAll', function(req, res, next) {
        var client = db.connectServer();
        db.deductType_search_all(client, function(result) {
            var deductTypeNo = [];
            for (var i = 0; i < result.length; i++) {
                deductTypeNo.push(result[i].deductTypeNo);
            }
            responseData.deductType = result;
            responseData.deductTypeNo = deductTypeNo;
            responseData.code = 200;
            responseData.message = 'success';
            return res.json(responseData);
        })
    })
    //按扣除编号删除
router.delete('/deductType/delete', function(req, res, next) {
        var deductTypeNo = req.body.deductTypeNo;
        if (deductTypeNo) {
            var client = db.connectServer();
            db.deductType_search(client, deductTypeNo, function(result) {
                if (result[0]) {
                    db.deductType_delete(client, deductTypeNo, function(result) {
                        responseData.code = 200;
                        responseData.message = '删除成功';
                        return res.json(responseData);
                    })
                } else {
                    responseData.code = 404;
                    responseData.message = '无此信息';
                    return res.json(responseData);
                }
            })
        } else {
            responseData.code = 404;
            responseData.message = '请输入编号';
            return res.json(responseData);
        }
    })
    //工资扣除添加
router.post('/deduction/add', function(req, res, next) {
        var employeeNo = req.body.employeeNo;
        var deductDate = req.body.deductDate;
        var deductAmount = req.body.deductAmount;
        var deductTypeNo = req.body.deductTypeNo;
        var count;
        if (employeeNo && deductDate && deductAmount && deductTypeNo) {
            var client = db.connectServer();
            var data = {
                employeeNo: employeeNo,
                deductDate: deductDate
            }
            db.deduction_search(client, data, function(result) {
                if (result[0]) {
                    responseData.code = 404;
                    responseData.message = '此时间段已经处理';
                    return res.json(responseData);
                } else {
                    db.deduction_search_all(client, function(result) {
                        count = result.length;
                        var data = {
                            employeeNo: employeeNo,
                            deductDate: deductDate,
                            deductAmount: deductAmount,
                            deductTypeNo: deductTypeNo
                        };
                        db.deduction_add(client, data, function(result) {
                            responseData.code = 200;
                            responseData.message = '添加成功';
                            return res.json(responseData);
                        })
                    })
                }
            })
        } else {
            responseData.code = 404;
            responseData.message = '输入信息不完整';
            return res.json(responseData);
        }
    })
    //按员工编号和时长查询
router.post('/deduction/search', function(req, res, next) {
        var employeeNo = req.body.employeeNo;
        var deductDate = req.body.deductDate;
        if (employeeNo && deductDate) {
            var client = db.connectServer();
            var data = {
                employeeNo: employeeNo,
                deductDate: deductDate
            }
            db.deduction_search(client, data, function(result) {
                if (result[0]) {
                    responseData.deduction = result[0];
                    responseData.code = 200;
                    responseData.message = '查询成功';
                    return res.json(responseData);
                } else {
                    responseData.deduction = {};
                    responseData.code = 404;
                    responseData.message = '无此信息';
                    return res.json(responseData);
                }
            })
        } else {
            responseData.code = 404;
            responseData.message = '请输入编号和时长';
            return res.json(responseData);
        }
    })
    //查询所有工资扣除
router.post('/deduction/searchAll', function(req, res, next) {
        var client = db.connectServer();
        db.deduction_search_all(client, function(result) {
            responseData.deduction = result;
            responseData.code = 200;
            responseData.message = 'success';
            return res.json(responseData);
        })
    })
    //工资扣除删除
router.delete('/deduction/delete', function(req, res, next) {
    var employeeNo = req.body.employeeNo;
    var deductDate = req.body.deductDate;
    if (employeeNo && deductDate) {
        var client = db.connectServer();
        var data = {
            employeeNo: employeeNo,
            deductDate: deductDate
        }
        db.deduction_search(client, data, function(result) {
            if (result[0]) {
                db.deduction_delete(client, data, function(result) {
                    responseData.code = 200;
                    responseData.message = '删除成功';
                    return res.json(responseData);
                })
            } else {
                responseData.code = 404;
                responseData.message = '无此信息';
                return res.json(responseData);
            }
        })
    } else {
        responseData.code = 404;
        responseData.message = '请输入编号和时长';
        return res.json(responseData);
    }
})

//假期添加
router.post('/holiday/add', function(req, res, next) {
        var employeeNo = req.body.employeeNo;
        var startDate = req.body.startDate;
        var endDate = req.body.endDate;
        if (employeeNo && startDate && endDate) {
            var client = db.connectServer();
            db.holiday_search(client, employeeNo, function(result) {
                if (result[0]) {
                    responseData.code = 404;
                    responseData.message = '此员工已经有记录，不能添加，只能修改和删除';
                    return res.json(responseData);
                } else {
                    var data = {
                        employeeNo: employeeNo,
                        startDate: startDate,
                        endDate: endDate
                    };
                    db.holiday_add(client, data, function(result) {
                        responseData.code = 200;
                        responseData.message = '添加成功';
                        return res.json(responseData);
                    })
                }
            })
        } else {
            responseData.code = 404;
            responseData.message = '输入信息不完整';
            return res.json(responseData);
        }
    })
    //按假期编号查询
router.post('/holiday/search', function(req, res, next) {
        var employeeNo = req.body.employeeNo;
        if (employeeNo) {
            var client = db.connectServer();
            db.holiday_search(client, employeeNo, function(result) {
                if (result[0]) {
                    responseData.holiday = result[0];
                    responseData.code = 200;
                    responseData.message = '查询成功';
                    return res.json(responseData);
                } else {
                    responseData.holiday = [];
                    responseData.code = 404;
                    responseData.message = '无此假期信息记录';
                    return res.json(responseData);
                }
            })
        } else {
            responseData.code = 404;
            responseData.message = '请输入假期编号';
            return res.json(responseData);
        }
    })
    //查询所有假期
router.post('/holiday/searchAll', function(req, res, next) {
        var client = db.connectServer();
        db.holiday_search_all(client, function(result) {
            responseData.holiday = result;
            responseData.code = 200;
            responseData.message = 'success';
            return res.json(responseData);
        })
    })
    //假期更新
router.post('/holiday/update', function(req, res, next) {
        var employeeNo = req.body.employeeNo;
        var startDate = req.body.startDate;
        var endDate = req.body.endDate;
        if (employeeNo && startDate && endDate) {
            var client = db.connectServer();
            var data = {
                employeeNo: employeeNo,
                startDate: startDate,
                endDate: endDate
            };
            db.holiday_update(client, data, function(result) {
                responseData.code = 200;
                responseData.message = '更新成功';
                return res.json(responseData);
            })
        } else {
            responseData.code = 404;
            responseData.message = '输入信息不完整';
            return res.json(responseData);
        }
    })
    //假期删除
router.delete('/holiday/delete', function(req, res, next) {
    var employeeNo = req.body.employeeNo;
    if (employeeNo) {
        var client = db.connectServer();
        db.holiday_search(client, employeeNo, function(result) {
            if (result[0]) {
                db.holiday_delete(client, employeeNo, function(result) {
                    responseData.code = 200;
                    responseData.message = '删除成功';
                    return res.json(responseData);
                })
            } else {
                responseData.code = 404;
                responseData.message = '无此假期信息';
                return res.json(responseData);
            }
        })
    } else {
        responseData.code = 404;
        responseData.message = '请输入假期编号';
        return res.json(responseData);
    }
})

//病假添加
router.post('/SickLeave/add', function(req, res, next) {
        var employeeNo = req.body.employeeNo;
        var startDate = req.body.startDate;
        var endDate = req.body.endDate;
        var reason = req.body.reason;
        if (employeeNo && startDate && endDate && reason) {
            var client = db.connectServer();
            db.SickLeave_search(client, employeeNo, startDate, function(result) {
                if (result[0]) {
                    responseData.code = 404;
                    responseData.message = '此时间已经请假了';
                    return res.json(responseData);
                } else {
                    var data = {
                        employeeNo: employeeNo,
                        startDate: startDate,
                        endDate: endDate,
                        reason: reason
                    };

                    db.SickLeave_add(client, data, function(result) {
                        responseData.code = 200;
                        responseData.message = '添加成功';
                        return res.json(responseData);
                    })
                }
            })
        } else {
            responseData.code = 404;
            responseData.message = '输入信息不完整';
            return res.json(responseData);
        }
    })
    //按员工编号和开始时间查询
router.post('/SickLeave/serach', function(req, res, next) {
        var employeeNo = req.body.employeeNo;
        var startDate = req.body.startDate;
        if (employeeNo && startDate) {
            var client = db.connectServer();
            db.SickLeave_search(client, employeeNo, startDate, function(result) {
                if (result[0]) {
                    responseData.SickLeave = result[0];
                    responseData.code = 200;
                    responseData.message = '查询成功';
                    return res.json(responseData);
                } else {
                    responseData.SickLeave = {};
                    responseData.code = 404;
                    responseData.message = '无此记录';
                    return res.json(responseData);
                }
            })
        } else {
            responseData.code = 404;
            responseData.message = '请输入编号和开始时间';
            return res.json(responseData);
        }
    })
    //查询所有病假
router.post('/SickLeave/searchAll', function(req, res, next) {
        var client = db.connectServer();
        db.SickLeave_search_all(client, function(result) {
            responseData.SickLeave = result;
            responseData.code = 200;
            responseData.message = 'success';
            return res.json(responseData);
        })
    })
    //假期删除
router.delete('/SickLeave/delete', function(req, res, next) {
    var employeeNo = req.body.employeeNo;
    var startDate = req.body.startDate;
    if (employeeNo && startDate) {
        var client = db.connectServer();
        db.SickLeave_search(client, employeeNo, startDate, function(result) {
            if (result[0]) {
                var data = {
                    startDate: startDate,
                    employeeNo: employeeNo
                }
                db.SickLeave_delete(client, data, function(result) {
                    responseData.code = 200;
                    responseData.message = '删除成功';
                    return res.json(responseData);
                })
            } else {
                responseData.code = 404;
                responseData.message = '无此信息';
                return res.json(responseData);
            }
        })
    } else {
        responseData.code = 404;
        responseData.message = '请输入编号和开始时间';
        return res.json(responseData);
    }
})

//支付类型添加
router.post('/PayType/add', function(req, res, next) {
        var payTypeDescription = req.body.payTypeDescription;
        var count;
        if (payTypeDescription) {
            var client = db.connectServer();
            db.PayType_search_all(client, function(result) {
                count = result.length;
                var data;
                if (count > 0) {
                    var num = parseInt(result[0].payTypeNo);
                    data = {
                        payTypeDescription: payTypeDescription,
                        payTypeNo: (num + 1)
                    }
                } else {
                    data = {
                        payTypeDescription: payTypeDescription,
                        payTypeNo: (count + 1)
                    }
                }

                db.PayType_add(client, data, function(result) {
                    responseData.code = 200;
                    responseData.message = '添加成功';
                    return res.json(responseData);
                })
            });

        } else {
            responseData.code = 404;
            responseData.message = '输入信息不完整';
            return res.json(responseData);
        }
    })
    //按支付类型编号查询
router.post('/PayType/search', function(req, res, next) {
        var payTypeNo = req.body.payTypeNo;
        if (payTypeNo) {
            var client = db.connectServer();
            db.PayType_search(client, payTypeNo, function(result) {
                if (result[0]) {
                    responseData.PayType = result[0];
                    responseData.code = 200;
                    responseData.message = '查询成功';
                    return res.json(responseData);
                } else {
                    responseData.PayType = {};
                    responseData.code = 404;
                    responseData.message = '无此信息';
                    return res.json(responseData);
                }
            })
        } else {
            responseData.code = 404;
            responseData.message = '请输入编号';
            return res.json(responseData);
        }
    })
    //查询所有支付类型
router.post('/PayType/searchAll', function(req, res, next) {
        var client = db.connectServer();
        db.PayType_search_all(client, function(result) {
            var payTypeNo = [];
            for (var i = 0; i < result.length; i++) {
                payTypeNo.push(result[i].payTypeNo);
            }
            responseData.PayType = result;
            responseData.payTypeNo = payTypeNo;
            responseData.code = 200;
            responseData.message = 'success';
            return res.json(responseData);
        })
    })
    //按扣除编号删除
router.delete('/PayType/delete', function(req, res, next) {
    var payTypeNo = req.body.payTypeNo;
    if (payTypeNo) {
        var client = db.connectServer();
        db.PayType_search(client, payTypeNo, function(result) {
            if (result[0]) {
                db.PayType_delete(client, payTypeNo, function(result) {
                    responseData.code = 200;
                    responseData.message = '删除成功';
                    return res.json(responseData);
                })
            } else {
                responseData.code = 404;
                responseData.message = '无此信息';
                return res.json(responseData);
            }
        })
    } else {
        responseData.code = 404;
        responseData.message = '请输入编号';
        return res.json(responseData);
    }
})

//支付添加
router.post('/PayDetails/add', function(req, res, next) {
        var employeeNo = req.body.employeeNo;
        var startDate = req.body.startDate;
        var routingNumber = req.body.routingNumber;
        var accountType = req.body.accountType;
        var bankName = req.body.bankName;
        var bankAddress = req.body.bankAddress;
        var payTypeNo = req.body.payTypeNo;
        var money = parseFloat(req.body.money);
        var count;
        if (employeeNo && startDate && routingNumber && accountType && bankName && bankAddress && payTypeNo && money) {
            var client = db.connectServer();
            var data = {
                employeeNo: employeeNo,
                startDate: startDate
            }
            db.PayDetails_serach(client, data, function(result) {
                if (result[0]) {
                    responseData.code = 404;
                    responseData.message = '本次工资已经支付';
                    return res.json(responseData);
                } else {
                    var data = {
                        employeeNo: employeeNo,
                        startDate: startDate,
                        routingNumber: routingNumber,
                        accountType: accountType,
                        bankName: bankName,
                        bankAddress: bankAddress,
                        payTypeNo: payTypeNo
                    }
                    db.PayDetails_add(client, data, function(result) {
                        var data = {
                            employeeNo: employeeNo,
                            pay: 'true'
                        }
                        db.bonusSend_pay(client, data, function(result) {
                            db.deduction_pay(client, data, function(result) {
                                db.PayHistory_search_all(client, function(result) {
                                    count = result.length;
                                    var data;
                                    if (count > 0) {
                                        var reg = /No(\d*)/;
                                        var num = parseInt(reg.exec(result[0].payNo)[1]);
                                        data = {
                                            employeeNo: employeeNo,
                                            paydate: startDate,
                                            checkNumber: employeeNo,
                                            payAmount: money,
                                            payNo: 'No' + (num + 1)
                                        }
                                    } else {
                                        data = {
                                            employeeNo: employeeNo,
                                            paydate: startDate,
                                            checkNumber: employeeNo,
                                            payAmount: money,
                                            payNo: 'No' + (count + 1)
                                        }
                                    }
                                    db.PayHistory_add(client, data, function(result) {
                                        responseData.code = 200;
                                        responseData.message = '添加成功';
                                        return res.json(responseData);
                                    })
                                })

                            })
                        })
                    })
                }
            })
        } else {
            responseData.code = 404;
            responseData.message = '输入信息不完整';
            return res.json(responseData);
        }
    })
    //支付金额设置
router.post('/money/search', function(req, res, next) {
    var employeeNO = req.body.employeeNO;
    var money = 0;
    if (employeeNO) {
        var client = db.connectServer();
        db.employee_search(client, employeeNO, function(result) {
            if (result[0]) {
                var salary = result[0].salary;
                money += parseFloat(salary);
                var data = {
                    employeeNo: employeeNO,
                    pay: 'false'
                };

                db.bonusSend_search_employee(client, data, function(result) {
                    if (result.length > 0) {
                        var bonus = 0;
                        for (var i = 0; i < result.length; i++) {
                            bonus += parseFloat(result[i].bonusAmount);
                        }
                        money += parseFloat(bonus);
                        db.deduction_search_employeeNo(client, data, function(result) {
                            if (result.length > 0) {
                                var deduction = 0;
                                for (var i = 0; i < result.length; i++) {
                                    deduction += parseFloat(result[i].deductAmount);
                                }
                                money -= parseFloat(deduction);
                                responseData.money = money;
                                responseData.code = 200;
                                responseData.message = '查询成功';
                                return res.json(responseData);
                            } else {
                                responseData.money = money;
                                responseData.code = 200;
                                responseData.message = '查询成功';
                                return res.json(responseData);
                            }
                        })
                    } else {
                        db.deduction_search_employeeNo(client, data, function(result) {
                            if (result.length > 0) {
                                var deduction = 0;
                                for (var i = 0; i < result.length; i++) {
                                    deduction += parseFloat(result[i].deductAmount);
                                }
                                money -= parseFloat(deduction);
                                responseData.money = money;
                                responseData.code = 200;
                                responseData.message = '查询成功';
                                return res.json(responseData);
                            } else {
                                responseData.money = money;
                                responseData.code = 200;
                                responseData.message = '查询成功';
                                return res.json(responseData);
                            }
                        })
                    }
                })
            } else {
                responseData.money = 0;
                responseData.code = 404;
                responseData.message = '没有此员工信息';
                return res.json(responseData);
            }
        })
    } else {
        responseData.code = 404;
        responseData.message = '信息输入不完整';
        return res.json(responseData);
    }
})

//查询所有支付历史
router.post('/PayHistory/searchAll', function(req, res, next) {
    var client = db.connectServer();
    db.PayHistory_search_all(client, function(result) {
        var payTypeNo = [];
        responseData.PayHistory = result;
        responseData.code = 200;
        responseData.message = 'success';
        return res.json(responseData);
    })
})

//查询一个员工所有支付历史
router.post('/PayHistory/searchOne', function(req, res, next) {
    var employeeNo = req.body.employeeNo;
    if (employeeNo) {
        var client = db.connectServer();
        db.PayHistory_search_One(client, employeeNo, function(result) {
            responseData.PayHistory = result;
            responseData.code = 200;
            responseData.message = 'success';
            return res.json(responseData);
        })
    } else {
        responseData.code = 404;
        responseData.message = 'error';
        return res.json(responseData);
    }
})
module.exports = router;