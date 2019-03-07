$(function(){
	$("#navList a").on("click",function(){
		$(this).addClass("current").siblings().removeClass("current");
	})
})