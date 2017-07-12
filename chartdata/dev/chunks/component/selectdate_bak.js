var templatestr = require('./selectdate.html');

//填充月份
var months = [];
for(var i=1;i<=12;i++){
	months.push({'active':false,'value':i + '月'});
}
//填充日子
var days = [];
for(var j=1;j<=31;j++){
	days.push({'active':false,'value':j + '日'});
}
//填充年份
var years = [];
for(var k=1970;k<=2050;k++){
	years.push({'active':false,'value':k + '年'});
}

//注册table组件
Vue.component('selectdate',{
	template: templatestr,
	//内部属性
	data:function(){
		return {
			starty:0,
			startpose:0,
			distance:0,

			endy:0,
			duration:0,

			'yeartop': -10,
			'monthtop': -10,
			'daytop': -10,

			'years': years,
			'months': months,
			'days': days
		}
	},
	//绑定属性
	props:['year','month','day','showModal'],
	//

	//watch
	watch:{
		'month':function(newmonth){
			this.day = 1
		}
	},
	//===============第一层变化属性====================
	//计算属性
	computed:{

	},
	//方法
	methods:{
		//滑动开始事件
		start:function(num,e){
			this.starty = e.touches[0]['screenY'];
			if( num == 0 ){
				this.startpose = this.yeartop;
			}else if( num == 1 ){
				this.startpose = this.monthtop;
			}else if( num == 2 ){
				this.startpose = this.daytop;
			}
		},
		//滑动事件
		move:function(num,e){
			this.endy = e.touches[0]['screenY'];
			this.distance = this.endy - this.starty;
			if( num == 0){
				this.yeartop = this.startpose + this.distance;
			}else if( num == 1 ){
				this.monthtop = this.startpose + this.distance;
			}else if( num ==2 ){
				this.daytop = this.startpose + this.distance;
			}
		},
		//滑动结束事件 依靠加速度完成最后的缓动效果
		end:function(num,e){
			var me = this;
			this.starty = 0;
			this.startpose = 0;


			var  acceleration;
			if( this.distance > 0 ){
				acceleration = 16;
			}else{
				acceleration = -16;
			}

			//加速度函数
			function go(num){
				if(acceleration==0){
					this.distance = 0;
					return
				}else{
					me.yeartop = me.yeartop + acceleration;
					if( this.distance >0 ){
						acceleration = acceleration - 1;
					}else{
						acceleration = acceleration + 1;
					}
					setTimeout(go,1)
				}
			}
			go();

		},
		//计算当前月份下的最大日期
		maxDay:function(){
			if( this.month==2 ){
				return 28;
			}else if( this.month%2==1 ){
				return 31;
			}else{
				return 30;
			}
		}
	}
});


