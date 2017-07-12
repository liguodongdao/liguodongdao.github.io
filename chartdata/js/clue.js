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

	var util = __webpack_require__(5);
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