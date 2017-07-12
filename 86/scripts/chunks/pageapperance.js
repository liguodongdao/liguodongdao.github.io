import app from './app';



$(document).on('touchmove',function(e){
    e.preventDefault();
    return false;
});

//pageapperance init
function apperanceInit(){

	var $apperance = $('.p-appearance');  //外观页面

	//初始时提示tip的动画效果
	$apperance.find('.appearance-slide').fadeIn('normal');
	setTimeout(function(){
		$apperance.find('.appearance-slide').fadeOut('fast');
	},3860);



	var width = $apperance.width();

	//白车0 或 红车1
	var currentType = 1;
	//正面0 大灯亮1 背面2
	var currentState = 0;
	

	//滑动开始时的状态
	var beginState;      
	var beginPos,    //起始横坐标
		nowPos;      //滑动结束时的横坐标

	//改变汽车方位刷新函数
	//
	function changeState(){
		var length = beginPos - nowPos;
		length = length || 0;
		var d; //滑动临界节点
		if(length >=0){
			d = Math.floor( length/width/0.3 );
		}else{
			d = Math.floor( length/width/0.3 ) + 1;
		}
		if( d==0 ) return;		
		currentState = beginState + d;

		/*
		if( currentState > 2){
			currentState=2
		}else if(currentState < 0){
			currentState=0
		};
		*/
		// 三段圆形循环
		if( currentState >= 0 ){
			currentState = currentState % 3;
		}else{
			currentState = ( currentState % 3 + 3 ) % 3; 
		}
		refreshCar();
	}

	//
	//整体刷新函数
	function refreshCar(){
		var stylestate = currentState + 1;
		if( currentType == 0 ){
			$apperance.find('.show-w'+stylestate).addClass('active').siblings().removeClass('active');
		}else if( currentType == 1 ){
			$apperance.find('.show-r'+stylestate).addClass('active').siblings().removeClass('active');
		}
		$apperance.find('.text'+stylestate).addClass('active').siblings().removeClass('active');
	}

	$apperance.on('touchstart',function(e){
		var touch = e.touches[0];
		beginState = currentState;
		beginPos = touch.clientX;
	});
	$apperance.on('touchmove',function(e){
		var touch = e.touches[0];
		nowPos = touch.clientX;
		changeState();
	});

	$apperance.find('.car-toggle span').on('tap',function(e){

		var data = $(e.currentTarget).attr('data-color');
		currentType = data;
		refreshCar();
	})

}
apperanceInit();
