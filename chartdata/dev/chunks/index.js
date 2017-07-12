var tablecomponent = require('./component/common_table.js');
var scrolltable = require('./component/scroll_table.js');

//工具类函数
var util = require('./common.js');

//
var bodyWidth = $('body').width();
var fontSize = bodyWidth/320*12*0.6;
if(fontSize>14){
    fontSize = 14;
}

//库存分布
//=====================
function kucunfb(){
    var fbdata = _kcfbdata;          //品牌数据
    var fbcxdata = _kcfbcxdata;      //车系数据
    var $view = $('#kcfb');

    var fbseries = _kcfbdata.series;
    var fbcxseries = _kcfbcxdata.series;

    var newfbseries = [];
    var newfbcxseries = [];

    //进行数据格式化 如果行数大于10 所有品牌合并为其他
    if( fbseries.length > 10){
        newfbseries = fbseries.slice( 0,10 );
        
        for(var i = 10;i<fbseries.length;i++){
            newfbseries[9]['data'].forEach(function( item,index ){
                if( index > 1 ){
                    newfbseries[9]['data'][index] = Number(newfbseries[9]['data'][index]) + Number(fbseries[i]['data'][index]);
                }
            });
        }
        newfbseries[9]['data'][1]="其他";
    }else{
        newfbseries = fbseries;
    }
    //
    if( fbcxseries.length > 10){
        newfbcxseries = fbcxseries.slice(0,10);
        for(var i = 10;i<fbcxseries.length;i++){
            newfbcxseries[9]['data'].forEach(function( item,index ){
                if( index > 1){
                    newfbcxseries[9]['data'][index] = Number(newfbcxseries[9]['data'][index]) + Number(fbcxseries[i]['data'][index]);
                }
            })
        }
        newfbcxseries[9]['data'][1]="其他";
        newfbcxseries[9]['data'][2]="其他";
    }else{
        newfbcxseries = fbcxseries;
    }

    fbdata.series = newfbseries;
    fbcxdata.series = newfbcxseries;

    //数据四舍五入
    util.formatRound( fbdata );
    util.formatRound( fbcxdata );

    var fbtable = new Vue({
        el:'#fbtable',
        data:{
            'tabledata':fbdata
        }
    });
    var fbchart = echarts.init($('#fbchart')[0],'default');

    function isEmpty( datas ){
        //console.log( datas )
        try{
            if( datas.series[0].data.length <= 0 ){
                $('#fbchart').hide();
            }else{
                $('#fbchart').show();
            }
        }catch(err){

        }
    }
  
    fbchart.setOption( util.formatPieOption(fbdata,1,2) );
    setTimeout(function(){
        console.log('dodododo')
         fbchart.dispatchAction({
            type: 'pieSelect',
            dataIndex: 2,
        })
    },2000)
   

    isEmpty(  util.formatPieOption(fbdata,1,2) );
    $view.on('click','.u-toggle span',function(e){
        var $target = $(e.currentTarget);
        var index = $target.attr('data-value');
        
        $target.addClass('active').siblings().removeClass('active');
        if(index == 0){
            fbtable.tabledata = fbdata;
            fbchart.clear();
            fbchart.setOption( util.formatPieOption(fbdata,1,2) );
            isEmpty(  util.formatPieOption(fbdata,1,2) );
        }else if(index == 1){
            fbtable.tabledata = fbcxdata;
            fbchart.clear();
            fbchart.setOption( util.formatPieOption(fbcxdata,2,3) );
            isEmpty(  util.formatPieOption(fbcxdata,2,3) );
        }
    })

}
kucunfb();

//库存数据和库存走势
//=======================
function kucunzs(){
    var zsdata = _kczsdata;         //库存走势近7天
    var zsssdata = _kczsssdata;     //库存走势近30天
    var $view = $('#kczs');         //

    var dataNumber = new Vue({
        el:'#kcdata',
        data:{
            'number':_data7
        }
    })

    var zstable = new Vue({
        el:'#zstable',
        data:{
            'tabledata':zsdata
        }
    });
    var zschart = echarts.init($('#zschart')[0],'default')
    //根据data格式化line配置数据
    zschart.setOption( util.formatLineOption(zsdata,[1,2,3]) );
    $('#kcdata').on('click','.u-switch span',function(e){
        var $target = $(e.currentTarget);
        var index = $target.attr('data-value');

        $target.addClass('active').siblings().removeClass('active');
        if(index == 0){
            zstable.tabledata = zsdata;
            dataNumber.number = _data7;
            zschart.clear();
            zschart.setOption( util.formatLineOption(zsdata,[1,2,3]) );
            zschart.setOption({
                'legend':{
                    'selected': selected
                }
            });
        }else if(index == 1){
            zstable.tabledata = zsssdata;
            dataNumber.number = _data30;
            zschart.clear();
            zschart.setOption( util.formatLineOption(zsssdata,[1,2,3]) );
            zschart.setOption({
                'legend':{
                    'selected': selected
                }
            });
        }
    })

    var selected = {};
    selected['本市在售'] = false;
    //本市在售默认不画出
    zschart.setOption({
        'legend':{
            'selected': selected
        }
    });
}
kucunzs();

