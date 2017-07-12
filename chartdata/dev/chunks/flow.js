var tablecomponent = require('./component/common_table.js');
var scrolltable = require('./component/scroll_table.js');

//工具类函数
var util = require('./common.js');

//合并品牌
function mergePinpai(ppseries){
	 var newppseries = [];
	 if( ppseries.length > 10){
        newppseries = ppseries.slice( 0,10 );
        
        for(var i = 10;i<ppseries.length;i++){
            newppseries[9]['data'].forEach(function( item,index ){
                if( index > 1 ){
                    newppseries[9]['data'][index] = newppseries[9]['data'][index] + ppseries[i]['data'][index];
                }
            });
        }
        newppseries[9]['data'][1]="其他";
    }else{
        newppseries = ppseries;
    }
    return newppseries;
}

//合并车系
function mergeSeries(cxseries){
	var newcxseries = [];
	if( cxseries.length > 10){
        newcxseries = cxseries.slice(0,10);
        for(var i = 10;i<cxseries.length;i++){
            newcxseries[9]['data'].forEach(function( item,index ){
                if( index > 1){
                    newcxseries[9]['data'][index] = newcxseries[9]['data'][index] + cxseries[i]['data'][index];
                }
            })
        }
        newcxseries[9]['data'][1]="其他";
        newcxseries[9]['data'][2]="其他";
    }else{
        newcxseries = cxseries;
    }
    return newcxseries;
}

//流量数据
function flowData(){

	var $view = $('#llsj');
	var baseData = _flowData;

	var flowDetail = new Vue({
		'el':'#flowdetail',
		'data':{
			'detaildata':_datas
		},
		methods:{
	        'getClass':function(num){
	            if( num > 0 ){
	                return "rise";
	            }else if(num == 0){
	                return "hold";
	            }else{
	                return "dec";
	            }
	        },
	        'getNumber':function(num){
	            if( num >= 0 ){
	                return num;
	            }else{
	                return -num;
	            }
	        },
	        'getRateNumber':function(num){
	            if( num > 0 ){
	                return num+'%';
	            }else if( num == 0 ){
	                return "持平";
	            }else{
	                return -num+'%';
	            }
	        }
        }
	})
	var flowTable = new Vue({
		'el':$view.find('.sec-table')[0],
		'data':{
			'tabledata':{
				'category':{
					'data':[]
				},
				'series':[]
			}
		}
	})
	var flowChart = echarts.init( $view.find('.sec-chart')[0],'default' );

	$view.on('click','.u-switch span',function(e){
		var $target = $(e.currentTarget);
        var index = $target.attr('data-value');
        $target.addClass('active').siblings().removeClass('active');
        if(index == 0){
        	flowDetail.detaildata = _datas;
        	refreshData({
				'category':baseData.category,
				'series':util.clone( baseData.series.slice(0,1) )
			});
        }else if(index == 1){
        	flowDetail.detaildata = _datas7;
        	refreshData({
				'category':baseData.category,
				'series':util.clone( baseData.series.slice(0,7) )
        	});
        }else if(index == 2){
        	flowDetail.detaildata = _datas30;
        	refreshData({
    			'category':baseData.category,
    			'series':util.clone( baseData.series.slice(0,30) )
        	});
        }

        //更新其他数据
        ppcxSec.refreshData();
        jgllSec.refreshData();
        clllSec.refreshData();
        lcllSec.refreshData();
        //fwscSec.refreshData();
	})

	function refreshData( datas ){
		flowTable.tabledata = datas;
		flowChart.clear();
		flowChart.setOption( util.formatLineOption(datas,[1,2],{grid:{bottom:'30%'}}))

		//设置选中状态
		function setSelected(){
            var selected = {};
            datas.category.data.forEach(function(item,index){
                selected[item] = false;
            });

            selected['在售车源'] = true;
            selected['总浏览量'] = true;
            
            flowChart.setOption( {'legend':{'selected':selected}} );
        }

        //setSelected();
	}

	refreshData({
		'category':baseData.category,
		'series':baseData.series.slice(0,1)
	});
}
flowData();

