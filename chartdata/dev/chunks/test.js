var tablecomponent = require('./component/common_table.js');
var scrolltable = require('./component/scroll_table.js');

//工具类函数
var util = require('./common.js');
var testTable = new Vue({
	'el':$('.sec-table')[0],
	'data':{
		'tabledata':{
			'category':{
				'data':['ca','cb','cc','cd']
			},
			'series':[
				{
					'data':[1,2,3,4]
				},{
					'data':[5,6,7,8]
				}
			]
		}
	}
})
