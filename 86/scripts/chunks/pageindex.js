import app from './app';
import Slider  from './slider';   //滑框组件

//
var isLoad = false;
var isCountEnd = false;


var n = 0;
function count( callback ){

	setTimeout(function(){
		n = n + 1;
		app.setProgress(n);

		if( n >= 89 ){
			isCountEnd = true;
			callback && callback();
		}else{
			count( callback );
		}
	},10)
};
//开始设置进度
count(function(){

	console.log('callback is do');
	console.log(isLoad);
	if(isLoad){
		app.setProgress(100);
		$('.p-loading').hide();
		indexaInit();
	}
});


//动画加载详情
/*
app.on('imgstate',function(data){

	if( data <= 60 ){
		return false;
	}else if( data < 100 ){

	}
	app.setProgress(data);
	
	if(data == 100){
		$('.p-loading').hide();
		indexaInit();
	}
});
*/
$(document).on('ready',function(){

	//console.log('document is ready but imagedata is not ready');
})
window.onload = function(){
	console.log('the web is inited everything is ready');
	isLoad = true;
	if(isCountEnd){
		app.setProgress(100);
		$('.p-loading').hide();
		indexaInit();
	}
}


//页面a初始化
function indexaInit(){
	
	var $indexa = $('.p-indexa'); 
	var $indexmusic = $('#indexmusic');

	$indexa.show();

	setTimeout(function(){
		$indexa.find('.car2').addClass('active');
		setTimeout(function(){
			$indexa.find('.carlight').addClass('active');
		},1200);
	},1200);

	$indexmusic[0].play();

	$indexa.find('.indexa-ico').on('tap',function(){
		console.log('tap click');
		$indexa.hide();
		indexbInit();
	});
}
//indexaInit();

//页面b初始化
function indexbInit(){

	var $indexb = $('.p-indexb');
	$indexb.show();
	//阻止事件冒泡
	$('.indeb-wrapper .man').on('touchstart touchmove touchend',function(e){
		e.stopPropagation()
		return false;
	})
	$('.indeb-wrapper .text').on('touchstart touchmove touchend',function(e){
		e.stopPropagation()
		return false;
	});

	var slider = new Slider( $indexb,{'itemSelector':'.indeb-wrapper>div','onMoveEnd':function(index){
		console.log('slider:'+index);
	}});



	$indexb.find('.man-bg').addClass('active');
	$indexb.find('.text').addClass('active');
	setTimeout(function(){
		$indexb.find('.man-front').addClass('active');
		setTimeout(function(){
			$indexb.find('.man').fadeOut('fast');
			$indexb.find('.text').fadeOut('fast');
			setTimeout(function(){
				$('.a-text').addClass('active');
			},1000)
		},3000)
	},1200);
}

