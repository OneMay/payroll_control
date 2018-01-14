 window.onload = function() {
     (function cookies() {
         var pathname = window.location.pathname;
         if (/\/employee(.+)/.test(pathname)) {
             $('.1').addClass('on');
             $('#1')[0].style.display = 'block'
             $('.2').removeClass('on');
             $('#2')[0].style.display = 'none'
             $('.3').removeClass('on');
             $('#3')[0].style.display = 'none'
             $('.4').removeClass('on');
             $('#4')[0].style.display = 'none'
         }
         if (/\/bon(.+)/.test(pathname) || /\/de(.+)/.test(pathname)) {
             $('.2').addClass('on');
             $('#2')[0].style.display = 'block'
             $('.1').removeClass('on');
             $('#1')[0].style.display = 'none'
             $('.3').removeClass('on');
             $('#3')[0].style.display = 'none'
             $('.4').removeClass('on');
             $('#4')[0].style.display = 'none'
         }
         if (/\/ho(.+)/.test(pathname) || /\/Si(.+)/.test(pathname)) {
             $('.3').addClass('on');
             $('#3')[0].style.display = 'block'
             $('.1').removeClass('on');
             $('#1')[0].style.display = 'none'
             $('.2').removeClass('on');
             $('#2')[0].style.display = 'none'
             $('.4').removeClass('on');
             $('#4')[0].style.display = 'none'
         }
         if (/\/Pay(.+)/.test(pathname)) {
             $('.4').addClass('on');
             $('#4')[0].style.display = 'block'
             $('.1').removeClass('on');
             $('#1')[0].style.display = 'none'
             $('.2').removeClass('on');
             $('#2')[0].style.display = 'none'
             $('.3').removeClass('on');
             $('#3')[0].style.display = 'none'
         }
     })();
 }
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
 $("#adminlogout").click(function() {
     $.ajax({
         url: '/api/user/logout',
         type: 'GET',
         cache: false,
         dataType: 'json',
         success: function(data) {
             if (data.code == 200) {
                 window.location.href = '/';
             }
         },
         err: function(err) {
             console.log(err);
         }
     })
 });


 /**
  * 添加员工信息
  */
 var employeeAdd = document.getElementById('employeeAdd');
 if (employeeAdd) {
     employeeAdd.onclick = function() {
         var employeeList = document.getElementsByClassName('employeeList');
         var message;
         $.ajax({
             url: '/admin/employee/add',
             type: 'POST',
             cache: false,
             data: {
                 title: employeeList[0].value,
                 fistName: employeeList[1].value,
                 middleName: employeeList[2].value,
                 lastName: employeeList[3].value,
                 address: employeeList[4].value,
                 workTelExt: employeeList[5].value,
                 homTelNo: employeeList[6].value,
                 empEmailAdress: employeeList[7].value,
                 socialSecurutyNumber: employeeList[8].value,
                 DOB: employeeList[9].value,
                 position: employeeList[10].value,
                 sex: employeeList[11].value,
                 salary: employeeList[12].value,
                 dateStarted: employeeList[13].value
             },
             success: function(data) {
                 message = data.message;
                 $('#Message').html(message);
                 if (data.code == 200) {
                     setTimeout(function() {
                         window.location.reload();
                     }, 1000)
                 }
             },
             err: function(err) {
                 console.log(err)
                 message = '失败';
                 $('#Message').html(message)
             }
         });


     }
 }

 /**
  * 分页
  */
 var pathname = window.location.pathname;
 var currentPage = 1;
 var page;
 var number_people;
 if (pathname == '/employee/list') {
     getPage();

     function getPage() {
         $.ajax({
             url: '/admin/employee/search',
             type: 'post',
             data: {},
             cache: false,
             dataType: 'json',
             success: function(data) {
                 page = data.page;
                 if (data.code == 200 && data.userInfo.length > 0) {
                     data.userInfo.forEach((value, index) => {
                         var html = "<tr>" +
                             "<td class='am-hide-sm-only'>" + value.EmployeeNO + "</td>" +
                             "<td>" + value.title + "</td>" +
                             "<td>" + value.fistName + value.middleName + value.lastName + "</td>" +
                             "<td>" + value.address + "</td>" +
                             "<td class='am-hide-sm-only'>" + value.workTelExt + "</td>" +
                             "<td class='am-hide-sm-only'>" + value.homeTelNo + "</td>" +
                             "<td class='am-hide-sm-only'>" + value.empEmailAddress + "</td>" +
                             "<td class='am-hide-sm-only'>" + value.socialSecurutyNumber + "</td>" +
                             "<td class='am-hide-sm-only'>" + new Date(value.DOB).Format("yyyy-MM-dd") + "</td>" +
                             "<td class='am-hide-sm-only'>" + value.position + "</td>" +
                             "<td class='am-hide-sm-only'>" + value.sex + "</td>" +
                             "<td class='am-hide-sm-only'>" + value.salary + "</td>" +
                             "<td class='am-hide-sm-only'>" + new Date(value.dateStarted).Format("yyyy-MM-dd") + "</td>" +
                             "<td>" +
                             '<div class="am-btn-toolbar">' +
                             '<div class="am-btn-group am-btn-group-xs productmall_id' + value.EmployeeNO + '">' +
                             '<span class="am-btn am-btn-default am-btn-xs am-text-danger am-round productmall_id' + value.EmployeeNO + '" title="删除">' + '<span class="am-icon-trash-o" onclick="employee_delete(' + "'" + value.EmployeeNO + "'" + ')">' + '</span></span>' +
                             '</div>' +
                             '</div>' +
                             '</td>' +
                             "</tr>";
                         $('tbody').append(html);
                     });
                     $('.Message').html(data.message);
                 } else {
                     $('.Message').html(data.message);
                 }
             },
             err: function(err) {
                 console.log(err)
             }
         })
     }

     function employee_delete(id) {
         if (id) {
             $.ajax({
                 url: '/admin/employee/delete',
                 type: 'delete',
                 data: {
                     EmployeeNO: id
                 },
                 cache: false,
                 dataType: 'json',
                 success: function(data) {
                     if (data.code == 200) {

                         window.location.reload();

                     } else {
                         alert(data.message)
                     }
                 },
                 err: function(err) {
                     console.log(err)
                 }
             })
         } else {
             alert('出错！');
         }
     }
 }


 if (pathname == '/employee/update') {
     var employee = document.getElementById('EmployeeNO_search');
     var employeeNO;
     if (employee) {
         employee.onclick = function() {
             employeeNO = document.getElementById('EmployeeNO').value;
             $.ajax({
                 url: '/admin/employee/employeeNo_search',
                 type: 'POST',
                 cache: false,
                 data: {
                     employeeNO: employeeNO
                 },
                 dataType: 'JSON',
                 success: function(data) {
                     if (data.code == 200) {
                         var str = ` <form class="am-form">
                        <div class="am-form-group am-cf">
                            <div class="zuo">职位</div>
                            <div class="you">
                                <input type="text" class="am-input-sm employeeList" id="title" placeholder="职位" value="${data.userInfo.title}">
                            </div>
                        </div>
                        <div class="am-form-group am-cf">
                            <div class="zuo">姓氏</div>
                            <div class="you">
                                <input type="text" class="am-input-sm employeeList" id="fistName" placeholder="姓氏" value="${data.userInfo.fistName}">
                            </div>
                        </div>
                        <div class="am-form-group am-cf">
                            <div class="zuo">中间名</div>
                            <div class="you">
                                <input type="text" class="am-input-sm employeeList" id="middleName" placeholder="中间名" value="${data.userInfo.middleName}">
                            </div>
                        </div>
                        <div class="am-form-group am-cf">
                            <div class="zuo">最后名</div>
                            <div class="you">
                                <input type="text" class="am-input-sm employeeList" id="lastName" placeholder="最后名" value="${data.userInfo.lastName}">
                            </div>
                        </div>
                        <div class="am-form-group am-cf">
                            <div class="zuo">地址</div>
                            <div class="you">
                                <input type="text" class="am-input-sm employeeList" id="address" placeholder="地址" value="${data.userInfo.address}">
                            </div>
                        </div>
                        <div class="am-form-group am-cf">
                            <div class="zuo">公司电话分机号</div>
                            <div class="you">
                                <input type="text" class="am-input-sm employeeList" id="workTelExt" placeholder="公司电话分机号" value="${data.userInfo.workTelExt}">
                            </div>
                        </div>
                        <div class="am-form-group am-cf">
                            <div class="zuo">家用电话号码</div>
                            <div class="you">
                                <input type="text" class="am-input-sm employeeList" id="homTelNo" placeholder="家用电话号码" value="${data.userInfo.homeTelNo}">
                            </div>
                        </div>
                        <div class="am-form-group am-cf">
                            <div class="zuo">Email地址</div>
                            <div class="you">
                                <input type="text" class="am-input-sm employeeList" id="empEmailAddress" placeholder="Email地址" value="${data.userInfo.empEmailAddress}">
                            </div>
                        </div>
                        <div class="am-form-group am-cf">
                            <div class="zuo">社保号码</div>
                            <div class="you">
                                <input type="text" class="am-input-sm employeeList" id="socialSecurutyNumber" placeholder="社保号码" value="${data.userInfo.socialSecurutyNumber}">
                            </div>
                        </div>
                        <div class="am-form-group am-cf">
                            <div class="zuo">出生日期</div>
                            <div class="you">
                                <input type="date" class="am-input-sm employeeList" id="DOB" placeholder="出生日期" value="${new Date(data.userInfo.DOB).Format("yyyy-MM-dd")}">
                            </div>
                        </div>
                        <div class="am-form-group am-cf">
                            <div class="zuo">部门</div>
                            <div class="you">
                                <input type="text" class="am-input-sm employeeList" id="position" placeholder="部门" value="${data.userInfo.position}">
                            </div>
                        </div>
                        <div class="am-form-group am-cf">
                            <div class="zuo">性别</div>
                            <div class="you">
                                <select name="sex" id="sex" class="am-input-sm employeeList" value="${data.userInfo.sex}">
                                    <option value="男">男</option>
                                    <option value="女">女</option>
                                </select>
                            </div>
                        </div>
                        <div class="am-form-group am-cf">
                            <div class="zuo">工资</div>
                            <div class="you">
                                <input type="text" class="am-input-sm employeeList" id="salary" placeholder="工资" value="${data.userInfo.salary}">
                            </div>
                        </div>
                        <div class="am-form-group am-cf">
                            <div class="zuo">开始时间</div>
                            <div class="you">
                                <input type="date" class="am-input-sm employeeList" id="dateStarted" placeholder="开始时间" value="${new Date(data.userInfo.dateStarted).Format("yyyy-MM-dd")}">
                            </div>
                        </div>
                        <div class="am-form-group am-cf">
                            <div class="you" style="margin-left: 11%;">
                                <span id="employeeUpdate" class="am-btn am-btn-success am-radius" onclick="employeeUpdate()">发布</span>
                                <span class="am-form-help" id="Message" style="display:inline-block;"></span>
                            </div>
                        </div>
                    </form>`;
                         $('.fbneirong').html(str);
                     } else {
                         $('.Message').html(data.message);
                     }
                 },
                 err: function(err) {
                     console.log(err)
                 }
             })
         }
     }

     function employeeUpdate() {
         var employeeList = document.getElementsByClassName('employeeList');
         var message;
         $.ajax({
             url: '/admin/employee/update',
             type: 'POST',
             cache: false,
             data: {
                 title: employeeList[0].value,
                 fistName: employeeList[1].value,
                 middleName: employeeList[2].value,
                 lastName: employeeList[3].value,
                 address: employeeList[4].value,
                 workTelExt: employeeList[5].value,
                 homTelNo: employeeList[6].value,
                 empEmailAdress: employeeList[7].value,
                 socialSecurutyNumber: employeeList[8].value,
                 DOB: employeeList[9].value,
                 position: employeeList[10].value,
                 sex: employeeList[11].value,
                 salary: employeeList[12].value,
                 dateStarted: employeeList[13].value,
                 employeeNO: employeeNO
             },
             success: function(data) {
                 message = data.message;
                 $('#Message').html(message);
                 if (data.code == 200) {
                     setTimeout(function() {
                         window.location.reload();
                     }, 1000)
                 }
             },
             err: function(err) {
                 console.log(err)
                 message = '失败';
                 $('#Message').html(message)
             }
         });

     }
 }

 if (pathname == '/bonus/management') {
     var bonusTypeAdd = document.getElementById('bonusTypeAdd');
     bonusTypeAdd.onclick = function() {
         var bonusDescription = document.getElementById('bonusDescription').value;
         $.ajax({
             url: '/admin/bouns/add',
             type: 'post',
             data: {
                 bonusDescription: bonusDescription
             },
             dataType: 'json',
             cache: false,
             success: function(data) {
                 if (data.code == 200) {
                     setTimeout(function() {
                         window.location.reload();
                     }, 1000)
                 } else {
                     $('#Message').html(data.message);
                 }
             },
             err: function(err) {
                 console.log(err)
             }
         })
     }

     var bonusType_search = document.getElementById('bonusType_search');
     bonusType_search.onclick = function() {
         var bonusDescription2 = document.getElementById('bonusDescription2').value;
         $.ajax({
             url: '/admin/bonus/search_dec',
             type: 'post',
             data: {
                 bonusDescription: bonusDescription2
             },
             dataType: 'json',
             cache: false,
             success: function(data) {
                 if (data.code == 200 && data.bonus.length > 0) {
                     var str = ` <form class="am-form am-g">
                     <table width="100%" class="am-table am-table-bordered am-table-radius am-table-striped">
                         <thead>
                             <tr class="am-success">
                                 <th width="163px" class="table-set">奖金类别编号</th>
                                 <th class="table-id">奖金描述</th>
                                 <th width="130px" class="table-set">操作</th>
                             </tr>
                         </thead>
                         <tbody>
                         </tbody>
                     </table>
                     <hr />
                     <p class="Message"></p>
                 </form>`;
                     $('.bonusType').html(str);
                     data.bonus.forEach((value, index) => {
                         var html = "<tr>" +
                             "<td class='am-hide-sm-only'>" + value.bonusTypeNo + "</td>" +
                             "<td>" + value.bonusDescription + "</td>" +
                             "<td>" +
                             '<div class="am-btn-toolbar">' +
                             '<div class="am-btn-group am-btn-group-xs">' +
                             '<span class="am-btn am-btn-default am-btn-xs am-text-danger am-round" title="删除">' + '<span class="am-icon-trash-o" onclick="bonusType_delete(' + "'" + value.bonusTypeNo + "'" + ')">' + '</span></span>' +
                             '</div>' +
                             '</div>' +
                             '</td>' +
                             "</tr>";
                         $('.bonusType tbody').append(html);
                     });
                 } else {
                     $('.bonusType').html(data.message);
                 }
             },
             err: function(err) {
                 console.log(err)
             }
         })
     }

     function bonusType_delete(id) {
         if (id) {
             $.ajax({
                 url: '/admin/bonus/delete',
                 type: 'delete',
                 data: {
                     bonusTypeNo: id
                 },
                 cache: false,
                 dataType: 'json',
                 success: function(data) {
                     if (data.code == 200) {
                         window.location.reload();
                     } else {
                         alert(data.message)
                     }
                 },
                 err: function(err) {
                     console.log(err)
                 }
             })
         } else {
             alert('出错！');
         }
     }
 }
 if (pathname == '/bonus/send') {
     getValue();

     function getValue() {
         $.ajax({
             url: '/admin/employee/search',
             type: 'POST',
             dataType: 'JSON',
             cache: false,
             success: function(data) {
                 if (data.employeeNO.length > 0) {
                     data.employeeNO.forEach(function(val, index) {
                         var str = `<option value="${val}">${val}</option>`;
                         $('#employeeNo').append(str);
                     })
                 } else {

                 }
             },
             err: function(err) {
                 console.log(err);
             }
         })
         $.ajax({
             url: '/admin/bonus/searchAll',
             type: 'POST',
             dataType: 'JSON',
             cache: false,
             success: function(data) {
                 if (data.bonusTypeNo.length > 0) {
                     var str = ``;
                     data.bonusTypeNo.forEach(function(val, index) {
                         var str = `<option value="${val}">${val}</option>`;
                         $('#bonusTypeNo').append(str);
                     })
                 } else {

                 }
             },
             err: function(err) {
                 console.log(err);
             }
         })
     }

     var bonusAdd = document.getElementById('bonusAdd');
     bonusAdd.onclick = function() {
         var bonus = document.getElementsByClassName('bonus');
         $.ajax({
             url: '/admin/bonusSend/add',
             type: 'post',
             data: {
                 employeeNo: bonus[0].value,
                 bonusDate: bonus[1].value,
                 bonusAmount: bonus[2].value,
                 bonusTypeNo: bonus[3].value
             },
             dataType: 'json',
             cache: false,
             success: function(data) {
                 if (data.code == 200) {
                     window.location.reload();
                 } else {
                     $('#Message').html(data.message);
                 }
             },
             err: function(err) {
                 console.log(err);
             }
         })
     }
     bounsList()

     function bounsList() {
         $.ajax({
             url: '/admin/bonusSend/searchAll',
             type: 'post',
             dataType: 'json',
             cache: false,
             success: function(data) {
                 if (data.code == 200 && data.bonus.length > 0) {
                     var str = `<form class="am-form am-g">
                    <table width="100%" class="am-table am-table-bordered am-table-radius am-table-striped">
                        <thead>
                            <tr class="am-success">
                                <th width="163px" class="table-set">员工编号</th>
                                <th class="table-id">奖金发放日期</th>
                                <th class="table-id">奖金金额</th>
                                <th class="table-id">奖金类型编号</th>
                                <th width="130px" class="table-set">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <hr />
                    <p class="Message"></p>
                </form>`;
                     $('.bonusSend').html(str);
                     data.bonus.forEach(function(value, idex) {
                         var html = "<tr>" +
                             "<td class='am-hide-sm-only'>" + value.employeeNo + "</td>" +
                             "<td>" + new Date(value.bonusDate).Format("yyyy-MM-dd") + "</td>" +
                             "<td>" + value.bonusAmount + "</td>" +
                             "<td>" + value.bonusTypeNo + "</td>" +
                             "<td>" +
                             '<div class="am-btn-toolbar">' +
                             '<div class="am-btn-group am-btn-group-xs">' +
                             '<span class="am-btn am-btn-default am-btn-xs am-text-danger am-round" title="删除">' + '<span class="am-icon-trash-o" onclick="bonusSeng_delete(' + "'" + value.employeeNo + "'," + "'" + new Date(value.bonusDate).Format("yyyy-MM-dd") + "'" + ')">' + '</span></span>' +
                             '</div>' +
                             '</div>' +
                             '</td>' +
                             "</tr>";
                         $('.bonusSend tbody').append(html);
                     })
                 } else {
                     $('.Message').html('暂无奖金信息');
                 }
             },
             err: function(err) {
                 console.log(err);
             }
         })
     }

     function bonusSeng_delete(employeeNo, bonusDate) {
         if (employeeNo && bonusDate) {
             $.ajax({
                 url: '/admin/bonusSend/delete',
                 type: 'delete',
                 data: {
                     employeeNo: employeeNo,
                     bonusDate: bonusDate
                 },
                 dataType: 'json',
                 cache: false,
                 success: function(data) {
                     if (data.code == 200) {
                         window.location.reload();
                     } else {
                         alert(data.message)
                     }
                 },
                 err: function(err) {
                     console.log(err)
                 }
             })
         } else {
             alert('出错')
         }
     }
 }

 if (pathname == '/deductType/management') {
     var deductTypeAdd = document.getElementById('deductTypeAdd');
     deductTypeAdd.onclick = function() {
         var deductDescription = document.getElementById('deductDescription').value;
         $.ajax({
             url: '/admin/deductType/add',
             type: 'post',
             data: {
                 deductDescription: deductDescription
             },
             dataType: 'json',
             cache: false,
             success: function(data) {
                 if (data.code == 200) {
                     window.location.reload();
                 } else {
                     $('#Message').html(data.message);
                 }
             },
             err: function(err) {
                 console.log(err)
             }
         })
     }
     deductTypeList();

     function deductTypeList() {
         $.ajax({
             url: '/admin/deductType/searchAll',
             type: 'post',
             dataType: 'json',
             cache: false,
             success: function(data) {
                 if (data.code == 200 && data.deductType.length > 0) {
                     var str = `<form class="am-form am-g">
                    <table width="100%" class="am-table am-table-bordered am-table-radius am-table-striped">
                        <thead>
                            <tr class="am-success">
                                <th width="163px" class="table-set">扣除工资编号</th>
                                <th class="table-id">扣除工资描述</th>
                                <th width="130px" class="table-set">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <hr />
                    <p class="Message"></p>
                </form>`;
                     $('.deductType').html(str);
                     data.deductType.forEach(function(value, index) {
                         var html = "<tr>" +
                             "<td class='am-hide-sm-only'>" + value.deductTypeNo + "</td>" +
                             "<td>" + value.deductDescription + "</td>" +
                             "<td>" +
                             '<div class="am-btn-toolbar">' +
                             '<div class="am-btn-group am-btn-group-xs">' +
                             '<span class="am-btn am-btn-default am-btn-xs am-text-danger am-round" title="删除">' + '<span class="am-icon-trash-o" onclick="deductType_delete(' + "'" + value.deductTypeNo + "'" + ')">' + '</span></span>' +
                             '</div>' +
                             '</div>' +
                             '</td>' +
                             "</tr>";
                         $('.deductType tbody').append(html);
                     })
                 } else {
                     $('.Message').html('暂无信息');
                 }
             },
             err: function(err) {
                 console.log(err)
             }
         })
     }

     function deductType_delete(deductTypeNo) {
         if (deductTypeNo) {
             $.ajax({
                 url: '/admin/deductType/delete',
                 type: 'delete',
                 data: {
                     deductTypeNo: deductTypeNo
                 },
                 dataType: 'json',
                 cache: false,
                 success: function(data) {
                     if (data.code == 200) {
                         window.location.reload();
                     } else {
                         alert(data.message)
                     }
                 },
                 err: function(err) {
                     console.log(err)
                 }
             })
         } else {
             alert('出错')
         }
     }
 }

 if (pathname == '/deduction/management') {
     getValue2();

     function getValue2() {
         $.ajax({
             url: '/admin/employee/search',
             type: 'POST',
             dataType: 'JSON',
             cache: false,
             success: function(data) {
                 if (data.employeeNO.length > 0) {
                     data.employeeNO.forEach(function(val, index) {
                         var str = `<option value="${val}">${val}</option>`;
                         $('#employeeNo').append(str);
                     })
                 } else {

                 }
             },
             err: function(err) {
                 console.log(err);
             }
         })
         $.ajax({
             url: '/admin/deductType/searchAll',
             type: 'POST',
             dataType: 'JSON',
             cache: false,
             success: function(data) {
                 if (data.deductTypeNo.length > 0) {
                     var str = ``;
                     data.deductTypeNo.forEach(function(val, index) {
                         var str = `<option value="${val}">${val}</option>`;
                         $('#deductTypeNo').append(str);
                     })
                 } else {

                 }
             },
             err: function(err) {
                 console.log(err);
             }
         })
     }
     var deductAdd = document.getElementById('deductAdd');
     deductAdd.onclick = function() {
         var deduction = document.getElementsByClassName('deduction');
         $.ajax({
             url: '/admin/deduction/add',
             type: 'post',
             data: {
                 employeeNo: deduction[0].value,
                 deductDate: deduction[1].value,
                 deductAmount: deduction[2].value,
                 deductTypeNo: deduction[3].value
             },
             dataType: 'json',
             cache: false,
             success: function(data) {
                 if (data.code == 200) {
                     window.location.reload();
                 } else {
                     $('#Message').html(data.message);
                 }
             },
             err: function(err) {
                 console.log(err);
             }
         })
     }

     deductList();

     function deductList() {
         $.ajax({
             url: '/admin/deduction/searchAll',
             type: 'post',
             dataType: 'json',
             cache: false,
             success: function(data) {
                 if (data.code == 200 && data.deduction.length > 0) {
                     var str = `<form class="am-form am-g">
                    <table width="100%" class="am-table am-table-bordered am-table-radius am-table-striped">
                        <thead>
                            <tr class="am-success">
                                <th width="163px" class="table-set">员工编号</th>
                                <th class="table-id">扣除工资时长</th>
                                <th class="table-id">扣除工资金额</th>
                                <th class="table-id">扣除类型编号</th>
                                <th width="130px" class="table-set">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <hr />
                    <p class="Message"></p>
                </form>`;
                     $('.deductType').html(str);
                     data.deduction.forEach(function(value, index) {
                         var html = "<tr>" +
                             "<td class='am-hide-sm-only'>" + value.employeeNo + "</td>" +
                             "<td>" + value.deductDate + "</td>" +
                             "<td>" + value.deductAmount + "</td>" +
                             "<td>" + value.deductTypeNo + "</td>" +
                             "<td>" +
                             '<div class="am-btn-toolbar">' +
                             '<div class="am-btn-group am-btn-group-xs">' +
                             '<span class="am-btn am-btn-default am-btn-xs am-text-danger am-round" title="删除">' + '<span class="am-icon-trash-o" onclick="deduction_delete(' + "'" + value.employeeNo + "'," + "'" + value.deductDate + "'" + ')">' + '</span></span>' +
                             '</div>' +
                             '</div>' +
                             '</td>' +
                             "</tr>";
                         $('.deductType tbody').append(html);
                     })
                 } else {
                     $('.Message').html('暂无信息');
                 }
             },
             err: function(err) {
                 console.log(err)
             }
         })
     }

     function deduction_delete(employeeNo, deductDate) {
         if (employeeNo, deductDate) {
             $.ajax({
                 url: '/admin/deduction/delete',
                 type: 'delete',
                 data: {
                     employeeNo: employeeNo,
                     deductDate: deductDate
                 },
                 dataType: 'json',
                 cache: false,
                 success: function(data) {
                     if (data.code == 200) {
                         window.location.reload();
                     } else {
                         alert(data.message)
                     }
                 },
                 err: function(err) {
                     console.log(err)
                 }
             })
         } else {
             alert('出错')
         }
     }

 }

 if (pathname == '/holiday/management') {
     getValue3();

     function getValue3() {
         $.ajax({
             url: '/admin/employee/search',
             type: 'POST',
             dataType: 'JSON',
             cache: false,
             success: function(data) {
                 if (data.employeeNO.length > 0) {
                     data.employeeNO.forEach(function(val, index) {
                         var str = `<option value="${val}">${val}</option>`;
                         $('#employeeNo').append(str);
                     })
                 } else {

                 }
             },
             err: function(err) {
                 console.log(err);
             }
         })
     }

     var holidayAdd = document.getElementById('holidayAdd');
     holidayAdd.onclick = function() {
         var holiday = document.getElementsByClassName('holiday');
         $.ajax({
             url: '/admin/holiday/add',
             type: 'POST',
             data: {
                 employeeNo: holiday[0].value,
                 startDate: holiday[1].value,
                 endDate: holiday[2].value,
             },
             dataType: 'JSON',
             cache: false,
             success: function(data) {
                 if (data.code == 200) {
                     window.location.reload();
                 } else {
                     $('#Message').html(data.message);
                 }
             },
             err: function(err) {
                 console.log(err);
             }
         })
     }
     holidayList()

     function holidayList() {
         $.ajax({
             url: '/admin/holiday/searchAll',
             type: 'POST',
             dataType: 'JSON',
             cache: false,
             success: function(data) {
                 if (data.holiday.length > 0) {
                     var str = `<form class="am-form am-g">
               <table width="100%" class="am-table am-table-bordered am-table-radius am-table-striped">
                   <thead>
                       <tr class="am-success">
                           <th width="163px" class="table-set">员工编号</th>
                           <th class="table-id">假期开始日期</th>
                           <th class="table-id">假期结束日期</th>
                           <th width="130px" class="table-set">操作</th>
                       </tr>
                   </thead>
                   <tbody>
                   </tbody>
               </table>
               <hr />
               <p class="Message"></p>
           </form>`;
                     $('.holidays').html(str);
                     data.holiday.forEach(function(value, index) {
                         var html = "<tr>" +
                             "<td class='am-hide-sm-only'>" + value.employeeNo + "</td>" +
                             "<td>" + new Date(value.startDate).Format("yyyy-MM-dd") + "</td>" +
                             "<td>" + new Date(value.endDate).Format("yyyy-MM-dd") + "</td>" +
                             "<td>" +
                             '<div class="am-btn-toolbar">' +
                             '<div class="am-btn-group am-btn-group-xs">' +
                             '<span class="am-btn am-btn-default am-btn-xs am-text-danger am-round" title="删除">' + '<span class="am-icon-trash-o" onclick="holiday_delete(' + "'" + value.employeeNo + "'" + ')">' + '</span></span>' +
                             '</div>' +
                             '</div>' +
                             '</td>' +
                             "</tr>";
                         $('.holidays tbody').append(html);
                     })
                 } else {
                     $('.Message').html('暂无信息');
                 }
             },
             err: function(err) {
                 console.log(err);
             }
         })
     }

     function holiday_delete(employeeNo) {
         if (employeeNo) {
             $.ajax({
                 url: '/admin/holiday/delete',
                 type: 'delete',
                 data: {
                     employeeNo: employeeNo
                 },
                 dataType: 'json',
                 cache: false,
                 success: function(data) {
                     if (data.code == 200) {
                         window.location.reload();
                     } else {
                         alert(data.message)
                     }
                 },
                 err: function(err) {
                     console.log(err)
                 }
             })
         } else {
             alert('出错')
         }
     }

     var holiday_search = document.getElementById('holiday_search');
     var employeeNo2;
     holiday_search.onclick = function() {
         employeeNo2 = document.getElementById('employeeNo2').value;
         $.ajax({
             url: '/admin/holiday/search',
             type: 'post',
             data: {
                 employeeNo: employeeNo2
             },
             dataType: 'json',
             cache: false,
             success: function(data) {
                 if (data.code == 200) {
                     var str = `<form class="am-form">
                    <div class="am-form-group am-cf">
                        <div class="zuo">假期开始日期</div>
                        <div class="you">
                            <input type="date" class="am-input-sm holiday3"  placeholder="假期开始日期" value="${new Date(data.holiday.startDate).Format("yyyy-MM-dd")}">
                        </div>
                    </div>
                    <div class="am-form-group am-cf">
                        <div class="zuo">假期结束日期</div>
                        <div class="you">
                            <input type="date" class="am-input-sm holiday3"  placeholder="假期结束日期" value="${new Date(data.holiday.endDate).Format("yyyy-MM-dd")}">
                        </div>
                    </div>
                    <div class="am-form-group am-cf">
                        <div class="you" style="margin-left: 11%;">
                            <span id="holiday3Add" class="am-btn am-btn-success am-radius">更新</span>
                            <span class="am-form-help" id="message" style="display:inline-block;"></span>
                        </div>
                    </div>`;
                     $('.holiday1').html(str);
                     update();

                 } else {
                     $('.holiday1').html(data.message);
                 }
             },
             err: function(err) {
                 console.log(err)
             }
         })
     }

     function update() {
         var holiday3Add = document.getElementById('holiday3Add');

         holiday3Add.onclick = function() {
             var holiday3 = document.getElementsByClassName('holiday3');
             $.ajax({
                 url: '/admin/holiday/update',
                 type: 'POST',
                 data: {
                     employeeNo: employeeNo2,
                     startDate: holiday3[0].value,
                     endDate: holiday3[1].value,
                 },
                 dataType: 'JSON',
                 cache: false,
                 success: function(data) {
                     if (data.code == 200) {
                         window.location.reload();
                     } else {
                         $('#message').html(data.message);
                     }
                 },
                 err: function(err) {
                     console.log(err);
                 }
             })
         }
     }
 }

 if (pathname == '/SickLeave/management') {
     getValue4();

     function getValue4() {
         $.ajax({
             url: '/admin/employee/search',
             type: 'POST',
             dataType: 'JSON',
             cache: false,
             success: function(data) {
                 if (data.employeeNO.length > 0) {
                     data.employeeNO.forEach(function(val, index) {
                         var str = `<option value="${val}">${val}</option>`;
                         $('#employeeNo').append(str);
                     })
                 } else {

                 }
             },
             err: function(err) {
                 console.log(err);
             }
         })
     }

     var SickLeaveAdd = document.getElementById('SickLeaveAdd');
     SickLeaveAdd.onclick = function() {
         var SickLeave = document.getElementsByClassName('SickLeave');
         $.ajax({
             url: '/admin/SickLeave/add',
             type: 'POST',
             data: {
                 employeeNo: SickLeave[0].value,
                 startDate: SickLeave[1].value,
                 endDate: SickLeave[2].value,
                 reason: SickLeave[3].value,
             },
             dataType: 'JSON',
             cache: false,
             success: function(data) {
                 if (data.code == 200) {
                     $('#Message').html(data.message);
                     setTimeout(() => {
                         window.location.reload();
                     }, 1000);
                 } else {
                     $('#Message').html(data.message);
                 }
             },
             err: function(err) {
                 console.log(err);
             }
         })
     }
     SickLeaveList()

     function SickLeaveList() {
         $.ajax({
             url: '/admin/SickLeave/searchAll',
             type: 'POST',
             dataType: 'JSON',
             cache: false,
             success: function(data) {
                 if (data.SickLeave.length > 0) {
                     var str = `<form class="am-form am-g">
              <table width="100%" class="am-table am-table-bordered am-table-radius am-table-striped">
                  <thead>
                      <tr class="am-success">
                          <th width="163px" class="table-set">员工编号</th>
                          <th class="table-id">假期开始日期</th>
                          <th class="table-id">假期结束日期</th>
                          <th class="table-id">病假理由</th>
                          <th width="130px" class="table-set">操作</th>
                      </tr>
                  </thead>
                  <tbody>
                  </tbody>
              </table>
              <hr />
              <p class="Message"></p>
          </form>`;
                     $('.SickLeaves').html(str);
                     data.SickLeave.forEach(function(value, index) {
                         var html = "<tr>" +
                             "<td class='am-hide-sm-only'>" + value.employeeNo + "</td>" +
                             "<td>" + new Date(value.startDate).Format("yyyy-MM-dd") + "</td>" +
                             "<td>" + new Date(value.endDate).Format("yyyy-MM-dd") + "</td>" +
                             "<td>" + value.reason + "</td>" +
                             "<td>" +
                             '<div class="am-btn-toolbar">' +
                             '<div class="am-btn-group am-btn-group-xs">' +
                             '<span class="am-btn am-btn-default am-btn-xs am-text-danger am-round" title="删除">' + '<span class="am-icon-trash-o" onclick="SickLeave_delete(' + "'" + value.employeeNo + "'," + "'" + new Date(value.startDate).Format("yyyy-MM-dd") + "'" + ')">' + '</span></span>' +
                             '</div>' +
                             '</div>' +
                             '</td>' +
                             "</tr>";
                         $('.SickLeaves tbody').append(html);
                     })
                 } else {
                     $('.Message').html('暂无信息');
                 }
             },
             err: function(err) {
                 console.log(err);
             }
         })
     }

     function SickLeave_delete(employeeNo, startDate) {
         if (employeeNo) {
             $.ajax({
                 url: '/admin/SickLeave/delete',
                 type: 'delete',
                 data: {
                     employeeNo: employeeNo,
                     startDate: startDate
                 },
                 dataType: 'json',
                 cache: false,
                 success: function(data) {
                     if (data.code == 200) {
                         window.location.reload();
                     } else {
                         alert(data.message)
                     }
                 },
                 err: function(err) {
                     console.log(err)
                 }
             })
         } else {
             alert('出错')
         }
     }
 }

 if (pathname == '/PayType/management') {
     var PayTypeAdd = document.getElementById('PayTypeAdd');
     PayTypeAdd.onclick = function() {
         var payTypeDescription = document.getElementById('payTypeDescription').value;
         $.ajax({
             url: '/admin/PayType/add',
             type: 'post',
             data: {
                 payTypeDescription: payTypeDescription
             },
             dataType: 'json',
             cache: false,
             success: function(data) {
                 if (data.code == 200) {
                     $('#Message').html(data.message);
                     setTimeout(() => {
                         window.location.reload();
                     }, 1000);
                 } else {
                     $('#Message').html(data.message);
                 }
             },
             err: function(err) {
                 console.log(err)
             }
         })
     }
     PayTypeList();

     function PayTypeList() {
         $.ajax({
             url: '/admin/PayType/searchAll',
             type: 'post',
             dataType: 'json',
             cache: false,
             success: function(data) {
                 if (data.code == 200 && data.PayType.length > 0) {
                     var str = `<form class="am-form am-g">
                   <table width="100%" class="am-table am-table-bordered am-table-radius am-table-striped">
                       <thead>
                           <tr class="am-success">
                               <th width="163px" class="table-set">支付类型编号</th>
                               <th class="table-id">支付类型描述</th>
                               <th width="130px" class="table-set">操作</th>
                           </tr>
                       </thead>
                       <tbody>
                       </tbody>
                   </table>
                   <hr />
                   <p class="Message"></p>
               </form>`;
                     $('.PayType').html(str);
                     data.PayType.forEach(function(value, index) {
                         var html = "<tr>" +
                             "<td class='am-hide-sm-only'>" + value.payTypeNo + "</td>" +
                             "<td>" + value.payTypeDescription + "</td>" +
                             "<td>" +
                             '<div class="am-btn-toolbar">' +
                             '<div class="am-btn-group am-btn-group-xs">' +
                             '<span class="am-btn am-btn-default am-btn-xs am-text-danger am-round" title="删除">' + '<span class="am-icon-trash-o" onclick="PayType_delete(' + "'" + value.payTypeNo + "'" + ')">' + '</span></span>' +
                             '</div>' +
                             '</div>' +
                             '</td>' +
                             "</tr>";
                         $('.PayType tbody').append(html);
                     })
                 } else {
                     $('.Message').html('暂无信息');
                 }
             },
             err: function(err) {
                 console.log(err)
             }
         })
     }

     function PayType_delete(payTypeNo) {
         if (payTypeNo) {
             $.ajax({
                 url: '/admin/PayType/delete',
                 type: 'delete',
                 data: {
                     payTypeNo: payTypeNo
                 },
                 dataType: 'json',
                 cache: false,
                 success: function(data) {
                     if (data.code == 200) {
                         window.location.reload();
                     } else {
                         alert(data.message)
                     }
                 },
                 err: function(err) {
                     console.log(err)
                 }
             })
         } else {
             alert('出错')
         }
     }
 }

 if (pathname == '/PayDetails/management') {
     getValue5();

     function getValue5() {
         $.ajax({
             url: '/admin/employee/search',
             type: 'POST',
             dataType: 'JSON',
             cache: false,
             success: function(data) {
                 if (data.employeeNO.length > 0) {
                     data.employeeNO.forEach(function(val, index) {
                         var str = `<option value="${val}">${val}</option>`;
                         $('#employeeNo').append(str);
                         if (index == 0) {
                             getMoney(val)
                         }
                     })
                 } else {

                 }
             },
             err: function(err) {
                 console.log(err);
             }
         })
         $.ajax({
             url: '/admin/PayType/searchAll',
             type: 'POST',
             dataType: 'JSON',
             cache: false,
             success: function(data) {
                 if (data.payTypeNo.length > 0) {
                     data.payTypeNo.forEach(function(val, index) {
                         var str = `<option value="${val}">${val}</option>`;
                         $('#payTypeNo').append(str);
                     })
                 } else {

                 }
             },
             err: function(err) {
                 console.log(err);
             }
         })
         $.ajax({
             url: '/admin/PayHistory/searchAll',
             type: 'POST',
             dataType: 'JSON',
             cache: false,
             success: function(data) {
                 if (data.PayHistory.length > 0) {
                     var str = `<form class="am-form am-g">
                    <table width="100%" class="am-table am-table-bordered am-table-radius am-table-striped">
                        <thead>
                            <tr class="am-success">
                                <th width="163px" class="table-set">支付编号</th>
                                <th class="table-id">员工编号</th>
                                <th class="table-id">工资发放日期</th>
                                <th class="table-id">核对编号</th>
                                <th class="table-id">支付金额</th>
                                <th width="130px" class="table-set">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <hr />
                    <p class="Message"></p>
                </form>`;
                     $('.PayDetails').html(str);
                     data.PayHistory.forEach(function(value, index) {
                         var html = "<tr>" +
                             "<td class='am-hide-sm-only'>" + value.payNo + "</td>" +
                             "<td>" + value.employeeNo + "</td>" +
                             "<td>" + new Date(value.paydate).Format("yyyy-MM-dd") + "</td>" +
                             "<td>" + value.checkNumber + "</td>" +
                             "<td>" + value.payAmount + "</td>" +
                             "<td>" +
                             '<div class="am-btn-toolbar">' +
                             '<div class="am-btn-group am-btn-group-xs">' +
                             '<span class="am-btn am-btn-default am-btn-xs am-text-danger am-round" title="删除">' + '<span class="am-icon-trash-o" onclick="PayType_delete(' + "'" + value.payTypeNo + "'" + ')">' + '</span></span>' +
                             '</div>' +
                             '</div>' +
                             '</td>' +
                             "</tr>";
                         $('.PayDetails tbody').append(html);
                     })
                 } else {
                     $('.PayDetails').html('暂无支付历史记录');
                 }
             },
             err: function(err) {
                 console.log(err);
             }
         })

     }

     function getMoney() {
         var employeeNo = document.getElementsByClassName('PayDetail')[0].value;
         $.ajax({
             url: '/admin/money/search',
             type: 'POST',
             data: {
                 employeeNO: employeeNo
             },
             dataType: 'JSON',
             cache: false,
             success: function(data) {
                 if (data.code == 200) {
                     $('#money').html(data.money);
                 } else {

                 }
             },
             err: function(err) {
                 console.log(err);
             }
         })
     }
     var PayDetailsAdd = document.getElementById('PayDetailsAdd');
     PayDetailsAdd.onclick = function() {
         var PayDetail = document.getElementsByClassName('PayDetail');
         $.ajax({
             url: '/admin/PayDetails/add',
             type: 'POST',
             data: {
                 employeeNo: PayDetail[0].value,
                 money: parseFloat(PayDetail[1].textContent),
                 startDate: PayDetail[2].value,
                 routingNumber: PayDetail[3].value,
                 accountType: PayDetail[4].value,
                 bankName: PayDetail[5].value,
                 bankAddress: PayDetail[6].value,
                 payTypeNo: PayDetail[7].value,
             },
             dataType: 'JSON',
             cache: false,
             success: function(data) {
                 if (data.code == 200) {
                     $('#Message').html(data.message);
                     setTimeout(() => {
                         window.location.reload();
                     }, 1000);
                 } else {
                     $('#Message').html(data.message);
                 }
             },
             err: function(err) {
                 console.log(err);
             }
         })
     }
 }
 if (pathname == '/index') {
     $.ajax({
         url: '/admin/employee/search',
         type: 'post',
         dataType: 'json',
         cache: false,
         success: function(data) {
             if (data.code == 200) {
                 $('.huiyuan').html(data.employeeNO.length);
             }
         },
         err: function(err) {
             console.log(err)
         }
     })

 }

 if (pathname == '/user/listOne') {
     getPage7();

     function getPage7() {
         var employeeNO = document.getElementById('EmployeeNO').textContent;
         $.ajax({
             url: '/admin/employee/employeeNo_search',
             type: 'post',
             data: {
                 employeeNO: employeeNO
             },
             cache: false,
             dataType: 'json',
             success: function(data) {
                 page = data.page;
                 if (data.code == 200) {
                     data.userInfo = [data.userInfo];
                     data.userInfo.forEach((value, index) => {
                         var html = "<tr>" +
                             "<td class='am-hide-sm-only'>" + value.EmployeeNO + "</td>" +
                             "<td>" + value.title + "</td>" +
                             "<td>" + value.fistName + value.middleName + value.lastName + "</td>" +
                             "<td>" + value.address + "</td>" +
                             "<td class='am-hide-sm-only'>" + value.workTelExt + "</td>" +
                             "<td class='am-hide-sm-only'>" + value.homeTelNo + "</td>" +
                             "<td class='am-hide-sm-only'>" + value.empEmailAddress + "</td>" +
                             "<td class='am-hide-sm-only'>" + value.socialSecurutyNumber + "</td>" +
                             "<td class='am-hide-sm-only'>" + new Date(value.DOB).Format("yyyy-MM-dd") + "</td>" +
                             "<td class='am-hide-sm-only'>" + value.position + "</td>" +
                             "<td class='am-hide-sm-only'>" + value.sex + "</td>" +
                             "<td class='am-hide-sm-only'>" + value.salary + "</td>" +
                             "<td class='am-hide-sm-only'>" + new Date(value.dateStarted).Format("yyyy-MM-dd") + "</td>" +
                             "</tr>";
                         $('tbody').append(html);
                     });
                     $('.Message').html(data.message);
                 } else {
                     $('.Message').html(data.message);
                 }
             },
             err: function(err) {
                 console.log(err)
             }
         })
     }

     var update_pw = document.getElementById('update_pw');
     update_pw.onclick = function() {
         var EmployeeNO = document.getElementById('EmployeeNO').textContent;
         var password = document.getElementById('password').value;
         $.ajax({
             url: '/admin/employee/password',
             type: 'post',
             data: {
                 password: password,
                 employeeNO: EmployeeNO
             },
             dataType: 'json',
             cache: false,
             success: function(data) {
                 if (data.code == 200) {
                     $('.Message').html(data.message);
                     setTimeout(function() {
                         window.location.reload()
                     }, 1000)
                 } else {
                     $('.Message').html(data.message);
                 }
             },
             err: function(err) {
                 console.log(err)
             }
         })
     }
 }

 if (pathname = '/user/pay') {
     var employeeNO = document.getElementById('EmployeeNO').textContent;
     $.ajax({
         url: '/admin/PayHistory/searchOne',
         type: 'POST',
         data: {
             employeeNo: employeeNO
         },
         dataType: 'JSON',
         cache: false,
         success: function(data) {
             if (data.PayHistory.length > 0) {
                 var str = `<form class="am-form am-g">
               <table width="100%" class="am-table am-table-bordered am-table-radius am-table-striped">
                   <thead>
                       <tr class="am-success">
                           <th width="163px" class="table-set">支付编号</th>
                           <th class="table-id">员工编号</th>
                           <th class="table-id">工资发放日期</th>
                           <th class="table-id">核对编号</th>
                           <th class="table-id">支付金额</th>
                       </tr>
                   </thead>
                   <tbody>
                   </tbody>
               </table>
               <hr />
               <p class="Message"></p>
           </form>`;
                 $('.PayDetails').html(str);
                 data.PayHistory.forEach(function(value, index) {
                     var html = "<tr>" +
                         "<td class='am-hide-sm-only'>" + value.payNo + "</td>" +
                         "<td>" + value.employeeNo + "</td>" +
                         "<td>" + new Date(value.paydate).Format("yyyy-MM-dd") + "</td>" +
                         "<td>" + value.checkNumber + "</td>" +
                         "<td>" + value.payAmount + "</td>" +
                         "</tr>";
                     $('.PayDetails tbody').append(html);
                 })
             } else {
                 $('.PayDetails').html('暂无历史记录');
             }
         },
         err: function(err) {
             console.log(err);
         }
     })

 }