//价格分布
//======================
function jgfb(){

    //数据格式化处理
    var jgdata = _jgdata;
    var basicSeries = [
        {"data":["3万以下",0,0]},
        {"data":["3-5万",0,0]},
        {"data":["5-8万",0,0]},
        {"data":["8-12万",0,0]},
        {"data":["12-15万",0,0]},
        {"data":["15-20万",0,0]},
        {"data":["20-25万",0,0]},
        {"data":["25-35万",0,0]},
        {"data":["35-50万",0,0]},
        {"data":["50万以上",0,0]},
    ];

    jgdata.series.forEach(function(item,index){
        if(item['data'][0]<3){
            basicSeries[0]['data'][1] = basicSeries[0]['data'][1]+ Number(item['data'][1])
            basicSeries[0]['data'][2] = basicSeries[0]['data'][2]+ Number(item['data'][2])
        }else if(item['data'][0]>=3 && item['data'][0]<5){
            basicSeries[1]['data'][1] = basicSeries[1]['data'][1]+ Number(item['data'][1])
            basicSeries[1]['data'][2] = basicSeries[1]['data'][2]+ Number(item['data'][2])
        }else if(item['data'][0]>=5 && item['data'][0]<8){
            basicSeries[2]['data'][1] = basicSeries[2]['data'][1]+ Number(item['data'][1])
            basicSeries[2]['data'][2] = basicSeries[2]['data'][2]+ Number(item['data'][2])
        }else if(item['data'][0]>=8 && item['data'][0]<12){
            basicSeries[3]['data'][1] = basicSeries[3]['data'][1]+ Number(item['data'][1])
            basicSeries[3]['data'][2] = basicSeries[3]['data'][2]+ Number(item['data'][2])
        }else if(item['data'][0]>=12 && item['data'][0]<15){
            basicSeries[4]['data'][1] = basicSeries[4]['data'][1]+ Number(item['data'][1])
            basicSeries[4]['data'][2] = basicSeries[4]['data'][2]+ Number(item['data'][2])
        }else if(item['data'][0]>=15 && item['data'][0]<20){
            basicSeries[5]['data'][1] = basicSeries[5]['data'][1]+ Number(item['data'][1])
            basicSeries[5]['data'][2] = basicSeries[5]['data'][2]+ Number(item['data'][2])
        }else if(item['data'][0]>=20 && item['data'][0]<25){
            basicSeries[6]['data'][1] = basicSeries[6]['data'][1]+ Number(item['data'][1])
            basicSeries[6]['data'][2] = basicSeries[6]['data'][2]+ Number(item['data'][2])
        }else if(item['data'][0]>=25 && item['data'][0]<35){
            basicSeries[7]['data'][1] = basicSeries[7]['data'][1]+ Number(item['data'][1])
            basicSeries[7]['data'][2] = basicSeries[7]['data'][2]+ Number(item['data'][2])
        }else if(item['data'][0]>=35 && item['data'][0]<50){
            basicSeries[8]['data'][1] = basicSeries[8]['data'][1]+ Number(item['data'][1])
            basicSeries[8]['data'][2] = basicSeries[8]['data'][2]+ Number(item['data'][2])
        }else if(item['data'][0]>=50){
            basicSeries[9]['data'][1] = basicSeries[9]['data'][1]+ Number(item['data'][1])
            basicSeries[9]['data'][2] = basicSeries[9]['data'][2]+ Number(item['data'][2])
        }
    });
    var series = [];
    var index = 1;
    basicSeries.forEach(function(item){
        if(item['data'][1]!=0){
            item['data'].unshift(index);
            series.push(item);
            index = index + 1;
        }
    });
    jgdata.series = series;

    var jgchart = echarts.init($('#jgfbchart')[0],'default');
    jgchart.setOption( util.formatPieOption(jgdata,1,2) );
    var jgtable = new Vue({
        el:'#jgfbtable',
        data:{
            'tabledata': jgdata
        }
    })
}
jgfb();

