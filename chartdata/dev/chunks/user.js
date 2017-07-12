//初始化echarts地图组件
var data = require('./plugin/china.json');
echarts.registerMap('china', data);

//加载表格控件
var tablecomponent = require('./component/common_table.js');
var scrolltable = require('./component/scroll_table.js');

//工具类函数
var util = require('./common.js');

//性别分布
function xbfb(){
	var xbdata7 = _xbdata7;
	var xbdata30 = _xbdata30;


	var xbchart = echarts.init($('#xbfb .sec-chart')[0],'default');
	xbchart.setOption( util.formatPieOption(xbdata7,0,1) );

	$('#xbfb .u-switch span').on('click',function(e){
		var $target = $(e.target);
		var value = $target.attr('data-value');
		$target.addClass('active').siblings().removeClass('active');

		if( value == 0 ){
			xbchart.clear();
			xbchart.setOption( util.formatPieOption(xbdata7,0,1) );
			agefbmain.refresh(0);
			sfmain.refresh(0);
		}else if( value == 1 ){
			xbchart.clear();
			xbchart.setOption( util.formatPieOption(xbdata30,0,1) );
			agefbmain.refresh(1);
			sfmain.refresh(1);
		}
	})
}
xbfb();

//年龄分布
var agefbmain = {};
function agefb(){
	console.log('年龄分布');
	var $view = $('#nlfb');
	var agechart = echarts.init($('#nlfb .sec-chart')[0],'default');

	agechart.setOption(util.formatBarOption([_agedata_a7,_agedata_b7],0,1));

	var agetable = new Vue({
		'el':$view.find('.sec-table')[0],
		'data':{
			'tabledata':util.formatNumberPercent(_agedata_a7)
		}
	})
	
	function refresh(value){
		if( value == 0 ){
			agetable.tabledata = util.formatNumberPercent(_agedata_a7);
			agechart.clear();
			agechart.setOption(util.formatBarOption([_agedata_a7,_agedata_b7],0,1));
		}else if( value == 1 ){
			agetable.tabledata = util.formatNumberPercent(_agedata_a30);
			agechart.clear();
			agechart.setOption(util.formatBarOption([_agedata_a30,_agedata_b30],0,1));
		}
	}
	agefbmain.refresh = refresh;
}
agefb();

var sfmain = {};
//省份分布
function sffb(){
	var $view = $('#sffb');
	_provincedata7.series.forEach(function(item,index){
		item['data'][2] = item['data'][2]+'%';
	});
	_provincedata30.series.forEach(function(item,index){
		item['data'][2] = item['data'][2]+'%';
	});

	var option7 = {
	    tooltip: {
	        trigger: 'item'
	    },
	    series: [
	        {
	            name: '中国',
	            type: 'map',
	            map: 'china',
	           // selectedMode : 'multiple',
	            label: {
	                normal: {
	                    show: false
	                },
	                emphasis: {
	                    show: true
	                }
	            },
	            data:[
	            ]
	        }
	    ]
	};
	var option30 = {
		  tooltip: {
	        trigger: 'item'
	    },
	    series: [
	        {
	            name: '中国',
	            type: 'map',
	            map: 'china',
	           // selectedMode : 'multiple',
	            label: {
	                normal: {
	                    show: false
	                },
	                emphasis: {
	                    show: true
	                }
	            },
	            data:[
	            ]
	        }
	    ]
	}
	_provincedata7.series.forEach(function(item,index){
		option7.series[0]['data'].push({'name':item['data'][0],'value':item['data'][1]})
	});
	_provincedata30.series.forEach(function(item,index){
		option30.series[0]['data'].push({'name':item['data'][0],'value':item['data'][1]})
	});

	var fbtable = new Vue({
		'el':$view.find('.sec-table')[0],
		'data':{
			'tabledata':_provincedata7
		}
	});
	var fbchart = echarts.init($('#sffb .sec-chart')[0],'default');
	fbchart.setOption( option7 );

	function refresh(value){
		if( value == 0 ){
			fbtable.tabledata = _provincedata7;
			fbchart.clear();
			fbchart.setOption( option7 );
		}else if(value == 1 ){
			fbtable.tabledata = _provincedata30;
			fbchart.clear();
			fbchart.setOption( option30 );
		}
	}
	sfmain.refresh = refresh;
}
sffb();


//城市分布

function csfb(){
	var $view = $('#csfb');
	var cschart = echarts.init($('#csfb .sec-chart')[0],'default');
	cschart.setOption(util.formatBarOption([_citydata],0,1));

	_citydata.series.forEach(function(item,index){
		item['data'][2]=item['data'][2]+'%';
	})


	var agetable = new Vue({
		'el':$view.find('.sec-table')[0],
		'data':{
			'tabledata':_citydata
		}
	})
}
csfb();





