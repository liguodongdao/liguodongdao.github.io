var tablecomponent = require('./component/common_table.js');
var scrolltable = require('./component/scroll_table.js');

var util = require('./common.js');
//
var bodyWidth = $('body').width();
var fontSize = bodyWidth/320*12*0.8;

//线索数量
function clueNumber(){
    var cluessNumber = _cluessnumber;                           //表格三十天数据
    var clueNumber = {                                          //表格七天数据
        "category": cluessNumber.category,
        "series": cluessNumber.series.slice(0,7)
    }

    var $view = $('#cluenumber');

	var clueNumberTable = new Vue({
		el:'#cluetable',
		data:{
			'tabledata':clueNumber
		}
	});
	var clueNumberChart = echarts.init($('#cluechart')[0],'default');
    var clueNumberDetail = new Vue({
        el:'#cluedetail',
        data:{
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
    });

    var sarray = [1,2,5,9,11];
    /*
    for(var i = 1; i<=cluessNumber['category']['data'].length; i++){
        sarray.push(i);
    }
    */
    
	clueNumberChart.setOption( util.formatLineOption(clueNumber,sarray,{grid:{bottom:'30%'}}));
    //setSelected();

    //设置选中状态
    function setSelected(){
        var selected = {};
        clueNumber.category.data.forEach(function(item,index){
            selected[item] = false;
        });

        selected['新线索'] = true;
        selected['当天处理'] = true;
        selected['跟进次数'] = true;
        selected['到店客户'] = true;
        selected['成交客户'] = true;
        
        clueNumberChart.setOption( {'legend':{'selected':selected}} );
    }

    $view.on('click','.u-switch span',function(e){
        var $target = $(e.currentTarget);
        var index = $target.attr('data-value');
        
        $target.addClass('active').siblings().removeClass('active');
        if(index == 0){
            clueNumberTable.tabledata = clueNumber;
            clueNumberDetail.detaildata = _datas;
            clueNumberChart.clear();
            clueNumberChart.setOption( util.formatLineOption(clueNumber,sarray,{grid:{bottom:'30%'}}));
            //setSelected();
        }else if(index == 1){
            clueNumberTable.tabledata = cluessNumber;
            clueNumberDetail.detaildata = _datas30;
            clueNumberChart.clear();
            clueNumberChart.setOption(util.formatLineOption(cluessNumber,sarray,{grid:{bottom:'30%'}}));
            //setSelected();
        }
    })
}
clueNumber()

//跟进次数分布
function followup(){
    var followupnumber = _followupnumber;

    var total = 0;
    //对数据进行格式化处理
    followupnumber.series.forEach(function(item,index){
        total = total + Number( item['data'][1] );
        if(index>5){
            followupnumber.series[5]['data'] = util.mergeArray(followupnumber.series[5]['data'],followupnumber.series[index]['data']);
        }
    });
    followupnumber.series.forEach(function(ite,ind){
        ite['data'][2] = Math.round( Number( ite['data'][1] ) / total * 100 );
        ite['data'][3] = ite['data'][2];
    });
    if( followupnumber.series.length > 5 ){
        followupnumber.series[5]['data'][0] = Number( followupnumber.series[4]['data'][0] ) + 1 +"+";
        followupnumber.series = followupnumber.series.slice(0,6);
    }
    
    var follouptable = new Vue({
        "el":'#followuptable',
        "data":followupnumber,
        "computed":{
            'isEmpty':function(){
                if(this.series.length > 0){
                    return false;
                }else{
                    return true;
                }
            }
        }
    });
}
followup()

