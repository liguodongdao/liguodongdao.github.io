import app from './app';
import Slider  from './slider';   //滑框组件

console.log('hello this is page history');

function pageInit(){

	var $history = $('.p-history');

	var slider = new Slider( $history,{'itemSelector':'.history-wrapper>div','onMoveEnd':function(index){
		console.log('slider:'+index);

		if(index == 2){

			$history.find('.c-a').addClass('active');
			setTimeout(function(){
				$history.find('.c-b').addClass('active');
			},1000);
			setTimeout(function(){
				$history.find('.c-c').addClass('active');
			},2000);
			setTimeout(function(){
				$history.find('.c-d').addClass('active');
			},3000);
			setTimeout(function(){
				$history.find('.c-e').addClass('active');
			},4000);
		}
	}});
	/*
	$history.find('#nextturn').on('tap',function(){
		location.href="./power.html";
	});
	*/

	var toyotaVideo = $('#toyotavideo');
	var videoMask = $('.history-b .content-mask');
	$('.video-icon').on('tap',function(){
		videoMask.hide();
		toyotaVideo[0].play();
	});
}
pageInit();
