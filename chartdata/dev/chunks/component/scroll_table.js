var templatestr = require('./scroll_table.html');

//注册table组件
//如果某一行的数据为空则不进行展示
Vue.component('scroll-table',{
	template: templatestr,
	props: ['data'],
	'computed':{
		'isEmpty':function(){
			if(this.data.series.length>0){
				//判断所有行是否是空行
				var isTdEmpty = true;
				this.data.series.forEach(function(item,index){
					if(item.data.length > 0){
						isTdEmpty = false;
					}
				});
				if(isTdEmpty){
					return true;
				}else{
					return false;
				}
			}else{
				return true;
			}
		}
	}
});