//品牌车系数据
var ppcxSec={};
function ppcxData(){
	var $view = $('#ppcx');

	//对数据做合并处理
	_pinpaiData.series = mergePinpai(_pinpaiData.series);
	_chexiData.series = mergeSeries(_chexiData.series);

	_pinpaiData7.series = mergePinpai(_pinpaiData7.series);
	_chexiData7.series = mergeSeries(_chexiData7.series);

	_pinpaiData30.series = mergePinpai(_pinpaiData30.series);
	_chexiData30.series = mergeSeries(_chexiData30.series);

	var flowTable = new Vue({
		'el':$view.find('.sec-table')[0],
		'data':{
			'tabledata':{
				'category':{
					'data':[]
				},
				'series':[]
			}
		}
	})
	var flowChart = echarts.init( $view.find('.sec-chart')[0],'default' );

	$view.on('click','.u-toggle span',function(e){
		var $target = $(e.currentTarget);
        $target.addClass('active').siblings().removeClass('active');
      	ppcxSec.refreshData();
	})

	ppcxSec.refreshData = function(){

		var data_a = util.clone( _pinpaiData );
		var data_b = util.clone(_chexiData);

		var data_a7 = util.clone(_pinpaiData7);
		var data_b7 = util.clone(_chexiData7);

		var data_a30 = util.clone(_pinpaiData30);
		var data_b30 = util.clone(_chexiData30);

		var day = $('#llsj .sec-title .title-toggle span.active').attr('data-value'); 
		var ppcx = $view.find('.title-toggle span.active').attr('data-value');

		if( ppcx == 0 ){
			if(day == 0){
				flowTable.tabledata = data_a;
				flowChart.clear();
				flowChart.setOption( util.formatPieOption(data_a,1,3) );
			}else if( day == 1 ){
				flowTable.tabledata = data_a7;
				flowChart.clear();
				flowChart.setOption( util.formatPieOption(data_a7,1,3) );
			}else if( day == 2 ){
				flowTable.tabledata = data_a30;
				flowChart.clear();
				flowChart.setOption( util.formatPieOption(data_a30,1,3) );
			}
		}else if( ppcx == 1 ){
			if( day == 0 ){
				flowTable.tabledata = data_b;
				flowChart.clear();
				flowChart.setOption( util.formatPieOption(data_b,2,4) );
			}else if( day == 1 ){
				flowTable.tabledata = data_b7;
				flowChart.clear();
				flowChart.setOption( util.formatPieOption(data_b7,2,4) );
			}else if( day == 2 ){
				flowTable.tabledata = data_b30;
				flowChart.clear();
				flowChart.setOption( util.formatPieOption(data_b30,2,4) );
			}
		}
	}
	ppcxSec.refreshData();
}
ppcxData();

