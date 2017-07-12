/*! created by 第一车网 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var tablecomponent = __webpack_require__(1);
	var scrolltable = __webpack_require__(3);

	//工具类函数
	var util = __webpack_require__(5);

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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var templatestr = __webpack_require__(2);

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




/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = "<table class=m-commontable> <thead> <tr> <th></th> <th v-for=\"item in data.category.data\">{{item}}</th> <th></th> </tr> </thead> <tbody> <tr v-if=isEmpty> <td v-bind:colspan=\"data.category['data'].length+2\" class=table-empty><p>暂无数据</p></td> </tr> <tr v-else v-for=\"item in data.series\" v-bind:class={active:item.isActive}> <td></td> <td v-for=\"ite in item.data\" v-bind:class=\"{'number':!isNaN(ite)}\">{{ite}}</td> <td></td> </tr> </tbody> </table> ";

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var templatestr = __webpack_require__(4);

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




/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "<div class=m-scrolltable> <div class=table-common v-if=isEmpty> <table> <thead> <tr> <th></th> <th v-for=\"item in data.category.data\">{{item}}</th> <th></th> </tr> </thead> <tbody> <tr> <td v-bind:colspan=\"data.category['data'].length+2\" class=table-empty><p>暂无数据</p></td> </tr> </tbody> </table> </div> <div class=table-content v-else> <div class=table-left> <table> <thead> <tr> <th>{{data.category.data[0]}}</th> </tr> </thead> <tbody> <tr v-for=\"item in data.series\" v-if=item.data[0]><td>{{item.data[0]}}</td></tr> </tbody> </table> </div> <div class=table-right> <table> <thead> <tr> <th v-for=\"item in data.category.data.slice(1)\">{{item}}</th> </tr> </thead> <tbody> <tr v-for=\"item in data.series\" v-if=\"item.data.length>0\"> <td v-for=\"ite in item.data.slice(1)\" v-bind:class=\"{'number':!isNaN(ite)}\">{{ite}}</td> </tr> </tbody> </table> </div> </div> </div> ";

/***/ },
/* 5 */
/***/ function(module, exports) {

	//设置echarts的主题
	//===============================
	if(echarts){
	    var colorPalette = [
	        '#979bff','#f35959','#945454','#56c69e','#fa9e4b',
	        '#60c7d0','#6b8ab8','#5760e9','#2fb7e7','#ff8e8e',
	        '#c2c2c2'];
	    var theme = {
	        color: colorPalette,
	        title: {
	            textStyle: {
	                fontWeight: 'normal',
	                color: '#008acd'
	            }
	        },

	        visualMap: {
	            itemWidth: 15,
	            color: ['#5ab1ef','#e0ffff']
	        },

	        toolbox: {
	            iconStyle: {
	                normal: {
	                    borderColor: colorPalette[0]
	                }
	            }
	        },

	        tooltip: {
	            backgroundColor: 'rgba(50,50,50,0.5)',
	            axisPointer : {
	                type : 'line',
	                lineStyle : {
	                    color: '#008acd'
	                },
	                crossStyle: {
	                    color: '#008acd'
	                },
	                shadowStyle : {
	                    color: 'rgba(200,200,200,0.2)'
	                }
	            }
	        },

	        dataZoom: {
	            dataBackgroundColor: '#efefff',
	            fillerColor: 'rgba(182,162,222,0.2)',
	            handleColor: '#008acd'
	        },

	        grid: {
	            borderColor: '#eee'
	        },

	        categoryAxis: {
	            axisLine: {
	                lineStyle: {
	                    color: '#008acd'
	                }
	            },
	            splitLine: {
	                lineStyle: {
	                    color: ['#eee']
	                }
	            }
	        },

	        valueAxis: {
	            axisLine: {
	                lineStyle: {
	                    color: '#008acd'
	                }
	            },
	            splitArea : {
	                show : true,
	                areaStyle : {
	                    color: ['rgba(250,250,250,0.1)','rgba(200,200,200,0.1)']
	                }
	            },
	            splitLine: {
	                lineStyle: {
	                    color: ['#eee']
	                }
	            }
	        },

	        timeline : {
	            lineStyle : {
	                color : '#008acd'
	            },
	            controlStyle : {
	                normal : { color : '#008acd'},
	                emphasis : { color : '#008acd'}
	            },
	            symbol : 'emptyCircle',
	            symbolSize : 3
	        },

	        line: {
	            smooth : true,
	            symbol: 'emptyCircle',
	            symbolSize: 3
	        },

	        candlestick: {
	            itemStyle: {
	                normal: {
	                    color: '#d87a80',
	                    color0: '#2ec7c9',
	                    lineStyle: {
	                        color: '#d87a80',
	                        color0: '#2ec7c9'
	                    }
	                }
	            }
	        },

	        scatter: {
	            symbol: 'circle',
	            symbolSize: 4
	        },

	        map: {
	            label: {
	                normal: {
	                    textStyle: {
	                        color: '#d87a80'
	                    }
	                }
	            },
	            itemStyle: {
	                normal: {
	                    borderColor: '#eee',
	                    areaColor: '#ddd'
	                },
	                emphasis: {
	                    areaColor: '#fe994e'
	                }
	            }
	        },

	        graph: {
	            color: colorPalette
	        },

	        gauge : {
	            axisLine: {
	                lineStyle: {
	                    color: [[0.2, '#2ec7c9'],[0.8, '#5ab1ef'],[1, '#d87a80']],
	                    width: 10
	                }
	            },
	            axisTick: {
	                splitNumber: 10,
	                length :15,
	                lineStyle: {
	                    color: 'auto'
	                }
	            },
	            splitLine: {
	                length :22,
	                lineStyle: {
	                    color: 'auto'
	                }
	            },
	            pointer : {
	                width : 5
	            }
	        }
	    };
	    echarts.registerTheme('default', theme);
	}

	var $body = $('body')
	var bodyWidth = $body.width();
	var fontSize = bodyWidth/320*12*0.6;
	if(fontSize>14){
	    fontSize = 14;
	}

	//
	// 对Date的扩展，将 Date 转化为指定格式的String
	// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
	// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
	// 例子： 
	// (new Date())._format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
	// (new Date())._format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
	//日期格式化
	//===============================
	Date.prototype._format = function (fmt) { //author: meizz 
	    var o = {
	        "M+": this.getMonth() + 1, //月份 
	        "d+": this.getDate(), //日 
	        "h+": this.getHours(), //小时 
	        "m+": this.getMinutes(), //分 
	        "s+": this.getSeconds(), //秒 
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	        "S": this.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	};

	//
	//显示页面高度
	//===============================
	function showHeight(){
	    setTimeout(function(){
	        var height = $('body').height();
	        $('body').attr('data-height',height);
	    },100)
	}
	showHeight();

	//饼状图 通用方法 
	//从table数据转化为 饼图需要的数据
	//================================
	function formatPieOption(data,nameIndex,valueIndex){
	    var defaultOption = {
	        title:{
	            'x':'center',
	            'show': false,
	            'text': data.category.data[valueIndex],
	            'textStyle':{
	                'fontSize': fontSize,
	                'color':'#666'
	            }
	        },
	        tooltip: {
	            show: false,
	            trigger: 'item',
	            formatter: "{b}<br/>{c}&nbsp;&nbsp;占比({d}%)"
	        },
	        legend: {
	            orient: 'horizontal',
	            bottom: 'bottom',
	            data:[],
	            textStyle:{
	                'fontSize':fontSize
	            }
	        },
	        grid: {
	            top:'4%',
	            left: '4%',
	            right: '4%',
	            bottom: '15%',
	            containLabel: true
	        },
	        series: [
	            {
	                type:'pie',
	                radius: ['40%', '60%'],
	                center:['50%','40%'],
	                avoidLabelOverlap: false,
	                label:{
	                    'normal':{
	                        'show': false,
	                        'position':'center',
	                        'formatter':'{b}\t({c})\n占比\t({d}%)',
	                        'textStyle':{
	                            'fontSize':fontSize,
	                            'fontWeight':'normal',
	                            'lineHeight': 1.5
	                        }
	                    },
	                    'emphasis': {
	                        show: true,
	                        textStyle: {
	                            fontSize: fontSize,
	                            fontWeight: 'bold'
	                        }
	                    }
	                },
	                labelLine:{
	                    'normal':{
	                        'show': true
	                    }
	                },
	                data:[]
	            }
	        ]
	    };
	    var legenddata = [];
	    var seriesdata = [];

	    data.series.forEach(function(item,index){
	        legenddata.push(item['data'][nameIndex]);
	        if( index == 0 ){
	            seriesdata.push({value:item['data'][valueIndex],name:item['data'][nameIndex]});
	        }else{
	            seriesdata.push({value:item['data'][valueIndex],name:item['data'][nameIndex]});
	        }
	    });
	    defaultOption.legend.data = legenddata;
	    defaultOption.series[0].data = seriesdata;
	    return defaultOption;
	}

	//折线图 通用方法
	//从table数据转化为 折线图需要的数据
	//================================
	function formatLineOption(data,array,options){
	    options = options || {};
	    var defaultOption = {
	        tooltip: {
	            trigger: 'axis'
	        },
	        legend: {
	            orient: 'horizontal',
	            bottom:'bottom',
	            data:[],
	            textStyle:{
	                'fontSize':fontSize
	            }
	        },
	        grid: {
	            top:'4%',
	            left: '4%',
	            right: '4%',
	            bottom: '15%',
	            containLabel: true
	        },
	        xAxis: {
	            type: 'category',
	            boundaryGap: false,
	            data: []
	        },
	        yAxis: {
	            type: 'value'
	        },
	        series: []
	    };
	    defaultOption = $.extend(true,defaultOption,options);

	    var legenddata=[];
	    var xaxisdata = [];
	    var seriesdata = []
	    for(var i=0;i<array.length;i++){
	        legenddata.push( data.category['data'][array[i]] );
	        seriesdata.push({
	            name:data.category.data[array[i]],
	            type:'line',
	            symbolSize: 5,
	            data:[]
	        });
	    }
	    data.series.forEach(function(item,index){
	        xaxisdata.push( item.data[0].slice(5) );
	        for(var i=0;i<array.length;i++){
	            seriesdata[i].data.push(item.data[array[i]])
	        }
	    });
	    
	    //进行坐标轴和数据的转置
	    xaxisdata = xaxisdata.reverse();
	    seriesdata.forEach(function(item,index){
	        item.data = item.data.reverse();
	    });

	    defaultOption.legend.data = legenddata;
	    defaultOption.xAxis.data = xaxisdata;
	    defaultOption.series = seriesdata;
	    return defaultOption;
	}

	//横向柱状图 通用方法
	//从table数据转化为 柱状图需要的数据
	//===============================
	function formatBarOption(array,nameindex,valueindex){
	    var data = array[0];
	    var option = {
	        tooltip:{
	            trigger:'axis',
	            axisPointer:{
	                type:'shadow'
	            }
	        },
	        legend:{
	            data:[],
	            bottom:5
	        },
	        grid:{
	            left:'3%',
	            right:'4%',
	            top:'3%',
	            containLabel:true
	        },
	        xAxis:{
	            type:'value',
	            boundaryGap:[0, 0.01]
	        },
	        yAxis:{
	            type:'category',
	            data:[]
	        },
	        series:[
	            /*
	            {
	                name:'2011年',
	                type:'bar',
	                data:[18203, 23489, 29034, 104970, 131744, 630230]
	            },
	            {
	                name:'2012年',
	                type:'bar',
	                data:[19325, 23438, 31000, 121594, 134141, 681807]
	            }
	            */
	        ]
	    };
	    data.series.forEach(function(item,index){
	        option.yAxis.data.push(item['data'][nameindex]);
	    });
	    for( var i=0; i<array.length; i++ ){
	        option.legend.data.push(array[i]['name']);
	        var section = {
	            name:array[i]['name'],
	            type:'bar',
	            data:[]
	        }
	        array[i]['series'].forEach(function(item,index){
	            section['data'].push(item['data'][valueindex])
	        });
	        option.series.push(section);
	    }
	    return option;
	}

	//将表格数据的 数据四舍五入为某一位
	//================================
	function formatFixed( tabledata , fixednumber ){

	    fixednumber = fixednumber || 0;
	    tabledata.series.forEach(function(item,index){
	        item.data.forEach(function(ite,ind){
	            //判断是否是数字
	            if(!isNaN(ite)){
	                item.data[ind] = ite.toFixed(fixednumber);
	            }
	        })
	    });
	    return tabledata;
	}

	//
	//table数据 四舍五入
	//===============================
	function formatRound( tabledata ){
	    var tabledata = clone(tabledata);
	    tabledata.series.forEach(function(item){
	        item.data.forEach(function(ite,ind){
	            if(!isNaN(ite)){
	                item.data[ind] = Math.round(ite);
	            }
	        })
	    });
	    return tabledata;
	}

	//
	//将table数组中所有的字符串类型转化为数字类型
	//======================================
	function formatNumber( tabledata ){
	    var tabledata = clone(tabledata);
	    tabledata.series.forEach(function(item){
	        item.data.forEach(function(ite,ind){
	            if(!isNaN(ite)){
	                item.data[ind] = Number(ite);
	            }
	        })
	    });
	    return tabledata;
	}

	//
	//将table数组中所有数字 转化为 数字+%
	//====================================
	function formatNumberPercent( tabledata ){
	    var tabledata = clone(tabledata);
	    tabledata.series.forEach(function(item){
	        item.data.forEach(function(ite,ind){
	            if(!isNaN(ite)){
	                item.data[ind] = ite + '%';
	            }
	        })
	    })
	    return tabledata;
	}

	//
	//合并两个数组 (两个数组相同位置的元素相加)
	//=========================================
	function mergeArray(arraya,arrayb){
	    var arrayc = arraya.map(function(v, i){
	        if(!isNaN(v)){
	            v = Number(v);
	        }
	        return v + (arrayb[i] || 0);
	    });
	    return arrayc;
	}

	//展示提示内容
	//=======================
	var promptStr = "<div class='g-prompt'></div>";
	function showPrompt(text,duration){
	    duration = duration || 2000;
	    var $view = $( promptStr );
	    $view.text( text );

	    $body.append( $view );
	    setTimeout(function(){
	        $view.remove();
	    },duration);
	};

	//复制内容
	//======================
	function clone(obj){
	    return JSON.parse(JSON.stringify(obj));
	};

	//获取shopid param
	function getParam( name ){
	   return location.href.match(new RegExp('[?&]' + name + '=([^?&]+)', 'i')) ? decodeURIComponent(RegExp.$1) : '';
	};


	var util = {};
	util.formatPieOption = formatPieOption;
	util.formatLineOption = formatLineOption;
	util.formatBarOption = formatBarOption;
	util.formatFixed = formatFixed;
	util.formatRound = formatRound;
	util.formatNumber = formatNumber;
	util.formatNumberPercent = formatNumberPercent;
	util.showPrompt = showPrompt;
	util.mergeArray = mergeArray;
	util.clone = clone;
	util.getParam = getParam;
	module.exports = util;
	    

/***/ }
/******/ ]);