//车龄分布
//======================

function clfb(){

    //数据格式化处理
    var jgdata = _cldata;
    var basicSeries = [
        {"data":["1年以内",0,0]},
        {"data":["1-3年",0,0]},
        {"data":["3-5年",0,0]},
        {"data":["5-8年",0,0]},
        {"data":["8-10年",0,0]},
        {"data":["10年及以上",0,0]}
    ];

    jgdata.series.forEach(function(item,index){
        if(item['data'][0]<1){
            basicSeries[0]['data'][1] = basicSeries[0]['data'][1]+ Number(item['data'][1])
            basicSeries[0]['data'][2] = basicSeries[0]['data'][2]+ Number(item['data'][2])
        }else if(item['data'][0]>=1 && item['data'][0]<3){
            basicSeries[1]['data'][1] = basicSeries[1]['data'][1]+ Number(item['data'][1])
            basicSeries[1]['data'][2] = basicSeries[1]['data'][2]+ Number(item['data'][2])
        }else if(item['data'][0]>=3 && item['data'][0]<5){
            basicSeries[2]['data'][1] = basicSeries[2]['data'][1]+ Number(item['data'][1])
            basicSeries[2]['data'][2] = basicSeries[2]['data'][2]+ Number(item['data'][2])
        }else if(item['data'][0]>=5 && item['data'][0]<8){
            basicSeries[3]['data'][1] = basicSeries[3]['data'][1]+ Number(item['data'][1])
            basicSeries[3]['data'][2] = basicSeries[3]['data'][2]+ Number(item['data'][2])
        }else if(item['data'][0]>=8 && item['data'][0]<10){
            basicSeries[4]['data'][1] = basicSeries[4]['data'][1]+ Number(item['data'][1])
            basicSeries[4]['data'][2] = basicSeries[4]['data'][2]+ Number(item['data'][2])
        }else if(item['data'][0]>=10){
            basicSeries[5]['data'][1] = basicSeries[5]['data'][1]+ Number(item['data'][1])
            basicSeries[5]['data'][2] = basicSeries[5]['data'][2]+ Number(item['data'][2])
        }
    });

    var series = [];
    var index = 1;
    basicSeries.forEach(function(item){
        if(item['data'][1]!=0){
            item['data'].unshift(index);
            series.push(item);
            index = index+1;
        }
    });
    jgdata.series = series;

    var jgchart = echarts.init($('#clfbchart')[0],'default');
    jgchart.setOption( util.formatPieOption(jgdata,1,2) );
    var jgtable = new Vue({
        el:'#clfbtable',
        data:{
            'tabledata': jgdata
        }
    })
}

clfb();

//里程分布
//======================

function lcfb(){

    //数据格式化处理
    var jgdata = _lcdata;
    var basicSeries = [
        {"data":["1万公里以内",0,0]},
        {"data":["1-3万公里",0,0]},
        {"data":["3-6万公里",0,0]},
        {"data":["6-10万公里",0,0]},
        {"data":["10-15万公里",0,0]},
        {"data":["15-20万公里",0,0]},
        {"data":["20万公里以上",0,0]}
    ];

    jgdata.series.forEach(function(item,index){
        if(item['data'][0]<1){
            basicSeries[0]['data'][1] = basicSeries[0]['data'][1]+ Number(item['data'][1])
            basicSeries[0]['data'][2] = basicSeries[0]['data'][2]+ Number(item['data'][2])
        }else if(item['data'][0]>=1 && item['data'][0]<3){
            basicSeries[1]['data'][1] = basicSeries[1]['data'][1]+ Number(item['data'][1])
            basicSeries[1]['data'][2] = basicSeries[1]['data'][2]+ Number(item['data'][2])
        }else if(item['data'][0]>=3 && item['data'][0]<6){
            basicSeries[2]['data'][1] = basicSeries[2]['data'][1]+ Number(item['data'][1])
            basicSeries[2]['data'][2] = basicSeries[2]['data'][2]+ Number(item['data'][2])
        }else if(item['data'][0]>=6 && item['data'][0]<10){
            basicSeries[3]['data'][1] = basicSeries[3]['data'][1]+ Number(item['data'][1])
            basicSeries[3]['data'][2] = basicSeries[3]['data'][2]+ Number(item['data'][2])
        }else if(item['data'][0]>=10 && item['data'][0]<15){
            basicSeries[4]['data'][1] = basicSeries[4]['data'][1]+ Number(item['data'][1])
            basicSeries[4]['data'][2] = basicSeries[4]['data'][2]+ Number(item['data'][2])
        }else if(item['data'][0]>=15 && item['data'][0]<20){
            basicSeries[5]['data'][1] = basicSeries[5]['data'][1]+ Number(item['data'][1])
            basicSeries[5]['data'][2] = basicSeries[5]['data'][2]+ Number(item['data'][2])
        }else{
            basicSeries[6]['data'][1] = basicSeries[6]['data'][1]+ Number(item['data'][1])
            basicSeries[6]['data'][2] = basicSeries[6]['data'][2]+ Number(item['data'][2])
        }
    });
    var series = [];
    var index = 1;
    basicSeries.forEach(function(item){
        if(item['data'][1]!=0){
            item['data'].unshift(index);
            series.push(item);
            index = index + 1;
        }
    });
    jgdata.series = series;

    var jgchart = echarts.init($('#lcfbchart')[0],'default');
    jgchart.setOption( util.formatPieOption(jgdata,1,2) );
    var jgtable = new Vue({
        el:'#lcfbtable',
        data:{
            'tabledata': jgdata
        }
    })
}

