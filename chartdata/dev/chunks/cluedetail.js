var scrolltable = require('./component/scroll_table.js');
var labelselect = require('./component/labelselect.js');
var zeptodate = require('./plugin/date.js');

var util = require('./common.js');

//详情图表
function clueDetail(){

    $('[name="enddate"]').val( (new Date())._format('yyyy-MM-d') );

    var earlydate = new Date('2017-01-1');
    var basicdate = new Date( new Date().getTime() - (90*24*60*60*1000) );
    if( basicdate.getTime() < earlydate.getTime() ){
        $('[name="startdate"]').val( earlydate._format('yyyy-MM-d') );
    }else{
        $('[name="startdate"]').val( basicdate._format('yyyy-MM-d') );
    }

    //表格控制器
	var stocktable = new Vue({
		'el':'#stocktable',
		'data':{
			'tabledata':{
                "category":{
                    "data":[]
                },
                "series":[]
            }
		}
	});

	//图表实例
	var stockchart = echarts.init($('#stockchart')[0],'default');

    //数据校验
    function verify(){
        var startstr = $('[name="startdate"]').val();
        var endstr = $('[name="enddate"]').val();

        var baseTime = new Date('2017-01-1').getTime();  //最早日期
        var nowTime = new Date().getTime();               //当前日期

        var starttime = new Date(startstr).getTime();
        var endtime = new Date(endstr).getTime();

        if( starttime < baseTime ){
            util.showPrompt("起始日期请选择2017年1月1日之后的日期");
            return false;
        }
        if( endtime > nowTime ){
            util.showPrompt("结束日期请选择当前日期之前的日期");
            return false;
        }
        if( (endtime - starttime) > (90*24*60*60*1000) ){
            util.showPrompt("时间跨度不能超过九十天，请重新选择日期");
            return false;
        }
        if( starttime > endtime ){
            util.showPrompt("起始日期不能大于结束日期");
            return false;
        }
        return true;
    }

    //刷新数据
    function refresh(datas){
        
        stocktable.tabledata = datas;

        var sarray = [];
        for(var i = 1; i<=datas['category']['data'].length; i++){
            sarray.push(i);
        }

        stockchart.clear();
        stockchart.setOption( util.formatLineOption( datas,sarray,{grid:{bottom:'30%'}} ));

         //设置前四个选中 剩余的不选中
        /*
        var selected = {};
        datas.category.data.forEach(function(item,index){
            if( index > 4 ){
                selected[item] = false;
            } else {
                selected[item] = true;
            }
        });
        */

        //设置选中状态
        function setSelected(){
            var selected = {};
            datas.category.data.forEach(function(item,index){
                selected[item] = false;
            });

            selected['新线索'] = true;
            selected['当天处理'] = true;
            selected['跟进次数'] = true;
            selected['到店客户'] = true;
            selected['成交客户'] = true;
            
            stockchart.setOption( {'legend':{'selected':selected}} );
        }

        //stockchart.setOption({'legend':{'selected':selected}});
        setSelected();
    }

    //请求初始化数据
    function getAjaxData(){
        var startstr = $('[name="startdate"]').val();
        var endstr = $('[name="enddate"]').val();

        $.ajax({
            'type':'get',
            'url':'/shopapp/shopClues/ajaxTrendByShop',
            'data':{
                'startdate':startstr,
                'enddate':endstr,
                'shop_id':util.getParam('shop_id'),
                'app_key':util.getParam('app_key')
            },
            'success': function( data ){
                var data = JSON.parse(data);
                refresh( data );
            }
        })
    }
    getAjaxData();

    $('[name="startdate"]').date(null,function(str){
        if( verify() ){
            getAjaxData();
        }
    });

    $('[name="enddate"]').date(null,function(str){
        if( verify() ){
            getAjaxData();
        }
    });
}
clueDetail();