//价格流量
var jgllSec={};
function jgllData(){
	var jglltable = new Vue({
		'el':$('#jgll').find('.sec-table')[0],
		'data':{
			'tabledata': {
				'category':{
					'data':[]
				},
				'series':[]
			}
		}
	});
	var chart = echarts.init( $('#jgll').find('.sec-chart')[0],'default' );
	jgllSec.refreshData = function(){
		var day = $('#llsj .sec-title .title-toggle span.active').attr('data-value'); 
		var priceData;
		if( day == 0 ){
			priceData = util.clone( _priceData );
		}else if( day == 1 ){
			priceData = util.clone( _priceData7);
		}else{
			priceData = util.clone( _priceData30);
		}
		var basicSeries = [
	        {
	          "data":[]
	        },{
	          "data":[]
	        },{
	          "data":[]
	        },{
	          "data":[]
	        },{
	          "data":[]
	        },{
	          "data":[]
	        },{
	          "data":[]
	        },{
	          "data":[]
	        }
	     ];
	     priceData.series.forEach(function(item,index){
	     	try{
	     		item.data[0]=Number(item.data[0]);
	     	}catch(err){

	     	}
	     	if( item.data[0]<3 ){
	     		basicSeries[0]['data'] = util.mergeArray( item['data'],basicSeries[0]['data'] );
	     	}else if( item.data[0]>=3 && item.data[0]<5 ){
	     		basicSeries[1]['data'] = util.mergeArray( item['data'],basicSeries[1]['data'] );
	     	}else if( item.data[0]>=5 && item.data[0]<8 ){
	     		basicSeries[2]['data'] = util.mergeArray( item['data'],basicSeries[2]['data'] );
	     	}else if( item.data[0]>=8 && item.data[0]<10){
	     		basicSeries[3]['data'] = util.mergeArray( item['data'],basicSeries[3]['data'] );
	     	}else if( item.data[0]>=10 && item.data[0]<15){
	     		basicSeries[4]['data'] = util.mergeArray( item['data'],basicSeries[4]['data'] );
	     	}else if( item.data[0]>=15 && item.data[0]<20){
	     		basicSeries[5]['data'] = util.mergeArray( item['data'],basicSeries[5]['data'] );
	     	}else if( item.data[0]>=20 && item.data[0]<30){
	     		basicSeries[6]['data'] = util.mergeArray( item['data'],basicSeries[6]['data'] );
	     	}else{
	     		basicSeries[7]['data'] = util.mergeArray( item['data'],basicSeries[7]['data'] );
	     	}
	     });
	     priceData.series = basicSeries;
	     if( priceData.series[0]['data'].length > 0 ){
	     	 priceData.series[0]['data'][0]="3万以下";
	     }
	     if( priceData.series[1]['data'].length > 0 ){
	     	priceData.series[1]['data'][0]="3-5万";
	     }
	     if( priceData.series[2]['data'].length > 0 ){
	     	priceData.series[2]['data'][0]="5-8万";
	     }
	     if( priceData.series[3]['data'].length > 0 ){
	     	priceData.series[3]['data'][0]="8-10万";
	     }
	     if( priceData.series[4]['data'].length > 0 ){
	     	priceData.series[4]['data'][0]="10-15万";
	     }
	     if( priceData.series[5]['data'].length > 0 ){
	     	 priceData.series[5]['data'][0]="15-20万";
	     }
	     if( priceData.series[6]['data'].length > 0 ){
	     	 priceData.series[6]['data'][0]="20-30万";
	     }
	     if( priceData.series[7]['data'].length > 0 ){
	     	 priceData.series[7]['data'][0]="30万以上";
	     }
	     var tempSeries=[];
	     priceData.series.forEach(function(item,index){
	     	if(item.data && item.data.length>0){
	     		tempSeries.push(priceData.series[index]);
	     	}
	     })
	    priceData.series = tempSeries;
		jglltable.tabledata = priceData;
		chart.clear();
		chart.setOption( util.formatPieOption(priceData,0,2) )
	}
	jgllSec.refreshData();
}
jgllData();

