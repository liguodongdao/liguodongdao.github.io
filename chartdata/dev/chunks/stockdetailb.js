var scrolltable = require('./component/scroll_table.js');
var labelselect = require('./component/labelselect.js');
var zeptodate = require('./plugin/date.js');

var util = require('./common.js');

//详情图表
function stockList(){
	var $view = $('#ppdetail');
	var ppdata = _ppdata;
	var cxdata = _cxdata;

    //表格控制器
	var cxtable = new Vue({
		'el':'#cxtable',
		'data':{
			'tabledata':{
                "category":{
                    "data":[]
                },
                "series":[]
            }
		}
	})

	//图表实例
	//var cxchart = echarts.init($('#cxchart')[0],'default');
	cxtable.tabledata = ppdata;
	//cxchart.setOption( util.formatPieOption(ppdata,1,2) );
	//setPpSelected();

	//默认设置前十个选中
	function setPpSelected(){
		var selected = {};
		ppdata.series.forEach(function(item,index){
			if(index<10){
				selected[item['data'][1]] = true;
			}else{
				selected[item['data'][1]] = false;
			}
		});
		console.log(selected);
		cxchart.setOption({'legend':{'selected':selected}});
	}

	//前十个选中
	function setCxSelected(){
		var selected = {};
		cxdata.series.forEach(function(item,index){
			if(index<10){
				selected[item['data'][2]] = true;
			}else{
				selected[item['data'][2]] = false;
			}
		});
		console.log(selected);
		cxchart.setOption({'legend':{'selected': selected}});
	}

	$view.on('click','.u-toggle span',function(e){
		var $target = $(e.currentTarget);
        var index = $target.attr('data-value');
        
        $target.addClass('active').siblings().removeClass('active');
        if(index == 0){
            cxtable.tabledata = ppdata;
            //cxchart.clear();
            //cxchart.setOption( util.formatPieOption(ppdata,1,2) );
            //setPpSelected();
        }else if(index == 1){
            cxtable.tabledata = cxdata;
            //cxchart.clear();
            //cxchart.setOption( util.formatPieOption(cxdata,2,3) );
            //setCxSelected();
        }
	});
}
stockList();



