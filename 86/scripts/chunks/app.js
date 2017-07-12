//nav事件注册
//公用app对象
var app = {};

//添加事件机制
//===============
var events = app.events = {};
app.on = function(name,callback){
	var list = events[name] || (events[name] = [])
  	list.push(callback)
  	return app;
}
app.off = function(name,callback){
	if( !(name||callback) ){
		events = app.events = {};
		return app;
	}
	var list = events[name]
	  if (list) {
	    	if (callback) {
	      		for (var i = list.length - 1; i >= 0; i--) {
	        		if (list[i] === callback) {
	          		list.splice(i, 1)
	        	}
	      	}
	    } else {
	      delete events[name]
	    }
	}
	return app;
}
app.emit = function(name, data) {
  var list = events[name];

  if (list) {
    // Copy callback lists to prevent modification
    list = list.slice()
    // Execute event callbacks, use index because it's the faster.
    for(var i = 0, len = list.length; i < len; i++) {
      list[i](data)
    }
  }
  return app
}

//默认注册头部事件
//===================
function initHead(){
	var $toggle = $('header .navtoggle');
	var $nav = $('nav');
	$toggle.on('click',function(e){
		//隐藏
		if( $toggle.hasClass('active') ){
			$toggle.removeClass('active');
			app.hideMask();
			$nav.slideUp('fast');
		//显示
		}else{
			$toggle.addClass('active');
			app.showMask();
			$nav.slideDown('fast');
		}
	});
	$('body').on('click','.g-mask',function(){
		$toggle.removeClass('active');
		app.hideMask();
		$nav.slideUp('fast');
	})
}
initHead();

//获取资源文件的加载情况
//由注册的回调函数获取
//=======================
function initImgStateChange(){

	var $imgs = $('img');

	var length = $imgs.length,
		current = 0;

	$imgs.one('load',function(){

		current = current+1;
		app.emit('imgstate', current/length*100);
	}).each(function(){

		if(this.complete) $(this).load();
	});
}
initImgStateChange();

//
//当页面中有loading进度条时
//调用此函数可以设置进度条进度
app.setProgress = function( number ){
	var $loading = $('.p-loading');
	if($loading.length <= 0){ return false };
	number = Math.floor(number);
	$loading.find('.con-ico').css({'left':number-40+'%'})
	$loading.find('.con-top').css({'width':number+'%'})
	$loading.find('.con-number').text(number+'%')
}

const $body = $('body');
const maskhtml = '<div class="g-mask"></div>';

//显示全局遮罩
app.showMask = function(){
	var $mask = $(maskhtml);
	$body.append($mask);
}
//隐藏全局遮罩
app.hideMask = function(){
	var $mask = $('.g-mask');
	if($mask.length>0) $mask.remove();
}

export default app;