//车龄流量
var clllSec={};
function clllData(){
	var table = new Vue({
		'el':$('#clll').find('.sec-table')[0],
		'data':{
			'tabledata': {
				'category':{
					'data':[]
				},
				'series':[]
			}
		}
	})
	var chart = echarts.init( $('#clll').find('.sec-chart')[0],'default' );
	
	clllSec.refreshData = function(){
		var day = $('#llsj .sec-title .title-toggle span.active').attr('data-value');
		var ageData;
		if( day == 0 ){
			ageData = util.clone(_ageData);
		}else if( day == 1 ){
			ageData = util.clone(_ageData7);
		}else{
			ageData = util.clone(_ageData30);
		}
		var basicSeries = [
			{
	          "data":[]
	        },{
	          "data":[]
	        },{
	          "data":[]
	        },{
	          "data":[]
	        },{
	          "data":[]
	        },{
	          "data":[]
	        }
		];
		ageData.series.forEach(function(item,index){
			try{
	     		item.data[0]=Number(item.data[0]);
	     	}catch(err){

	     	}
			if(item.data[0]<=1){
				basicSeries[0]['data'] = util.mergeArray(item['data'],basicSeries[0]['data']);
			}else if(item.data[0]>1 && item.data[0]<=3){
				basicSeries[1]['data'] = util.mergeArray(item['data'],basicSeries[1]['data']);
			}else if(item.data[0]>3 && item.data[0]<=5){
				basicSeries[2]['data'] = util.mergeArray(item['data'],basicSeries[2]['data']);
			}else if(item.data[0]>5 && item.data[0]<=8){
				basicSeries[3]['data'] = util.mergeArray(item['data'],basicSeries[3]['data']);
			}else if(item.data[0]>8 && item.data[0]<=10){
				basicSeries[4]['data'] = util.mergeArray(item['data'],basicSeries[4]['data']);
			}else{
				basicSeries[5]['data'] = util.mergeArray(item['data'],basicSeries[5]['data']);
			}
		});
		ageData.series = basicSeries;
		if(ageData.series[0]['data'].length >0){
			ageData.series[0]['data'][0]="1年以内";
		}
		if(ageData.series[1]['data'].length >0){
			ageData.series[1]['data'][0]="1-3年";
		}
		if(ageData.series[2]['data'].length >0){
			ageData.series[2]['data'][0]="3-5年";
		}
		if(ageData.series[3]['data'].length >0){
			ageData.series[3]['data'][0]="5-8年";
		}
		if(ageData.series[4]['data'].length >0){
			ageData.series[4]['data'][0]="8-10年";
		}
		if(ageData.series[5]['data'].length >0){
			ageData.series[5]['data'][0]="10年及以上";
		}
		var tempSeries=[];
	    ageData.series.forEach(function(item,index){
	     	if(item.data && item.data.length>0){
	     		tempSeries.push(ageData.series[index]);
	     	}
	    })
	    ageData.series = tempSeries;

		table.tabledata = ageData;
		chart.clear();
		chart.setOption( util.formatPieOption(ageData,0,2) )
	}

	clllSec.refreshData();
}
clllData();

//里程流量
var lcllSec={};
function lcllData(){
	var table = new Vue({
		'el':$('#lcll').find('.sec-table')[0],
		'data':{
			'tabledata':{
				'category':{
					'data':[]
				},
				'series':[]
			}
		}
	})
	var chart = echarts.init( $('#lcll').find('.sec-chart')[0],'default');

	lcllSec.refreshData = function(){
		var day = $('#llsj .sec-title .title-toggle span.active').attr('data-value'); 
		var lcData;
		if( day == 0 ){
			lcData = util.clone(_lcData);
		}else if( day == 1 ){
			lcData = util.clone(_lcData7);
		}else{
			lcData = util.clone(_lcData30);
		}
		var basicSeries = [
			{
				"data":[]
			},{
				"data":[]
			},{
				"data":[]
			},{
				"data":[]
			},{
				"data":[]
			},{
				"data":[]
			},{
				"data":[]
			}
		];
		lcData.series.forEach(function(item,index){
			try{
	     		item.data[0]=Number(item.data[0]);
	     	}catch(err){

	     	}
			if( item.data[0]<=1 ){
				basicSeries[0]['data'] = util.mergeArray(item['data'],basicSeries[0]['data']);
			}else if( item.data[0]>1 && item.data[0]<=3 ){
				basicSeries[1]['data'] = util.mergeArray(item['data'],basicSeries[1]['data']);
			}else if( item.data[0]>3 && item.data[0]<=6 ){
				basicSeries[2]['data'] = util.mergeArray(item['data'],basicSeries[2]['data']);
			}else if( item.data[0]>6 && item.data[0]<=10 ){
				basicSeries[3]['data'] = util.mergeArray(item['data'],basicSeries[3]['data']);
			}else if( item.data[0]>10 && item.data[0]<=15 ){
				basicSeries[4]['data'] = util.mergeArray(item['data'],basicSeries[4]['data']);
			}else if( item.data[0]>15 && item.data[0]<=20 ){
				basicSeries[5]['data'] = util.mergeArray(item['data'],basicSeries[5]['data']);
			}else{
				basicSeries[6]['data'] = util.mergeArray(item['data'],basicSeries[6]['data']);
			}
		});
		lcData.series = basicSeries;
		if( lcData.series[0]['data'].length >0 ){
			lcData.series[0]['data'][0]="1万公里以内";
		}
		if( lcData.series[1]['data'].length >0 ){
			lcData.series[1]['data'][0]="1-3万公里";
		}
		if( lcData.series[2]['data'].length >0 ){
			lcData.series[2]['data'][0]="3-6万公里";
		}
		if( lcData.series[3]['data'].length >0 ){
			lcData.series[3]['data'][0]="6-10万公里";
		}
		if( lcData.series[4]['data'].length >0 ){
			lcData.series[4]['data'][0]="10-15万公里";
		}
		if( lcData.series[5]['data'].length >0 ){
			lcData.series[5]['data'][0]="15-20万公里";
		}
		if( lcData.series[6]['data'].length >0 ){
			lcData.series[6]['data'][0]="20万公里以上";
		}
		var tempSeries=[];
	    lcData.series.forEach(function(item,index){
	     	if(item.data && item.data.length>0){
	     		tempSeries.push(lcData.series[index]);
	     	}
	    })
	    lcData.series = tempSeries;
		table.tabledata = lcData;
		chart.clear();
		chart.setOption( util.formatPieOption(lcData,0,2) )
	}
	
	lcllSec.refreshData();
}
lcllData();

