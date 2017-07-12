var scrolltable = require('./component/scroll_table.js');
var labelselect = require('./component/labelselect.js');
var zeptodate = require('./plugin/date.js');

var util = require('./common.js');

//详情图表
function flowDetail(){

    $('[name="enddate"]').val( (new Date())._format('yyyy-MM-d') );

    var earlydate = new Date('2017-03-1');
    var basicdate = new Date( new Date().getTime() - (90*24*60*60*1000) );
    if( basicdate.getTime() < earlydate.getTime() ){
        $('[name="startdate"]').val( earlydate._format('yyyy-MM-d') );
    }else{
        $('[name="startdate"]').val( basicdate._format('yyyy-MM-d') );
    }

    //表格控制器
	var flowtable = new Vue({
		'el':'#flowtable',
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
	var flowchart = echarts.init( $('#flowchart')[0],'default' );
    //基本数据控制器
    var flowdetail = new Vue({
        'el':'#flowdetails',
        'data':{
            'detail':[]
        }
    })

    //数据校验
    function  verify(){
        var startstr = $('[name="startdate"]').val();
        var endstr = $('[name="enddate"]').val();

        var baseTime = new Date('2017-03-1').getTime();  //最早日期
        var nowTime = new Date().getTime();               //当前日期

        var starttime = new Date(startstr).getTime();
        var endtime = new Date(endstr).getTime();

        if( starttime < baseTime ){
            util.showPrompt("起始日期请选择2017年3月1日之后的日期");
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
        return true;
    }

    //刷新数据
    function refresh( datas, detaildata ){

        flowtable.tabledata = datas;
        flowdetail.detail = detaildata;

        var sarray = [];
        for(var i=1;i<datas['category']['data'].length;i++){
            sarray.push(i);
        }
        
        flowchart.clear();
        flowchart.setOption( util.formatLineOption(datas,sarray,{grid:{bottom:'30%'}} ) );

        //设置选中状态
        function setSelected(){
            var selected = {};
            datas.category.data.forEach(function(item,index){
                selected[item] = false;
            });

            selected['在售车源'] = true;
            selected['总浏览量'] = true;
            
            flowchart.setOption( {'legend':{'selected':selected}} );
        }

        setSelected();
    }

    function getAjaxData(){
        var startstr = $('[name="startdate"]').val();
        var endstr = $('[name="enddate"]').val();

        $.ajax({
            'type':'get',
            'url':'/shopapp/shopClick/ajaxTrendByShop',
            'data':{
                'startdate': startstr,
                'enddate': endstr,
                'shop_id':util.getParam('shop_id'),
                'app_key':util.getParam('app_key')
            },
            'success': function( data ){
                //console.log('getdata');
                //console.log(data);
                var data = JSON.parse(data);
                refresh( data.lineData, data.detailData );
            }
        })
    }
    getAjaxData()

    var earlydate = new Date('2017-1-1');

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
flowDetail();

