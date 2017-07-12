import app from './app';

//pageinterior init
$(document).on('touchmove',function(e){
	e.preventDefault();
	return false;
});

const pageinfo = {
	'1':'4.2英寸多功能信息显示屏<br>行车参数一目了然',
	'2':'直径362mm方向盘，更灵活更运动<br>双区域独立控制自动空调系统',
	'3':'智能钥匙、一键启动<br>高端舒适驾驭',
	'4':'高科技面料座椅<br>严丝合缝的包裹体验',
	'5':'空间和性能的<br>完美平衡',
}

function interiorInit(){

	var $interior = $('.p-interior');
	const $interiornext = $interior.find('.interior-next');

	$interior.find('.interior-slide').fadeIn('normal');
	setTimeout(function(){
		$interior.find('.interior-slide').fadeOut('fast');
		$interiornext.fadeIn('fast');
	},3860);

	var width = $interior.width();

	//当前画面状态
	var currentState = 0;
	//
	var beginState;

	var beginPos,
		nowPos;

	function changeState( callback ){
		var length = beginPos - nowPos;
		var d; //
		if(length >=0){
			d = Math.floor( length/width/0.19 );
		}else{
			d = Math.floor( length/width/0.19 ) + 1;
		}
		if(d==0) return;
		currentState = beginState + d;

		if( currentState > 4 ){
			currentState = 4;
		}else if( currentState < 0 ){
			currentState = 0;
		}
		var stylestate = currentState + 1;
		$interior.find('.interior-m'+stylestate).addClass('active').siblings().removeClass('active');

		callback && callback( stylestate );
	}

	$interior.on('touchstart',function(e){
		var touch = e.touches[0];
		beginState = currentState;
		beginPos = touch.clientX;
	});

	var oldstate = 0;
	var $text = $interior.find('.interior-text p');

	$text.html(pageinfo['1']).fadeIn(800);
	
	$interior.on('touchmove',function(e){
		var touch = e.touches[0];
		nowPos = touch.clientX;
		changeState(function( index ){
			if(index == oldstate ) return;
			$text.html( pageinfo[index] ).fadeIn(800);
			oldstate = index;
		});
	});
};
interiorInit();
