var templatestr = require('./common_table.html');

//注册table组件
Vue.component('common-table',{
	template: templatestr,
	props: ['data'],
	'computed':{
		'isEmpty':function(){
			if(this.data.series.length > 0){
				return false;
			}else{
				return true;
			}
		}
	}
});


