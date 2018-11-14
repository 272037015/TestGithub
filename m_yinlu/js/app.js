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
    //公共底部悬浮 添加微信
    addWeChat: function() {
        var that = this,
            addBtn = $("#addWeChat"), //获取点击按钮
            showPopWeixin = $("#showPopWeixin") //弹窗-添加微信号
        addBtn.on("click", function() {
            that.unit.setPopup();
            showPopWeixin.show();
        })
        showPopWeixin.on("click", function(e) {
            if ($(e.target).closest("#showWeixinBox").length > 0) {
                $(this).show();
            } else {
                that.unit.unsetPopup();
                $(this).hide();
            }
        })
    },
    // 首页背景轮播
    isBg: function() {
        var Fpic = $("#indexBg li"); //获取li
        //图片轮播动画
        var FpicNum = Fpic.length; //获取li个数
        Fpic.eq(0).fadeIn(); //第一个显示
        var now = 0;//初始值
        //按照指定的周期
        setInterval(function() {
            if (now >= FpicNum - 1) {
                Fpic.eq(FpicNum - 1).stop().fadeOut(2000); //停止前面返回元素所有动画效果；添加一个新动画，淡出，耗时2000ms
                now = -1;
            }
            Fpic.eq(now).stop().fadeOut(2000); //隐藏
            now++;
            Fpic.eq(now).stop().fadeIn(2000); //显示
        }, 3000);


        $('#J_auto_height').height(window.innerHeight>568?window.innerHeight:568)
        // 禁止滚动（阻止苹果浏览器的默认行为）
        $('#J_auto_height').on("touchmove", function() {
            event.preventDefault();
        });
    },
    //客服咨询
    customerService: function() {
        var that = this,
            showTelForm = $("#showTelForm"), //获取点击事件(客服咨询)
            showPopCustomer = $("#showPopCustomer") //客服咨询弹窗
        showTelForm.on("click", function() {
            that.unit.setPopup();
            showPopCustomer.show()

        })
        showPopCustomer.on("click", function(e) {
            if ($(e.target).closest("#showFormBox").length > 0) {
                $(this).show();
            } else {
                that.unit.unsetPopup();
                $(this).hide();
            }
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

    },
    //大师名堂列表
    isMaster: function() {
        var moreBtn = $("#listMore"),
            theEnd = $("#theEnd")
        $("#listMaster li:gt(5)").addClass('hide');
        moreBtn.on("click", function() {
            $(this).hide();
            theEnd.show();
            $("#listMaster li").removeClass('hide');

        })
    },
    //详情页 展开详情按钮
    isTxt: function() {
        var masterProfile = $("#masterProfile"),
            detailBtn = $("#detailBtn")
        detailBtn.on("click", function() {
            $(this).hide();
            masterProfile.removeClass('di_txt').addClass('J_di_txt');
            masterProfile.css("height", "auto");
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