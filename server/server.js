var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var session = require('express-session');
var favicon = require('serve-favicon')
var cookies = require('cookies');
var admin = require('./routers/admin.js');
var api = require('./routers/api.js');
var app = express();
//var index = require('./routes/index.js');
app.set('views', path.join(path.resolve(__dirname, '..'), 'client'))
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(path.join(path.resolve(__dirname, '..'), 'client')));
app.use(logger('dev'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
//配置用户验证
app.use(session({
    secret: 'fehey',
    cookie: { maxAge: 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: true,
    name: 'fehey' // 若不设置 默认为 connect.sid ,name可换成key
}));
//cookie
app.use(function(req, res, next) {
    res.setHeader('cache-control', 'no-cache');
    res.cookies = new cookies(req, res);
    // req.userInfo = {};
    // //解析用户登陆的cookie信息
    // if (req.headers.cookie) {
    //     try {
    //         var reg = /(userInfo=)(.+)/g
    //         var user = reg.exec(req.headers.cookie)[2]
    //         req.userInfo = JSON.parse(user);
    //     } catch (e) {
    //         return next();
    //     }
    // }
    return next();
})
var userName = '',
    code = 0,
    EmployeeNO = '';

function name(req, res) {
    if (req.session.user && req.session.user.code) {
        userName = req.session.user.name;
        EmployeeNO = req.session.user.employeeNo
        code = req.session.user.code
    } else {
        res.redirect('/');
    }
}
app.get("/", function(req, res) {
    console.log(req.session.user)
    if (req.session.user && req.session.user.code) {
        res.redirect('/index');
    }
    res.render("login", {
        title: '欢迎进入工资管理系统',
        userName: userName,
        code: code,
        EmployeeNO: EmployeeNO
    });
});
app.get("/index", function(req, res) {
    name(req, res)
    res.render("index", {
        title: '欢迎进入工资管理系统',
        userName: userName,
        code: code,
        EmployeeNO: EmployeeNO
    });
});
app.get("/employee/add", function(req, res) {
    name(req, res)
    res.render("employeeAdd", {
        title: '员工添加',
        userName: userName,
        code: code,
        EmployeeNO: EmployeeNO
    });
});
app.get("/employee/list", function(req, res) {
    name(req, res)
    res.render("employeeList", {
        title: '员工列表',
        userName: userName,
        code: code,
        EmployeeNO: EmployeeNO
    });
});
app.get("/employee/update", function(req, res) {
    name(req, res)
    res.render("employeeUpdate", {
        title: '信息修改',
        userName: userName,
        code: code,
        EmployeeNO: EmployeeNO
    });
});
app.get("/bonus/management", function(req, res) {
    name(req, res)
    res.render("bonus", {
        title: '奖金管理',
        userName: userName,
        code: code,
        EmployeeNO: EmployeeNO
    });
});
app.get("/bonus/send", function(req, res) {
    name(req, res)
    res.render("bonusend", {
        title: '奖金发放',
        userName: userName,
        code: code,
        EmployeeNO: EmployeeNO
    });
});
app.get("/deductType/management", function(req, res) {
    name(req, res)
    res.render("deductType", {
        title: '工资扣除',
        userName: userName,
        code: code,
        EmployeeNO: EmployeeNO
    });
});
app.get("/deduction/management", function(req, res) {
    name(req, res)
    res.render("deduct", {
        title: '工资扣除',
        userName: userName,
        code: code,
        EmployeeNO: EmployeeNO
    });
});
app.get("/holiday/management", function(req, res) {
    name(req, res)
    res.render("holiday", {
        title: '假期管理',
        userName: userName,
        code: code,
        EmployeeNO: EmployeeNO
    });
});
app.get("/SickLeave/management", function(req, res) {
    name(req, res)
    res.render("SickLeave", {
        title: '病假管理',
        userName: userName,
        code: code,
        EmployeeNO: EmployeeNO
    });
});
app.get("/PayType/management", function(req, res) {
    name(req, res)
    res.render("PayType", {
        title: '支付类型',
        userName: userName,
        code: code,
        EmployeeNO: EmployeeNO
    });
});
app.get("/PayDetails/management", function(req, res) {
    name(req, res)
    res.render("PayDetails", {
        title: '支付中心',
        userName: userName,
        code: code,
        EmployeeNO: EmployeeNO
    });
});
app.get("/user/listOne", function(req, res) {
    name(req, res)
    res.render("user", {
        title: '个人信息',
        userName: userName,
        code: code,
        EmployeeNO: EmployeeNO
    });
});
app.get("/user/pay", function(req, res) {
    name(req, res)
    res.render("userPay", {
        title: '工资发放历史',
        userName: userName,
        code: code,
        EmployeeNO: EmployeeNO
    });
});
app.use('/api', api);
app.use('/admin', admin);

//路径未匹配
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
})
app.use(function(err, req, res, next) {
    res.locals.messgae = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;