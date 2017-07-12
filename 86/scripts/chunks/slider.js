//===================
// slide 滑动组件
// 依赖Zepto
//===================

//防止页面bounce效果
$(document).on('touchmove',function(e){
    e.preventDefault();
    return false;
});

//设置默认参数
const defaultOptions = {
	direction: 'v',     		//'h'横向,'v'纵向
	slidePercent: 0.3,  		//拖动超过多少百分比后才翻页
	itemSelector:'section', 	//子元素选择器
	onMoveEnd: function(index){ //滑动结束后的事件回调

	}
}

/**
 *
 * Slider类
 */
class Slider {

	constructor(element,options){
		var me = this;
		
		this.element = element;
		this.options = $.extend({},defaultOptions,options);

		//超出隐藏
		this.element.css('overflow','hidden');
		this.wrapper = this.element.find('[data-swiper]').eq(0);
		this.items = this.element.find(this.options.itemSelector);


		this.element.on('touchstart',function(e){me._touchStart(e)});
		this.element.on('touchmove', function(e){me._touchMove(e) });
		this.element.on('touchend',  function(e){me._touchEnd(e)  });
		console.log('this is Slider constructor');

		this.sliderWidth  = this.element.width();
		this.sliderHeight = this.element.height();


		this.items.height(this.sliderHeight);
		this.items.width(this.sliderWidth);

		if( this.options.direction == 'h' ){
			this.wrapper.css('width',this.items.length*this.sliderWidth);
			this.wrapper.css('height',this.sliderHeight);
		}



		this.curIndex = 0;  		//当前item index
		this.isAnimate = false;     //是否在动画中标志位

		this.isDirectionV = (this.options.direction == 'v');  //是纵向还是横向

		this.beginPos = null;      //起始坐标
		this.currentPos = null;    //当前坐标

	}

	//计算滑动距离
	_moveItem( distance ){
		
		var pos;
		if( this.isDirectionV ){
			pos = -this.sliderHeight*this.curIndex + distance;

			//做边界值确认 滑动顶部或尾部的时候做限定
			var maxpos = this.options.slidePercent*this.sliderHeight;
			var minpos = -(this.options.slidePercent+this.items.length-1)*this.sliderHeight;

			if(pos > maxpos){ pos = maxpos }
			else if( pos < minpos ){ pos = minpos }
			this.wrapper.css({'transform':'translateY('+pos+'px) translateZ(0px)'});
		}else{
			pos = -this.sliderWidth*this.curIndex + distance;
			var maxpos = this.options.slidePercent*this.sliderWidth;
			var minpos = -(this.options.slidePercent+this.items.length-1)*this.sliderWidth;
			
			if(pos > maxpos){ pos = maxpos }
			else if(pos < minpos){ pos = minpos }
			this.wrapper.css({'transform':'translateX('+pos+'px) translateZ(0px)'});
		}
	}

	//放手后自动滑向目标位置,flag控制滑动方向
	//设置标志位 滑动期间禁止滑动
	//
	// flag 1  从当前节点滑向下一个节点
	// flag 0  不变
	// flag -1 从当前节点滑向上一个节点
	_animateItem(flag){
		var endPos;
		var boxlength;
		var attribute;
		var me = this;

		if( this.isDirectionV ){
			boxlength = this.sliderHeight;
			attribute = 'translateY';
		}else{
			boxlength = this.sliderWidth;
			attribute = 'translateX';
		}

		if( flag == 1 ){
			this.curIndex = this.curIndex==(this.items.length-1) ? this.curIndex:this.curIndex+1;
		}else if( flag < 0 ){
			this.curIndex = this.curIndex==0 ? this.curIndex:this.curIndex-1;
		}
		endPos = -boxlength* this.curIndex;

		var an={};
		an[attribute]=endPos+'px';
		an['translateZ']='0px';

		this.wrapper.animate(an,'fast',function(){
			me.isAnimate = false;
			me.options.onMoveEnd(me.curIndex);
		});
	}

	_touchStart(e){
		var touch = e.touches[0];
		if( this.isAnimate ) return false;  //判断是否在正在动画中
		this.beginPos = this.isDirectionV ? touch.clientY : touch.clientX;
	}

	_touchMove(e){
		var touch = e.touches[0];
		this.curPos = this.isDirectionV ? touch.clientY : touch.clientX;
		this._moveItem(this.curPos - this.beginPos);
	}

	//
	// 滑动结束后的事件检测
	// 
	//
	_touchEnd(e){
		var distance = this.curPos - this.beginPos;
		var boxlength; //容器的衡量长度
		if( this.isDirectionV ){
			boxlength = this.sliderHeight;
		}else{
			boxlength = this.sliderWidth;
		}

		//正向滑动
		if( distance <= 0 ){
			if( (-distance/boxlength) > this.options.slidePercent ){
				this._animateItem(1);
			}else{
				this._animateItem(0);
			}
		//负向滑动
		}else{
			if( (distance/boxlength) > this.options.slidePercent ){
				this._animateItem(-1);
			}else{
				this._animateItem(0);
			}
		}
	}
} 

export default Slider;
