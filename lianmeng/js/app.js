var app = {
    // 公共单元模块
    unit: {
        //msg当前对象
        msgObj: '',
        //loading当前对象
        loadObj: '',
        //timer定时器
        timer: '',
        // 撤销设置弹窗底层定位
        unsetPopup: function() {
            $("body").removeClass('base_popup');
            $(document).scrollTop(this.sTop);
        },
        // 设置弹窗底层定位
        setPopup: function() {
            this.sTop = $(document).scrollTop();
            $("body").addClass('base_popup');
            $('body').css('top', -this.sTop);
        },
        //loading
        showLoad: function() {
            this.loadObj = $('<div class="m_fixed_loading"></div>');
            this.loadObj.appendTo('body');
            this.setPopup();
        },
        closeLoad: function() {
            this.loadObj.remove();
            this.unsetPopup();
        },
        //弹窗msg,默认2秒消失
        msg: function(title) {
            var that = this;
            //防止错误提示层叠
            if (this.msgObj) {
                this.msgObj.remove();
                clearTimeout(this.timer);
            }
            this.msgObj && this.msgObj.remove();
            this.msgObj = $('<div class="m_fixed_alert">' + title + '</div>');
            this.msgObj.appendTo('body').addClass('fixed_alert_show');
            this.timer = setTimeout(function() {
                that.msgObj && that.msgObj.remove();
            }, 2500);
        }
    },
    //首页-圆圈百分比
    isCircle:function() {
        var num = $("#circle").text() * 3.6;
        if (num <= 180) {
            $('.J_circleLeft').css('transform', "rotate(0deg)");
            $(".J_circleRight").css('transform', "rotate(" + num + "deg)");
        }else{
            $('.J_circleLeft').css('transform', "rotate(180deg)");
            $(".J_circleRight").css('transform', "rotate(" + (num - 180) + "deg)");
        }
    },
    // 首页-热门产品
    hotProducts:function() {
        var oli = $("#hotProducts .hp_r_highest");
        oli.mouseover(function(){
            $(this).siblings().removeClass("J_currentProduct"); 
            $(this).addClass("J_currentProduct"); 
            
        
        })
    },
    
   
    //验证表单
    isForm: function() {
        var that = this,
            showCustomerBtn = $("#showCustomerBtn") //提交按钮
        showCustomerBtn.on("click", function() {
            if (false === validate()) {
                return false;
            }
            // 显示加载框，请求确认数据
            that.unit.showLoad();
            var btn = $(this),
                btnVal = btn.val(),
                popForm = $("#popForm") //表单
            $.ajax({
                beforeSend: function() {
                    // 禁用按钮防止重复提交，发送前响应
                    btn.attr({ disabled: "disabled" });
                    btn.val(btnVal + '中...');
                },
                url: popForm.attr('action'),
                data: popForm.serialize(),
                type: 'post',
                dataType: 'json',
                success: function(res) {
                    that.unit.closeLoad();
                    if (res.code == '1') {
                        //阻止调整动画卡壳
                        setTimeout(function() {
                            var reurl = window.location.href;
                            if (reurl.match('[\?]')) {
                                reurl = reurl + '&';
                            } else {
                                reurl = reurl + '?';
                            }
                            window.location.href = reurl + 't=' + new Date().getTime();
                        }, 500);
                    } else {
                        btn.removeAttr('disabled');
                        btn.val(btnVal);
                        that.unit.msg(res.msg)
                    }
                }
            });

        })

    }
    
    
};
$(function() {
    //遍历执行app中的方法
    for (var key in app) {
        typeof app[key] == 'function' && app[key]();
    }
});

//验证手机号码
function validate(type) {
    var phone = $('#showCustomerInput').val(); //手机号码
    var regPhone = /^1[3456789]{1}\d{9}$/; //手机正则
    //验证手机号
    if (phone === '') {
        app.unit.msg('请输入手机号码')
        return false;
    } else if (!regPhone.test(phone)) {
        app.unit.msg('手机号格式错误')
        return false;
    }
    return true;
}