//二手车效率排行榜
function escxl(){
	var $view = $('#escxl');

	var data_a = _flowphzl;
	var data_b = _flowphcj;

	//格式化表格数据
    function formatTableData(data){
    	var data = util.clone( data );
    	//
    	if( data.series[0]['shopId'] ){
	    	var baseShopId = data.series[0]['shopId'];
	        var sameindex;
	        data.series.forEach(function(item,index){
	            if( index == 0){
	                return;
	            }else if(item.shopId == baseShopId){
	                sameindex = index;
	            }
	        })
	        
	        //
	        if(sameindex){
	            data.series[0]['isActive'] = true;
	            data.series[sameindex]['isActive'] = true;
	        }
    	}
        return data;
    }

	var table = new Vue({
		'el':$view.find('.sec-table')[0],
		'data':{
			'tabledata':formatTableData(data_a)
		}
	})

	$view.on('click','.u-toggle span',function(e){
		var $target = $(e.currentTarget);
        var index = $target.attr('data-value');
        $target.addClass('active').siblings().removeClass('active');
        if(index == 0){
        	table.tabledata = formatTableData( data_a );
        }else if(index == 1){
        	table.tabledata = formatTableData( data_b );
        }
	})
}
escxl();
//访问时长
/*
var fwscSec={};
function fwsc(){

	var table = new Vue({
		'el':$('#fwsc').find('.sec-table')[0],
		'data':{
			'tabledata':{
				'category':{
					'data':[]
				},
				'series':[]
			}
		}
	})
	var chart = echarts.init( $('#fwsc').find('.sec-chart')[0],'default' );

	fwscSec.refreshData = function(){
		var day = $('#llsj .sec-title .title-toggle span.active').attr('data-value'); 
		var fwscdata = JSON.parse(JSON.stringify(_fwsc));
		if( day == 0 ){
			fwscdata.series = _fwsc.series.slice(0,1);
		}else if( day == 1 ){
			fwscdata.series = _fwsc.series.slice(0,7);
		}else{
			fwscdata.series = _fwsc.series.slice(0,30);
		}
		console.log( 'refreshData' );
		console.log( day );
		console.log( fwscdata );
		table.tabledata = fwscdata;
		chart.clear()
		chart.setOption( util.formatLineOption( fwscdata,[1,2] ) )
	}
	fwscSec.refreshData();
}
fwsc();
*/

