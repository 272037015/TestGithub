/*
**公共底部导航 -添加微信弹窗
*/

var addWeChat = document.getElementById("addWeChat"); //获取点击事件
var showPopWeixin = document.getElementById("showPopWeixin");//弹窗
var showWeixinBox = document.getElementById("showWeixinBox");//弹窗内的内容
addWeChat.onclick=function(){
    showPopWeixin.style.display = "block";  //弹窗显示   
}
//点击除按钮和input框区域外任意处弹窗隐藏
showPopWeixin.onclick = function(event) {
    //
    var e = event || window.event; //兼容ie和非ie的event
    var aim = e.srcElement || e.target; //兼容ie和非ie的事件源
    //
    if (e.srcElement) {
        var aim = e.srcElement;
        if (aim != showWeixinBtn && aim != showWeixinNum) {
            showPopWeixin.style.display = "none";
        }
    } else {
        var aim = e.target;
        if (aim != showWeixinBtn && aim != showWeixinNum) {
            showPopWeixin.style.display = "none";
        }
    }
}

/*
**点击客服咨询按钮-弹窗
*/

var showTelForm = document.getElementById('showTelForm');//获取点击客服咨询按钮事件
var showPopCustomer = document.getElementById('showPopCustomer');//弹窗表单
var showCustomerInput = document.getElementById('showCustomerInput');//获取input框
var showCustomerBtn = document.getElementById('showCustomerBtn');//获取提交询价按钮
var showCustomerBtn = document.getElementById('showCustomerBtn');//获取点击提交按钮
var loading = document.getElementById('loading');//loding
showTelForm.onclick=function(){
    showPopCustomer.style.display = "block";
}
//点击除按钮和input框区域外任意处弹窗隐藏
showPopCustomer.onclick = function(event) {
    //
    var e = event || window.event; //兼容ie和非ie的event
    var aim = e.srcElement || e.target; //兼容ie和非ie的事件源
    //
    if (e.srcElement) {
        var aim = e.srcElement;
        if (aim != showCustomerBtn && aim != showCustomerInput) {
            showPopCustomer.style.display = "none";
        }
    } else {
        var aim = e.target;
        if (aim != showCustomerBtn && aim != showCustomerInput) {
            showPopCustomer.style.display = "none";
        }
    }
}

showCustomerBtn.onclick=function(){
    if (false === validate()) {
        return false;
    }
    // loading
    loading.style.display = 'block';
    var obj={
        method:"GET",
        url:"http://wthrcdn.etouch.cn/weather_mini",
        data:"city=北京",
        successFun:function(d){
            console.log(d);
        },
        failFun:function(d){
            console.log(d);
        }
    };
    ajaxFun(obj);

}


//验证数据
function validate(type) {
    var phone = showCustomerInput.value; //手机号码
    var regPhone = /^1[3456789]{1}\d{9}$/; //手机正则
    //验证手机号
    if (phone === '') {
        alert('请输入手机号码')
        return false;
    } else if (!regPhone.test(phone)) {
        alert('手机号格式错误')
        return false;
    }
    return true;
}
//ajax.js
function ajaxFun(obj) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

    var upperMethod = obj.method.toUpperCase();

    if(upperMethod == "GET") {
        xhr.open("GET", obj.url + "?" + obj.data, true);
        xhr.send(null);
    } else if(upperMethod == "POST") {
        xhr.open("POST", obj.url, true);
        xhr.send(obj.data);
    } else {
        console.error("method error!");
        return;
    }
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            if(xhr.status == 200) {
                loading.style.display = 'none';
                obj.successFun(xhr.responseText);
            } else {
                obj.failFun('error');
            }
        }
    }
}

/*
**列表页-大师命堂
*/
var listMore = document.getElementById('listMore');//获取点击更多大师按钮
var aLi = document.getElementById("listMaster").getElementsByTagName("li");//获取li
var theEnd = document.getElementById('theEnd');//到底了哦
if(aLi.length>6){
    for (var i = 6; i < aLi.length; i++) {
        aLi[i].className="hide"
    }
}
listMore.onclick=function(){
    this.style.display="none";
    for (var i = 0; i < aLi.length; i++) {
        aLi[i].classList.remove("hide");
    } 
    theEnd.style.display='block'
}

/*
**详情页
*/

var masterProfile = document.getElementById('masterProfile');
var detailBtn = document.getElementById('detailBtn');
detailBtn.onclick=function(){
    this.style.display='none'
    masterProfile.style.height='auto'
    masterProfile.className='J_di_txt'
}









