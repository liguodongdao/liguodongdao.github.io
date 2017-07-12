import app from './app';
import Slider from './slider';

console.log('this is pagepower');
var $power = $('.p-power');

//计数逻辑开始
function sCount($ele,number){
	
	var currentNumber = 0;
	function setCount(){
		if(currentNumber > number){ return };
		$ele.text(currentNumber);
		currentNumber = currentNumber + 1;
		setTimeout(setCount,160);
	}
	setCount();
}
function startCount(){
	sCount($power.find('.na'),4);
	sCount($power.find('.nb'),2);
	sCount($power.find('.nc'),4);
	sCount($power.find('.nd'),0);

	sCount($power.find('.ne'),2);
	sCount($power.find('.nf'),5);
	sCount($power.find('.ng'),7);
	sCount($power.find('.nh'),0);

	sCount($power.find('.ni'),0);
	sCount($power.find('.nj'),1);
	sCount($power.find('.nk'),8);
}

//页面初始化
function pageInit(){
	//事件注册
	$power.find('.pagea-detail').on('tap',function(e){
		$power.find('.power-data').show();
	});
	$power.find('.power-ani').on('touchstart touchmove touchend',function(e){
		e.stopPropagation();
	});
	/*
	$power.find('.pagec-container').on('touchstart touchmove touchend',function(e){
		e.stopPropagation();
	});
	*/

	//起始时的动画
	$power.find('.ani-a').addClass('active');
	$power.find('.ani-c').addClass('active');
	setTimeout(function(){
		$power.find('.ani-b').addClass('active');
		setTimeout(function(){
			$power.find('.power-ani').fadeOut('fast');
			setTimeout(function(){
				$power.find('.container-a').fadeIn('fast');
				setTimeout(function(){
					$power.find('.container-b').fadeIn('fast');
					setTimeout(function(){
						$power.find('.container-c').fadeIn('fast');
					},700)
				},700)
			},700);
		},3000);
	},1200);

	//主页面滑动效果
	var slider = new Slider($power,{'itemSelector':'.power-wrapper>div','onMoveEnd':function(index){
		console.log('power'+index);
	}});
	
	//子页面滑动效果
	var $powerinfo = $power.find('.pagec-container');
	var $powerwrapper = $powerinfo.find('.pagec-wrapper');
	var $items = $powerinfo.find('.pagec-wrapper>section');
	
	$items.height( $powerinfo.height() );
	$items.width( $powerinfo.width() );

	$powerwrapper.css('width', $items.length * $powerinfo.width() );
	$powerwrapper.css('height', $powerinfo.height() );

	var currentIndex = 0;
	var isAnimate = false;
	function animate( callback ){
		
		var endPos = -$powerinfo.width()*currentIndex; 

		var an = {};
		an['translateX']= endPos + 'px';
		an['translateZ']= '0px';

		isAnimate = true;
		$powerwrapper.animate(an,'fast',function(){
			$powerinfo.find('.pagec-circle span').eq(currentIndex).addClass('active').siblings().removeClass('active');
			callback && callback();
		});
	}

	$powerinfo.find('.tap-left').on('tap',function(){
		if( isAnimate ) return false;

		if(currentIndex <= 0){
			currentIndex = $items.length-1;
		}else{
			currentIndex = currentIndex-1;
		}
		animate(function(){ isAnimate = false });
	});
	$powerinfo.find('.tap-right').on('tap',function(){
		if( isAnimate ) return false;

		if( currentIndex >= $items.length-1 ){
			currentIndex = 0;
		}else{
			currentIndex = currentIndex + 1;
		}
		animate(function(){ isAnimate = false });
	});

	/*
	var childSlider = new Slider($powerinfo,{'itemSelector':'.pagec-wrapper>section','onMoveEnd':function(index){
		$powerinfo.find('.pagec-circle span').eq(index).addClass('active').siblings().removeClass('active');
	},'direction':'h'});*/
}
pageInit();
