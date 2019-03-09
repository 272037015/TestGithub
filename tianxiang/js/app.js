var app = {
    // 公共单元模块
    unit:{
        // 默认浏览器scrollTop
        sTop: 0,
        //loading当前对象
        loadObj:'',
        //msg当前对象
        msgObj:'',
        //alert当前对象
        alertObj:'',
        //timer定时器
        timer:'',
        // 设置弹窗底层定位
        setPopup:function(){
            this.sTop = $(document).scrollTop();
            $("body").addClass('base_popup');
            $('body').css('top', -this.sTop);
        },
        // 撤销设置弹窗底层定位
        unsetPopup:function(){
            $("body").removeClass('base_popup');
            $(document).scrollTop(this.sTop);
        },
        //loading
        showLoad:function(){
            this.loadObj=$('<div class="m_fixed_loading"></div>');
            this.loadObj.appendTo('body');
            this.setPopup();
        },
        closeLoad:function(){
            this.loadObj.remove();
            this.unsetPopup();
        },
        //弹窗msg,默认2秒消失
        msg:function(title){
            this.msgObj && this.msgObj.remove();
            this.msgObj=$('<div class="m_fixed_wrap J_fixedWrap"><div class="m_fixed_msg">'+title+'<div class="m_fixed_btn J_closeBtn">确定</div>'+'</div></div>');
            this.msgObj.appendTo('body');
            app.unit.setPopup();
            $(".J_closeBtn").on("click",function(){ //获取关闭弹窗事件
                $(".J_fixedWrap").hide(); //弹窗隐藏
                app.unit.unsetPopup();
            })
        }
    },
    isNav: function() {
    	$("#navList a").on("click", function() {
	        $(this).addClass("current").siblings().removeClass("current");
	    })

    },

    // 推荐老师异步加载
	teacherListAjax:function(){
		var aList=$('#teacherList');
		var aLoading=$('#listLoading');
		var winH=$(window).height();
		var html='<a href="" class="ib_list"><div class="ib_list_hd"><div class="ib_list_pic"><img src="http://img.d1xz.net/d/2019/03/5c7f840787790.png" alt="" /></div><div class="ib_list_info"><p class="ib_li_words">朱志毅</p><div class="ib_li_tags"><span>八字</span><span>八字</span><span>八字</span></div><div class="ib_li_txt">职业：造园师、室内设计师、清风国学社创始人、命理师风水师、易学</div></div><div class="ib_list_price"><p class="money">188.00</p><p class="gray">￥388</p></div></div><div class="ib_list_bd"><div class="da">解答15425</div><div class="zan">评价5896</div><div class="fans">粉丝5478</div></div></a>';
		var intHtml='';
		for(var i=0;i<=4;i++){
			intHtml+=html;
		}
		aList.append(intHtml);
		
		$(window).scroll(function() {
		    if ($(document).scrollTop() >= $(document).height() - winH) {
		    	aLoading.css('display','inline-block');
		        setTimeout(function(){
		        	$('#teacherList').append(intHtml);
		        	aLoading.css('display','none');
		        },2000)
		    }	
		})
	},
    showServer: function() {
        //详情页 立即预约
        var popShowBtn = $("#popShowBtn"); //立即预约按钮
        var popAppointment = $("#popAppointment"); //弹窗
        var popSeverClose = $("#popSeverClose");//关闭
        var popServerLi = $("#popItemServer li"); //请选择您需要的服务 列表

        popShowBtn.on('click', function(event) {
            if (popAppointment.is(':hidden')) {
                popAppointment.show();
            } else {
                popAppointment.hide();
            }
        });
        popSeverClose.on("click",function(){
        	popAppointment.hide();
        })
        popServerLi.on("click", function() {
            $(this).addClass("current").siblings().removeClass("current")
        })
    },
    //支付方式
    choosePay:function() {
        var choosePay = $("#choosePay a");
        choosePay.on("click",function(){
            $(this).addClass("current").siblings().removeClass("current");
        })
    },
    //表单
    isForm:function() {
        var userName = $("#userName");//用户姓名
        var userIphone = $("#userIphone");//手机号
        var userSex = $("#userSex");//性别
        var confirmBtn = $("#confirmBtn");//确认提交按钮
        confirmBtn.on("click",function(){
            var input1 = $("#userName input");
            var input2 = $("#userIphone input");
        if(!input.length) return;
        //禁止手机端点击input框跳出输入法
        input1.focus(function(){
            this.blur();
        });
        input2.focus(function(){
            this.blur();
        });
            if (!userName.val()) {
                userIphone.focus();
                return app.unit.msg('姓名不能为空');
            }else if (!/^[\u4e00-\u9fa5]+$/.test(userName.val())) {
                userIphone.focus();
                return app.unit.msg('请填写汉字');
            }else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(userIphone.val())) {
                userIphone.focus();
                return app.unit.msg('请输入正确的手机号');
            }
        })
        //性别选择
        if(!userSex.length) return;
        userSex.children('span').on('click', function () {
            $(this).addClass('current').siblings('span').removeClass('current');
            $(this).parent().find('input').val($(this).data('value'));
        });
        //日期插件
        var input = $(".J_datepicker");
        if(!input.length) return;
        //禁止手机端点击input框跳出输入法
        input.focus(function(){
            this.blur();
        });
        for(var i=0,max=input.length;i<max;i++){
            var calendar = new ruiDatepicker().init('#'+$('.J_datepicker').eq(i).attr('id'));
        }
    },
    //登录 弹窗
    popLogin:function() {
        $(".J_popLogin").on("click",function(){
            $(".J_showBindPop").show();
        })
        $(".J_popLoginClose").on("click",function(){
            $(".J_showBindPop").hide();
        })
    }
}

$(function() {
    //遍历执行app中的方法
    for (var key in app) {
        typeof app[key] == 'function' && app[key]();
    };
})