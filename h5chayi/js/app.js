var app = {
    // 登录
    sign: function() {
        $('#showPopupPhone').on('click', function() {
            $('body').addClass('base_popup');//body加类，阻止浏览器底层滚动
            $('#popSign').show(); //登录弹窗显示
        });
        $('#popCancel').on('click', function() { //点击取消
            $('#popSign').hide(); //登录弹窗隐藏
        });
        $('#popSubmit').on('click', function() {
            var phone = $('#phone').val(); //手机号码
            var regPhone = /^1(3|4|5|7|8)\d{9}$/; //手机正则
            var getCode = $('#getCode').val(); //验证码

            if (phone == '') {
                alert('请输入手机号码')
            } else if (!regPhone.test(phone)) {
                alert('手机号格式错误')
            } else if (getCode == '') {
                alert('请输入验证码')
            }
        });
        // 获取验证码
        $('#getting').on('click', function() {
            var btn = $(this);
            var count = 60;
            var resend = setInterval(function() {
                count--;
                if (count > 0) {
                    btn.val(count + "s后可重新获取");
                    btn.attr('disabled', 'disabled'); //禁止点击
                } else {
                    clearInterval(resend); //清除定时器
                    btn.val("获取验证码").removeAttr('disabled'); //移除属性，可点击
                }
            }, 1000);
        });

    },
    // 首页banner  视频
    bannerVideo: function() {
        //视频播放
        $('#posterImg').on('click', function() { //点击封面
            $("#videoId").get(0).play(); //视频播放
            $(this).hide(); //封面隐藏
        });
        $('.popPosterImg').on('click', function() { //点击封面
            $("#popVideoId").get(0).play(); //视频播放
            $(this).hide(); //封面隐藏
        });
    },
    popVideo: function() {
        //点击试看按钮 弹窗
        $('#showPopVideo').on('click', function() { //点击试看按钮
            $("#videoId").get(0).pause(); //首页视频暂停
            $('#popVideo').show(); //弹窗显示
            $('#wrap').hide(); //外层隐藏
        });
        $('#popClose').on('click', function() {
            $("#popVideoId").get(0).pause(); //首页视频暂停
            $('#popVideo').hide(); //弹窗隐藏
            $('#wrap').show(); //外层显示
        });
    },
    // 荣誉证书  弹窗
    zhegnshu: function() {
        var imgs = [
            'http://img.d1xz.net/d/2018/06/5b1b810eaf83e.jpg',
            'http://img.d1xz.net/d/2018/06/5b1b810ec8821.jpg',
            'http://img.d1xz.net/d/2018/06/5b1b810ee4099.jpg',
            'http://img.d1xz.net/d/2018/06/5b1b810f0839e.jpg',
            'http://img.d1xz.net/d/2018/06/5b1b810f227ac.jpg',
            'http://img.d1xz.net/d/2018/06/5b1b810f3a615.jpg',
            'http://img.d1xz.net/d/2018/06/5b1b810f4d694.jpg'
        ];
        var popWrapper = $('.J_popWrapper'); //弹窗外层
        var picImg = $('.J_popWrapper .J_pic'); //图片
        var pObj = $('#honorList p');

        pObj.each(function(index) { //获取下标
            $(this).click(function() {
                popWrapper.show(); //弹窗外层显示
                $(this).next().attr('src', imgs[index]); //显示对应的图片
            })
        });
        popWrapper.on('click', function() {
            $(this).hide()
        });

    },
    // 选项卡
    tabContent: function() {
        //点击li事件
        $("#tabList li").on('click', function() {
            //添加当前状态current，它的同辈元素(siblings)移除当前状态current
            $(this).addClass('current').siblings('li').removeClass('current');
            var z = $(this).index(); //索引
            //遍历找到对应的内容显示，同辈元素隐藏
            $("#tabContent .J_tcBox").eq(z).show().siblings('#tabContent .J_tcBox').hide();
        });
    },
    // 客服
    fixedServer:function(){
        $('.m_service_hide').on('click',function(){
            $(this).hide()
            if ($(".m_service_wx").is(":hidden")) {
                $(".m_service_wx").show();
            } else {
                $(".m_service_wx").hide();
            }
            event.stopPropagation();
        });
        $('body').click(function() {
            if (!$(".m_service_wx").is(":hidden")) {
                $(".m_service_wx").hide();
                $('.m_service_hide').show()
            }
        });
        
    }
}
$(function() {
    //遍历执行app中的方法
    for (var key in app) {
        typeof app[key] == 'function' && app[key]();
    }
})