lcfb();

//周转率
//============================
function zzl(){
    var zzldata = util.formatNumber(_zzldata);     //周转率车源
    var zzlzjdata = util.formatNumber(_zzlzjdata); //周转率资金
    var $view = $('#zzl');      //周转率view

    var zzldatapercent = util.formatNumberPercent(_zzldata);      //
    var zzlzjdatapercent = util.formatNumberPercent(_zzlzjdata);  //

    var zzltable = new Vue({
        el:'#zzltable',
        data:{
            'tabledata':zzldata
        }
    })
    var zzlchart = echarts.init($('#zzlchart')[0],'default')
    //根据data格式化Bar配置数据
    function formatBarOption(data){
        var defaultOption = {
            tooltip : {
                trigger: 'axis'
            },
            calculable : true,
            legend: {
                orient: 'horizontal',
                bottom:'bottom',
                data:[data.category.data[1],data.category.data[2]],
                textStyle:{
                    'fontSize':fontSize
                }
            },
            grid: {
                top:'2%',
                left: '3%',
                right: '4%',
                bottom: '15%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : []
                }
            ],
            yAxis : {
                axisLabel: {
                    formatter: function (val) {
                        return val + '%';
                    }
                }
            },
            series : [
                {
                    name:data.category.data[1],
                    type:'bar',
                    data:[]
                },
                {
                    name:data.category.data[2],
                    type:'bar',
                    data:[]
                }
            ]
        }
        //遍历数据
        data.series.forEach(function( item,index ){
            defaultOption.xAxis[0]['data'].push( item['data'][0].slice(5) );
            defaultOption.series[0]['data'].push( item['data'][1] );
            defaultOption.series[1]['data'].push( item['data'][2] );
        });

        return defaultOption;
    }
    zzlchart.setOption( formatBarOption(zzldata) );

    $view.on('click','.u-toggle span',function(e){
        var $target = $(e.currentTarget);
        var index = $target.attr('data-value');

        $target.addClass('active').siblings().removeClass('active');
        if(index == 0){
            zzltable.tabledata = zzldatapercent;
            zzlchart.setOption( formatBarOption(zzldata) );
        }else if(index == 1){
            zzltable.tabledata = zzlzjdatapercent;
            zzlchart.setOption( formatBarOption(zzlzjdata) );
        }
    });
}
zzl();

//北京市二手车库存效率排行榜
//=============================
function kcxl(){
    var kcxldata = _kcxldata;
    //格式化表格数据
    function formatTableData(data){
        var baseShopId = data.series[0]['shopid'];
        var sameindex;
        data.series.forEach(function(item,index){
            if( index == 0){
                return;
            }else if(item.shopid == baseShopId){
                sameindex = index;
            }
        })
        //
        if(sameindex){
            data.series[0]['isActive'] = true;
            data.series[sameindex]['isActive'] = true;
        }
        return data;
    }
    var formatdata = formatTableData(kcxldata);
    console.log( formatdata );
    var kcxltable = new Vue({
        el:'#kcxltable',
        data:{
            'tabledata':formatdata
        }
    })
}
//kcxl();
