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

	var scrolltable = __webpack_require__(3);
	var labelselect = __webpack_require__(6);
	var zeptodate = __webpack_require__(8);

	var util = __webpack_require__(5);

	//详情图表
	function stockDetail(){

	    $('[name="enddate"]').val( (new Date())._format('yyyy-MM-d') );

	    var earlydate = new Date('2017-01-1');
	    var basicdate = new Date( new Date().getTime() - (90*24*60*60*1000) );
	    if( basicdate.getTime() < earlydate.getTime() ){
	        $('[name="startdate"]').val( earlydate._format('yyyy-MM-d') );
	    }else{
	        $('[name="startdate"]').val( basicdate._format('yyyy-MM-d') );
	    }

	    //
		//var stockdata = _stockData;
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
		})
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
	        var selected = {};
	        datas.category.data.forEach(function(item,index){
	            if( index > 4 ){
	                selected[item] = false;
	            } else {
	                selected[item] = true;
	            }
	        })
	        stockchart.setOption({'legend':{'selected':selected}});
	    }

	    //refresh(stockdata);

	    //获取labels
	    /*
	    var labels = [];
	    stockdata.category.data.slice(1).forEach(function(item,index){
	        labels.push({
	            'active':false,
	            'name':item
	        })
	    });
	    labels[0]['active'] = true;
	    labels[1]['active'] = true;
	    labels[2]['active'] = true;
	    
	    //指标选择控制器
	    var selectlabel = new Vue({
	        'el':'#selectlabel',
	        'data':{
	            'labels':labels,
	            'isShow':false,
	            'iarray':[0,1,2]
	        },
	        'methods':{
	            'sure':function(){
	                this.$emit('selectlabel');
	                this.isShow = false;
	            },
	            'cancel':function(){
	                this.isShow = false;
	            }
	        }
	    })
	    selectlabel.$on('selectlabel',function(){
	        var array = [];
	        selectlabel.labels.forEach(function(item,index){
	            if(item.active){
	                array.push(index+1);
	            }
	        })
	        stockchart.clear()
	        stockchart.setOption( util.formatLineOption(stockdata,array) );
	    });
	    */
	    //请求初始化数据
	    function getAjaxData(){
	        var startstr = $('[name="startdate"]').val();
	        var endstr = $('[name="enddate"]').val();

	        $.ajax({
	            'type':'get',
	            'url':'/shopapp/shopStock/ajaxTrendByShop',
	            'data':{
	                'startdate': startstr,
	                'enddate': endstr,
	                'shop_id': util.getParam('shop_id'),
	                'app_key': util.getParam('app_key')
	            },
	            'success': function( data ){
	                var data = JSON.parse(data);
	                refresh( data );
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
	stockDetail();





/***/ },
/* 1 */,
/* 2 */,
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
	    

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var templatestr = __webpack_require__(7);

	//注册labelselect组件
	Vue.component('labelselect',{
		template: templatestr,
		props:['labels','show','iarray'],
		computed:{
			'showModal':function(){
				if(this.show){
					return "table";
				}else{
					return "none";
				}
			}
		},
		methods:{
			//判断initarray中是否有某个值
			'getIndex':function( number ){
				for(var i=0;i<this.iarray.length;i++){
					if( this.iarray[i] == number ){
						return i;
					}
				}
				return false;
			},
			//
			'select':function(num){
				if( this.labels[num].active ){
					var index = this.getIndex(num);
					this.iarray.splice(index,1);
				}else{
					this.iarray.push(num);
				}
				this.labels[num].active = !this.labels[num].active;
				
				if(this.iarray.length>4){
					var newnum = this.iarray.shift();
					this.labels[newnum].active = false;
				}
			}
		}
	});




/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "<div class=m-modalmask v-bind:style={display:showModal}> <div class=modalmask-wrapper> <div class=modal-box> <div class=modal-header> <h3>请选择您想要查阅的指标曲线</h3> </div> <div class=modal-body> <div class=m-selectlabel> <p>最多可选4项</p> <ul> <li v-for=\"(item,index) in labels\" v-bind:class={active:item.active} v-on:click=select(index)>{{item.name}}</li> </ul> </div> </div> <div class=modal-footer> <button class=btn-cancel v-on:click=\"$emit('cancel')\">取消</button> <button class=btn-sure v-on:click=\"$emit('sure')\">确定</button> </div> </div> </div> </div>";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* 
	 * 日期插件
	 * 滑动选取日期（年，月，日）
	 * V1.2
	 */

	//滑动设置
	(function(){
	    var m=Math,mround=function(r){return r>>0;},vendor=(/webkit/i).test(navigator.appVersion)?'webkit':(/firefox/i).test(navigator.userAgent)?'Moz':'opera'in window?'O':'',isAndroid=(/android/gi).test(navigator.appVersion),isIDevice=(/iphone|ipad/gi).test(navigator.appVersion),isPlaybook=(/playbook/gi).test(navigator.appVersion),isTouchPad=(/hp-tablet/gi).test(navigator.appVersion),has3d='WebKitCSSMatrix'in window&&'m11'in new WebKitCSSMatrix(),hasTouch='ontouchstart'in window&&!isTouchPad,hasTransform=vendor+'Transform'in document.documentElement.style,hasTransitionEnd=isIDevice||isPlaybook,nextFrame=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){return setTimeout(callback,1);}})(),cancelFrame=(function(){return window.cancelRequestAnimationFrame||window.webkitCancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||clearTimeout})(),RESIZE_EV='onorientationchange'in window?'orientationchange':'resize',START_EV=hasTouch?'touchstart':'mousedown',MOVE_EV=hasTouch?'touchmove':'mousemove',END_EV=hasTouch?'touchend':'mouseup',CANCEL_EV=hasTouch?'touchcancel':'mouseup',WHEEL_EV=vendor=='Moz'?'DOMMouseScroll':'mousewheel',trnOpen='translate'+(has3d?'3d(':'('),trnClose=has3d?',0)':')',iScroll=function(el,options){var that=this,doc=document,i;that.wrapper=typeof el=='object'?el:doc.getElementById(el);that.wrapper.style.overflow='hidden';that.scroller=that.wrapper.children[0];that.options={hScroll:true,vScroll:true,x:0,y:0,bounce:true,bounceLock:false,momentum:true,lockDirection:true,useTransform:true,useTransition:false,topOffset:0,checkDOMChanges:false,hScrollbar:true,vScrollbar:true,fixedScrollbar:isAndroid,hideScrollbar:isIDevice,fadeScrollbar:isIDevice&&has3d,scrollbarClass:'',zoom:false,zoomMin:1,zoomMax:4,doubleTapZoom:2,wheelAction:'scroll',snap:false,snapThreshold:1,onRefresh:null,onBeforeScrollStart:function(e){e.preventDefault();},onScrollStart:null,onBeforeScrollMove:null,onScrollMove:null,onBeforeScrollEnd:null,onScrollEnd:null,onTouchEnd:null,onDestroy:null,onZoomStart:null,onZoom:null,onZoomEnd:null};for(i in options)that.options[i]=options[i];that.x=that.options.x;that.y=that.options.y;that.options.useTransform=hasTransform?that.options.useTransform:false;that.options.hScrollbar=that.options.hScroll&&that.options.hScrollbar;that.options.vScrollbar=that.options.vScroll&&that.options.vScrollbar;that.options.zoom=that.options.useTransform&&that.options.zoom;that.options.useTransition=hasTransitionEnd&&that.options.useTransition;if(that.options.zoom&&isAndroid){trnOpen='translate(';trnClose=')';}
	    that.scroller.style[vendor+'TransitionProperty']=that.options.useTransform?'-'+vendor.toLowerCase()+'-transform':'top left';that.scroller.style[vendor+'TransitionDuration']='0';that.scroller.style[vendor+'TransformOrigin']='0 0';if(that.options.useTransition)that.scroller.style[vendor+'TransitionTimingFunction']='cubic-bezier(0.33,0.66,0.66,1)';if(that.options.useTransform)that.scroller.style[vendor+'Transform']=trnOpen+that.x+'px,'+that.y+'px'+trnClose;else that.scroller.style.cssText+=';position:absolute;top:'+that.y+'px;left:'+that.x+'px';if(that.options.useTransition)that.options.fixedScrollbar=true;that.refresh();that._bind(RESIZE_EV,window);that._bind(START_EV);if(!hasTouch){that._bind('mouseout',that.wrapper);if(that.options.wheelAction!='none')
	        that._bind(WHEEL_EV);}
	    if(that.options.checkDOMChanges)that.checkDOMTime=setInterval(function(){that._checkDOMChanges();},500);};iScroll.prototype={enabled:true,x:0,y:0,steps:[],scale:1,currPageX:0,currPageY:0,pagesX:[],pagesY:[],aniTime:null,wheelZoomCount:0,handleEvent:function(e){var that=this;switch(e.type){case START_EV:if(!hasTouch&&e.button!==0)return;that._start(e);break;case MOVE_EV:that._move(e);break;case END_EV:case CANCEL_EV:that._end(e);break;case RESIZE_EV:that._resize();break;case WHEEL_EV:that._wheel(e);break;case'mouseout':that._mouseout(e);break;case'webkitTransitionEnd':that._transitionEnd(e);break;}},_checkDOMChanges:function(){if(this.moved||this.zoomed||this.animating||(this.scrollerW==this.scroller.offsetWidth*this.scale&&this.scrollerH==this.scroller.offsetHeight*this.scale))return;this.refresh();},_scrollbar:function(dir){var that=this,doc=document,bar;if(!that[dir+'Scrollbar']){if(that[dir+'ScrollbarWrapper']){if(hasTransform)that[dir+'ScrollbarIndicator'].style[vendor+'Transform']='';that[dir+'ScrollbarWrapper'].parentNode.removeChild(that[dir+'ScrollbarWrapper']);that[dir+'ScrollbarWrapper']=null;that[dir+'ScrollbarIndicator']=null;}
	    return;}
	    if(!that[dir+'ScrollbarWrapper']){bar=doc.createElement('div');if(that.options.scrollbarClass)bar.className=that.options.scrollbarClass+dir.toUpperCase();else bar.style.cssText='position:absolute;z-index:100;'+(dir=='h'?'height:7px;bottom:1px;left:2px;right:'+(that.vScrollbar?'7':'2')+'px':'width:7px;bottom:'+(that.hScrollbar?'7':'2')+'px;top:2px;right:1px');bar.style.cssText+=';pointer-events:none;-'+vendor+'-transition-property:opacity;-'+vendor+'-transition-duration:'+(that.options.fadeScrollbar?'350ms':'0')+';overflow:hidden;opacity:'+(that.options.hideScrollbar?'0':'1');that.wrapper.appendChild(bar);that[dir+'ScrollbarWrapper']=bar;bar=doc.createElement('div');if(!that.options.scrollbarClass){bar.style.cssText='position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);-'+vendor+'-background-clip:padding-box;-'+vendor+'-box-sizing:border-box;'+(dir=='h'?'height:100%':'width:100%')+';-'+vendor+'-border-radius:3px;border-radius:3px';}
	        bar.style.cssText+=';pointer-events:none;-'+vendor+'-transition-property:-'+vendor+'-transform;-'+vendor+'-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);-'+vendor+'-transition-duration:0;-'+vendor+'-transform:'+trnOpen+'0,0'+trnClose;if(that.options.useTransition)bar.style.cssText+=';-'+vendor+'-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)';that[dir+'ScrollbarWrapper'].appendChild(bar);that[dir+'ScrollbarIndicator']=bar;}
	    if(dir=='h'){that.hScrollbarSize=that.hScrollbarWrapper.clientWidth;that.hScrollbarIndicatorSize=m.max(mround(that.hScrollbarSize*that.hScrollbarSize/that.scrollerW),8);that.hScrollbarIndicator.style.width=that.hScrollbarIndicatorSize+'px';that.hScrollbarMaxScroll=that.hScrollbarSize-that.hScrollbarIndicatorSize;that.hScrollbarProp=that.hScrollbarMaxScroll/that.maxScrollX;}else{that.vScrollbarSize=that.vScrollbarWrapper.clientHeight;that.vScrollbarIndicatorSize=m.max(mround(that.vScrollbarSize*that.vScrollbarSize/that.scrollerH),8);that.vScrollbarIndicator.style.height=that.vScrollbarIndicatorSize+'px';that.vScrollbarMaxScroll=that.vScrollbarSize-that.vScrollbarIndicatorSize;that.vScrollbarProp=that.vScrollbarMaxScroll/that.maxScrollY;}
	    that._scrollbarPos(dir,true);},_resize:function(){var that=this;setTimeout(function(){that.refresh();},isAndroid?200:0);},_pos:function(x,y){x=this.hScroll?x:0;y=this.vScroll?y:0;if(this.options.useTransform){this.scroller.style[vendor+'Transform']=trnOpen+x+'px,'+y+'px'+trnClose+' scale('+this.scale+')';}else{x=mround(x);y=mround(y);this.scroller.style.left=x+'px';this.scroller.style.top=y+'px';}
	    this.x=x;this.y=y;this._scrollbarPos('h');this._scrollbarPos('v');},_scrollbarPos:function(dir,hidden){var that=this,pos=dir=='h'?that.x:that.y,size;if(!that[dir+'Scrollbar'])return;pos=that[dir+'ScrollbarProp']*pos;if(pos<0){if(!that.options.fixedScrollbar){size=that[dir+'ScrollbarIndicatorSize']+mround(pos*3);if(size<8)size=8;that[dir+'ScrollbarIndicator'].style[dir=='h'?'width':'height']=size+'px';}
	    pos=0;}else if(pos>that[dir+'ScrollbarMaxScroll']){if(!that.options.fixedScrollbar){size=that[dir+'ScrollbarIndicatorSize']-mround((pos-that[dir+'ScrollbarMaxScroll'])*3);if(size<8)size=8;that[dir+'ScrollbarIndicator'].style[dir=='h'?'width':'height']=size+'px';pos=that[dir+'ScrollbarMaxScroll']+(that[dir+'ScrollbarIndicatorSize']-size);}else{pos=that[dir+'ScrollbarMaxScroll'];}}
	    that[dir+'ScrollbarWrapper'].style[vendor+'TransitionDelay']='0';that[dir+'ScrollbarWrapper'].style.opacity=hidden&&that.options.hideScrollbar?'0':'1';that[dir+'ScrollbarIndicator'].style[vendor+'Transform']=trnOpen+(dir=='h'?pos+'px,0':'0,'+pos+'px')+trnClose;},_start:function(e){var that=this,point=hasTouch?e.touches[0]:e,matrix,x,y,c1,c2;if(!that.enabled)return;if(that.options.onBeforeScrollStart)that.options.onBeforeScrollStart.call(that,e);if(that.options.useTransition||that.options.zoom)that._transitionTime(0);that.moved=false;that.animating=false;that.zoomed=false;that.distX=0;that.distY=0;that.absDistX=0;that.absDistY=0;that.dirX=0;that.dirY=0;if(that.options.zoom&&hasTouch&&e.touches.length>1){c1=m.abs(e.touches[0].pageX-e.touches[1].pageX);c2=m.abs(e.touches[0].pageY-e.touches[1].pageY);that.touchesDistStart=m.sqrt(c1*c1+c2*c2);that.originX=m.abs(e.touches[0].pageX+e.touches[1].pageX-that.wrapperOffsetLeft*2)/2-that.x;that.originY=m.abs(e.touches[0].pageY+e.touches[1].pageY-that.wrapperOffsetTop*2)/2-that.y;if(that.options.onZoomStart)that.options.onZoomStart.call(that,e);}
	    if(that.options.momentum){if(that.options.useTransform){matrix=getComputedStyle(that.scroller,null)[vendor+'Transform'].replace(/[^0-9-.,]/g,'').split(',');x=matrix[4]*1;y=matrix[5]*1;}else{x=getComputedStyle(that.scroller,null).left.replace(/[^0-9-]/g,'')*1;y=getComputedStyle(that.scroller,null).top.replace(/[^0-9-]/g,'')*1;}
	        if(x!=that.x||y!=that.y){if(that.options.useTransition)that._unbind('webkitTransitionEnd');else cancelFrame(that.aniTime);that.steps=[];that._pos(x,y);}}
	    that.absStartX=that.x;that.absStartY=that.y;that.startX=that.x;that.startY=that.y;that.pointX=point.pageX;that.pointY=point.pageY;that.startTime=e.timeStamp||Date.now();if(that.options.onScrollStart)that.options.onScrollStart.call(that,e);that._bind(MOVE_EV);that._bind(END_EV);that._bind(CANCEL_EV);},_move:function(e){var that=this,point=hasTouch?e.touches[0]:e,deltaX=point.pageX-that.pointX,deltaY=point.pageY-that.pointY,newX=that.x+deltaX,newY=that.y+deltaY,c1,c2,scale,timestamp=e.timeStamp||Date.now();if(that.options.onBeforeScrollMove)that.options.onBeforeScrollMove.call(that,e);if(that.options.zoom&&hasTouch&&e.touches.length>1){c1=m.abs(e.touches[0].pageX-e.touches[1].pageX);c2=m.abs(e.touches[0].pageY-e.touches[1].pageY);that.touchesDist=m.sqrt(c1*c1+c2*c2);that.zoomed=true;scale=1/that.touchesDistStart*that.touchesDist*this.scale;if(scale<that.options.zoomMin)scale=0.5*that.options.zoomMin*Math.pow(2.0,scale/that.options.zoomMin);else if(scale>that.options.zoomMax)scale=2.0*that.options.zoomMax*Math.pow(0.5,that.options.zoomMax/scale);that.lastScale=scale/this.scale;newX=this.originX-this.originX*that.lastScale+this.x,newY=this.originY-this.originY*that.lastScale+this.y;this.scroller.style[vendor+'Transform']=trnOpen+newX+'px,'+newY+'px'+trnClose+' scale('+scale+')';if(that.options.onZoom)that.options.onZoom.call(that,e);return;}
	    that.pointX=point.pageX;that.pointY=point.pageY;if(newX>0||newX<that.maxScrollX){newX=that.options.bounce?that.x+(deltaX/2):newX>=0||that.maxScrollX>=0?0:that.maxScrollX;}
	    if(newY>that.minScrollY||newY<that.maxScrollY){newY=that.options.bounce?that.y+(deltaY/2):newY>=that.minScrollY||that.maxScrollY>=0?that.minScrollY:that.maxScrollY;}
	    if(that.absDistX<6&&that.absDistY<6){that.distX+=deltaX;that.distY+=deltaY;that.absDistX=m.abs(that.distX);that.absDistY=m.abs(that.distY);return;}
	    if(that.options.lockDirection){if(that.absDistX>that.absDistY+5){newY=that.y;deltaY=0;}else if(that.absDistY>that.absDistX+5){newX=that.x;deltaX=0;}}
	    that.moved=true;that._pos(newX,newY);that.dirX=deltaX>0?-1:deltaX<0?1:0;that.dirY=deltaY>0?-1:deltaY<0?1:0;if(timestamp-that.startTime>300){that.startTime=timestamp;that.startX=that.x;that.startY=that.y;}
	    if(that.options.onScrollMove)that.options.onScrollMove.call(that,e);},_end:function(e){if(hasTouch&&e.touches.length!=0)return;var that=this,point=hasTouch?e.changedTouches[0]:e,target,ev,momentumX={dist:0,time:0},momentumY={dist:0,time:0},duration=(e.timeStamp||Date.now())-that.startTime,newPosX=that.x,newPosY=that.y,distX,distY,newDuration,snap,scale;that._unbind(MOVE_EV);that._unbind(END_EV);that._unbind(CANCEL_EV);if(that.options.onBeforeScrollEnd)that.options.onBeforeScrollEnd.call(that,e);if(that.zoomed){scale=that.scale*that.lastScale;scale=Math.max(that.options.zoomMin,scale);scale=Math.min(that.options.zoomMax,scale);that.lastScale=scale/that.scale;that.scale=scale;that.x=that.originX-that.originX*that.lastScale+that.x;that.y=that.originY-that.originY*that.lastScale+that.y;that.scroller.style[vendor+'TransitionDuration']='200ms';that.scroller.style[vendor+'Transform']=trnOpen+that.x+'px,'+that.y+'px'+trnClose+' scale('+that.scale+')';that.zoomed=false;that.refresh();if(that.options.onZoomEnd)that.options.onZoomEnd.call(that,e);return;}
	    if(!that.moved){if(hasTouch){if(that.doubleTapTimer&&that.options.zoom){clearTimeout(that.doubleTapTimer);that.doubleTapTimer=null;if(that.options.onZoomStart)that.options.onZoomStart.call(that,e);that.zoom(that.pointX,that.pointY,that.scale==1?that.options.doubleTapZoom:1);if(that.options.onZoomEnd){setTimeout(function(){that.options.onZoomEnd.call(that,e);},200);}}else{that.doubleTapTimer=setTimeout(function(){that.doubleTapTimer=null;target=point.target;while(target.nodeType!=1)target=target.parentNode;if(target.tagName!='SELECT'&&target.tagName!='INPUT'&&target.tagName!='TEXTAREA'){ev=document.createEvent('MouseEvents');ev.initMouseEvent('click',true,true,e.view,1,point.screenX,point.screenY,point.clientX,point.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,0,null);ev._fake=true;target.dispatchEvent(ev);}},that.options.zoom?250:0);}}
	        that._resetPos(200);if(that.options.onTouchEnd)that.options.onTouchEnd.call(that,e);return;}
	    if(duration<300&&that.options.momentum){momentumX=newPosX?that._momentum(newPosX-that.startX,duration,-that.x,that.scrollerW-that.wrapperW+that.x,that.options.bounce?that.wrapperW:0):momentumX;momentumY=newPosY?that._momentum(newPosY-that.startY,duration,-that.y,(that.maxScrollY<0?that.scrollerH-that.wrapperH+that.y-that.minScrollY:0),that.options.bounce?that.wrapperH:0):momentumY;newPosX=that.x+momentumX.dist;newPosY=that.y+momentumY.dist;if((that.x>0&&newPosX>0)||(that.x<that.maxScrollX&&newPosX<that.maxScrollX))momentumX={dist:0,time:0};if((that.y>that.minScrollY&&newPosY>that.minScrollY)||(that.y<that.maxScrollY&&newPosY<that.maxScrollY))momentumY={dist:0,time:0};}
	    if(momentumX.dist||momentumY.dist){newDuration=m.max(m.max(momentumX.time,momentumY.time),10);if(that.options.snap){distX=newPosX-that.absStartX;distY=newPosY-that.absStartY;if(m.abs(distX)<that.options.snapThreshold&&m.abs(distY)<that.options.snapThreshold){that.scrollTo(that.absStartX,that.absStartY,200);}
	    else{snap=that._snap(newPosX,newPosY);newPosX=snap.x;newPosY=snap.y;newDuration=m.max(snap.time,newDuration);}}
	        that.scrollTo(mround(newPosX),mround(newPosY),newDuration);if(that.options.onTouchEnd)that.options.onTouchEnd.call(that,e);return;}
	    if(that.options.snap){distX=newPosX-that.absStartX;distY=newPosY-that.absStartY;if(m.abs(distX)<that.options.snapThreshold&&m.abs(distY)<that.options.snapThreshold)that.scrollTo(that.absStartX,that.absStartY,200);else{snap=that._snap(that.x,that.y);if(snap.x!=that.x||snap.y!=that.y)that.scrollTo(snap.x,snap.y,snap.time);}
	        if(that.options.onTouchEnd)that.options.onTouchEnd.call(that,e);return;}
	    that._resetPos(200);if(that.options.onTouchEnd)that.options.onTouchEnd.call(that,e);},_resetPos:function(time){var that=this,resetX=that.x>=0?0:that.x<that.maxScrollX?that.maxScrollX:that.x,resetY=that.y>=that.minScrollY||that.maxScrollY>0?that.minScrollY:that.y<that.maxScrollY?that.maxScrollY:that.y;if(resetX==that.x&&resetY==that.y){if(that.moved){that.moved=false;if(that.options.onScrollEnd)that.options.onScrollEnd.call(that);}
	    if(that.hScrollbar&&that.options.hideScrollbar){if(vendor=='webkit')that.hScrollbarWrapper.style[vendor+'TransitionDelay']='300ms';that.hScrollbarWrapper.style.opacity='0';}
	    if(that.vScrollbar&&that.options.hideScrollbar){if(vendor=='webkit')that.vScrollbarWrapper.style[vendor+'TransitionDelay']='300ms';that.vScrollbarWrapper.style.opacity='0';}
	    return;}
	    that.scrollTo(resetX,resetY,time||0);},_wheel:function(e){var that=this,wheelDeltaX,wheelDeltaY,deltaX,deltaY,deltaScale;if('wheelDeltaX'in e){wheelDeltaX=e.wheelDeltaX/12;wheelDeltaY=e.wheelDeltaY/12;}else if('detail'in e){wheelDeltaX=wheelDeltaY=-e.detail*3;}else{wheelDeltaX=wheelDeltaY=-e.wheelDelta;}
	    if(that.options.wheelAction=='zoom'){deltaScale=that.scale*Math.pow(2,1/3*(wheelDeltaY?wheelDeltaY/Math.abs(wheelDeltaY):0));if(deltaScale<that.options.zoomMin)deltaScale=that.options.zoomMin;if(deltaScale>that.options.zoomMax)deltaScale=that.options.zoomMax;if(deltaScale!=that.scale){if(!that.wheelZoomCount&&that.options.onZoomStart)that.options.onZoomStart.call(that,e);that.wheelZoomCount++;that.zoom(e.pageX,e.pageY,deltaScale,400);setTimeout(function(){that.wheelZoomCount--;if(!that.wheelZoomCount&&that.options.onZoomEnd)that.options.onZoomEnd.call(that,e);},400);}
	        return;}
	    deltaX=that.x+wheelDeltaX;deltaY=that.y+wheelDeltaY;if(deltaX>0)deltaX=0;else if(deltaX<that.maxScrollX)deltaX=that.maxScrollX;if(deltaY>that.minScrollY)deltaY=that.minScrollY;else if(deltaY<that.maxScrollY)deltaY=that.maxScrollY;that.scrollTo(deltaX,deltaY,0);},_mouseout:function(e){var t=e.relatedTarget;if(!t){this._end(e);return;}
	    while(t=t.parentNode)if(t==this.wrapper)return;this._end(e);},_transitionEnd:function(e){var that=this;if(e.target!=that.scroller)return;that._unbind('webkitTransitionEnd');that._startAni();},_startAni:function(){var that=this,startX=that.x,startY=that.y,startTime=Date.now(),step,easeOut,animate;if(that.animating)return;if(!that.steps.length){that._resetPos(400);return;}
	    step=that.steps.shift();if(step.x==startX&&step.y==startY)step.time=0;that.animating=true;that.moved=true;if(that.options.useTransition){that._transitionTime(step.time);that._pos(step.x,step.y);that.animating=false;if(step.time)that._bind('webkitTransitionEnd');else that._resetPos(0);return;}
	    animate=function(){var now=Date.now(),newX,newY;if(now>=startTime+step.time){that._pos(step.x,step.y);that.animating=false;if(that.options.onAnimationEnd)that.options.onAnimationEnd.call(that);that._startAni();return;}
	        now=(now-startTime)/step.time-1;easeOut=m.sqrt(1-now*now);newX=(step.x-startX)*easeOut+startX;newY=(step.y-startY)*easeOut+startY;that._pos(newX,newY);if(that.animating)that.aniTime=nextFrame(animate);};animate();},_transitionTime:function(time){time+='ms';this.scroller.style[vendor+'TransitionDuration']=time;if(this.hScrollbar)this.hScrollbarIndicator.style[vendor+'TransitionDuration']=time;if(this.vScrollbar)this.vScrollbarIndicator.style[vendor+'TransitionDuration']=time;},_momentum:function(dist,time,maxDistUpper,maxDistLower,size){var deceleration=0.0006,speed=m.abs(dist)/time,newDist=(speed*speed)/(2*deceleration),newTime=0,outsideDist=0;if(dist>0&&newDist>maxDistUpper){outsideDist=size/(6/(newDist/speed*deceleration));maxDistUpper=maxDistUpper+outsideDist;speed=speed*maxDistUpper/newDist;newDist=maxDistUpper;}else if(dist<0&&newDist>maxDistLower){outsideDist=size/(6/(newDist/speed*deceleration));maxDistLower=maxDistLower+outsideDist;speed=speed*maxDistLower/newDist;newDist=maxDistLower;}
	    newDist=newDist*(dist<0?-1:1);newTime=speed/deceleration;return{dist:newDist,time:mround(newTime)};},_offset:function(el){var left=-el.offsetLeft,top=-el.offsetTop;while(el=el.offsetParent){left-=el.offsetLeft;top-=el.offsetTop;}
	    if(el!=this.wrapper){left*=this.scale;top*=this.scale;}
	    return{left:left,top:top};},_snap:function(x,y){var that=this,i,l,page,time,sizeX,sizeY;page=that.pagesX.length-1;for(i=0,l=that.pagesX.length;i<l;i++){if(x>=that.pagesX[i]){page=i;break;}}
	    if(page==that.currPageX&&page>0&&that.dirX<0)page--;x=that.pagesX[page];sizeX=m.abs(x-that.pagesX[that.currPageX]);sizeX=sizeX?m.abs(that.x-x)/sizeX*500:0;that.currPageX=page;page=that.pagesY.length-1;for(i=0;i<page;i++){if(y>=that.pagesY[i]){page=i;break;}}
	    if(page==that.currPageY&&page>0&&that.dirY<0)page--;y=that.pagesY[page];sizeY=m.abs(y-that.pagesY[that.currPageY]);sizeY=sizeY?m.abs(that.y-y)/sizeY*500:0;that.currPageY=page;time=mround(m.max(sizeX,sizeY))||200;return{x:x,y:y,time:time};},_bind:function(type,el,bubble){(el||this.scroller).addEventListener(type,this,!!bubble);},_unbind:function(type,el,bubble){(el||this.scroller).removeEventListener(type,this,!!bubble);},destroy:function(){var that=this;that.scroller.style[vendor+'Transform']='';that.hScrollbar=false;that.vScrollbar=false;that._scrollbar('h');that._scrollbar('v');that._unbind(RESIZE_EV,window);that._unbind(START_EV);that._unbind(MOVE_EV);that._unbind(END_EV);that._unbind(CANCEL_EV);if(!that.options.hasTouch){that._unbind('mouseout',that.wrapper);that._unbind(WHEEL_EV);}
	    if(that.options.useTransition)that._unbind('webkitTransitionEnd');if(that.options.checkDOMChanges)clearInterval(that.checkDOMTime);if(that.options.onDestroy)that.options.onDestroy.call(that);},refresh:function(){var that=this,offset,i,l,els,pos=0,page=0;if(that.scale<that.options.zoomMin)that.scale=that.options.zoomMin;that.wrapperW=that.wrapper.clientWidth||1;that.wrapperH=that.wrapper.clientHeight||1;that.minScrollY=-that.options.topOffset||0;that.scrollerW=mround(that.scroller.offsetWidth*that.scale);that.scrollerH=mround((that.scroller.offsetHeight+that.minScrollY)*that.scale);that.maxScrollX=that.wrapperW-that.scrollerW;that.maxScrollY=that.wrapperH-that.scrollerH+that.minScrollY;that.dirX=0;that.dirY=0;if(that.options.onRefresh)that.options.onRefresh.call(that);that.hScroll=that.options.hScroll&&that.maxScrollX<0;that.vScroll=that.options.vScroll&&(!that.options.bounceLock&&!that.hScroll||that.scrollerH>that.wrapperH);that.hScrollbar=that.hScroll&&that.options.hScrollbar;that.vScrollbar=that.vScroll&&that.options.vScrollbar&&that.scrollerH>that.wrapperH;offset=that._offset(that.wrapper);that.wrapperOffsetLeft=-offset.left;that.wrapperOffsetTop=-offset.top;if(typeof that.options.snap=='string'){that.pagesX=[];that.pagesY=[];els=that.scroller.querySelectorAll(that.options.snap);for(i=0,l=els.length;i<l;i++){pos=that._offset(els[i]);pos.left+=that.wrapperOffsetLeft;pos.top+=that.wrapperOffsetTop;that.pagesX[i]=pos.left<that.maxScrollX?that.maxScrollX:pos.left*that.scale;that.pagesY[i]=pos.top<that.maxScrollY?that.maxScrollY:pos.top*that.scale;}}else if(that.options.snap){that.pagesX=[];while(pos>=that.maxScrollX){that.pagesX[page]=pos;pos=pos-that.wrapperW;page++;}
	    if(that.maxScrollX%that.wrapperW)that.pagesX[that.pagesX.length]=that.maxScrollX-that.pagesX[that.pagesX.length-1]+that.pagesX[that.pagesX.length-1];pos=0;page=0;that.pagesY=[];while(pos>=that.maxScrollY){that.pagesY[page]=pos;pos=pos-that.wrapperH;page++;}
	    if(that.maxScrollY%that.wrapperH)that.pagesY[that.pagesY.length]=that.maxScrollY-that.pagesY[that.pagesY.length-1]+that.pagesY[that.pagesY.length-1];}
	    that._scrollbar('h');that._scrollbar('v');if(!that.zoomed){that.scroller.style[vendor+'TransitionDuration']='0';that._resetPos(200);}},scrollTo:function(x,y,time,relative){var that=this,step=x,i,l;that.stop();if(!step.length)step=[{x:x,y:y,time:time,relative:relative}];for(i=0,l=step.length;i<l;i++){if(step[i].relative){step[i].x=that.x-step[i].x;step[i].y=that.y-step[i].y;}
	    that.steps.push({x:step[i].x,y:step[i].y,time:step[i].time||0});}
	    that._startAni();},scrollToElement:function(el,time){var that=this,pos;el=el.nodeType?el:that.scroller.querySelector(el);if(!el)return;pos=that._offset(el);pos.left+=that.wrapperOffsetLeft;pos.top+=that.wrapperOffsetTop;pos.left=pos.left>0?0:pos.left<that.maxScrollX?that.maxScrollX:pos.left;pos.top=pos.top>that.minScrollY?that.minScrollY:pos.top<that.maxScrollY?that.maxScrollY:pos.top;time=time===undefined?m.max(m.abs(pos.left)*2,m.abs(pos.top)*2):time;that.scrollTo(pos.left,pos.top,time);},scrollToPage:function(pageX,pageY,time){var that=this,x,y;time=time===undefined?400:time;if(that.options.onScrollStart)that.options.onScrollStart.call(that);if(that.options.snap){pageX=pageX=='next'?that.currPageX+1:pageX=='prev'?that.currPageX-1:pageX;pageY=pageY=='next'?that.currPageY+1:pageY=='prev'?that.currPageY-1:pageY;pageX=pageX<0?0:pageX>that.pagesX.length-1?that.pagesX.length-1:pageX;pageY=pageY<0?0:pageY>that.pagesY.length-1?that.pagesY.length-1:pageY;that.currPageX=pageX;that.currPageY=pageY;x=that.pagesX[pageX];y=that.pagesY[pageY];}else{x=-that.wrapperW*pageX;y=-that.wrapperH*pageY;if(x<that.maxScrollX)x=that.maxScrollX;if(y<that.maxScrollY)y=that.maxScrollY;}
	    that.scrollTo(x,y,time);},disable:function(){this.stop();this._resetPos(0);this.enabled=false;this._unbind(MOVE_EV);this._unbind(END_EV);this._unbind(CANCEL_EV);},enable:function(){this.enabled=true;},stop:function(){if(this.options.useTransition)this._unbind('webkitTransitionEnd');else cancelFrame(this.aniTime);this.steps=[];this.moved=false;this.animating=false;},zoom:function(x,y,scale,time){var that=this,relScale=scale/that.scale;if(!that.options.useTransform)return;that.zoomed=true;time=time===undefined?200:time;x=x-that.wrapperOffsetLeft-that.x;y=y-that.wrapperOffsetTop-that.y;that.x=x-x*relScale+that.x;that.y=y-y*relScale+that.y;that.scale=scale;that.refresh();that.x=that.x>0?0:that.x<that.maxScrollX?that.maxScrollX:that.x;that.y=that.y>that.minScrollY?that.minScrollY:that.y<that.maxScrollY?that.maxScrollY:that.y;that.scroller.style[vendor+'TransitionDuration']=time+'ms';that.scroller.style[vendor+'Transform']=trnOpen+that.x+'px,'+that.y+'px'+trnClose+' scale('+scale+')';that.zoomed=false;},isReady:function(){return!this.moved&&!this.zoomed&&!this.animating;}};if(true)exports.iScroll=iScroll;else window.iScroll=iScroll;
	    window.iScroll = iScroll;
	})();


	//日期设置
	(function($) {
	    $.fn.date = function(options, Ycallback, Ncallback) {
	        //插件默认选项
	        var that = $(this);
	        var docType = $(this).is('input');
	        var datetime = false;
	        var nowdate = new Date();
	        var indexY = 1,
	            indexM = 1,
	            indexD = 1;
	        var indexH = 1,
	            indexI = 1,
	            indexS = 0;
	        var initY = parseInt((nowdate.getYear() + "").substr(1, 2));
	        var initM = parseInt(nowdate.getMonth() + "") + 1;
	        var initD = parseInt(nowdate.getDate() + "");
	        var initH = parseInt(nowdate.getHours());
	        var initI = parseInt(nowdate.getMinutes());
	        var initS = parseInt(nowdate.getYear());
	        var yearScroll = null,
	            monthScroll = null,
	            dayScroll = null;
	        var HourScroll = null,
	            MinuteScroll = null,
	            SecondScroll = null;
	        $.fn.date.defaultOptions = {
	            beginyear: 2000, //日期--年--份开始
	            endyear: nowdate.getFullYear(), //日期--年--份结束
	            beginmonth: 1, //日期--月--份结束
	            endmonth: 12, //日期--月--份结束
	            beginday: 1, //日期--日--份结束
	            endday: 31, //日期--日--份结束
	            beginhour: 1,
	            endhour: 12,
	            beginminute: 00,
	            endminute: 59,
	            curdate: true, //打开日期是否定位到当前日期
	            theme: "date", //控件样式（1：日期，2：日期+时间）
	            mode: null, //操作模式（滑动模式）
	            event: "click", //打开日期插件默认方式为点击后后弹出日期
	            show: true
	        };
	        //用户选项覆盖插件默认选项   
	        var opts = $.extend(true, {}, $.fn.date.defaultOptions, options);
	        if (opts.theme === "datetime") {
	            datetime = true;
	        }
	        if (!opts.show) {
	            that.unbind('click');
	        } else {
	            //绑定事件（默认事件为获取焦点）
	            that.bind(opts.event, function() {
	                createUL(); //动态生成控件显示的日期
	                init_iScrll(); //初始化iscrll
	                extendOptions(); //显示控件
	                that.blur();
	                if (datetime) {
	                    showdatetime();
	                    refreshTime();
	                }
	                refreshDate();
	                bindButton();
	            });
	        }
	        //>2000年
	        if(opts.beginyear<2000){
	            initY=initY+100;
	        }      

	        function refreshDate() {
	            yearScroll.refresh();
	            monthScroll.refresh();
	            dayScroll.refresh();

	            resetInitDete();
	            yearScroll.scrollTo(0, initY * 40, 100, true);
	            monthScroll.scrollTo(0, initM * 40 - 40, 100, true);
	            dayScroll.scrollTo(0, initD * 40 - 40, 100, true);
	        }

	        function refreshTime() {
	            HourScroll.refresh();
	            MinuteScroll.refresh();
	            SecondScroll.refresh();
	            if (initH > 12) { //判断当前时间是上午还是下午
	                SecondScroll.scrollTo(0, initD * 40 - 40, 100, true); //显示“下午”
	                initH = initH - 12 - 1;
	            }
	            HourScroll.scrollTo(0, initH * 40, 100, true);
	            MinuteScroll.scrollTo(0, initI * 40, 100, true);
	            initH = parseInt(nowdate.getHours());
	        }

	        function resetIndex() {
	            indexY = 1;
	            indexM = 1;
	            indexD = 1;
	        }

	        function resetInitDete() { 
	            
	            if (opts.curdate) {
	                return false;
	            } else if (that.val() === "") {
	                return false;
	            }
	            
	            initY = parseInt(that.val().substr(2, 2));
	            initM = parseInt(that.val().substr(5, 2));
	            initD = parseInt(that.val().substr(8, 2));
	        }

	        function bindButton() {
	            resetIndex();
	            $("#dateconfirm").unbind('click').click(function() {
	                var datestr = $("#yearwrapper ul li").eq(indexY).html().substr(0, $("#yearwrapper ul li").eq(indexY).html().length - 1) + "-" +
	                    $("#monthwrapper ul li").eq(indexM).html().substr(0, $("#monthwrapper ul li").eq(indexM).html().length - 1) + "-" +
	                    $("#daywrapper ul li").eq(Math.round(indexD)).html().substr(0, $("#daywrapper ul li").eq(Math.round(indexD)).html().length - 1);
	                if (datetime) {
	                    if (Math.round(indexS) === 1) { //下午
	                        $("#Hourwrapper ul li").eq(indexH).html(parseInt($("#Hourwrapper ul li").eq(indexH).html().substr(0, $("#Hourwrapper ul li").eq(indexH).html().length - 1)) + 12)
	                    } else {
	                        $("#Hourwrapper ul li").eq(indexH).html(parseInt($("#Hourwrapper ul li").eq(indexH).html().substr(0, $("#Hourwrapper ul li").eq(indexH).html().length - 1)))
	                    }
	                    datestr += " " + $("#Hourwrapper ul li").eq(indexH).html().substr(0, $("#Minutewrapper ul li").eq(indexH).html().length - 1) + ":" +
	                        $("#Minutewrapper ul li").eq(indexI).html().substr(0, $("#Minutewrapper ul li").eq( indexI ).html().length - 1);
	                    indexS = 0;
	                }

	                if (Ycallback === undefined) {
	                    if (docType) {
	                        that.val(datestr);
	                    } else {
	                        that.html(datestr);
	                    }
	                } else {
	                    if (docType) {
	                        that.val(datestr);
	                    } else {
	                        that.html(datestr);
	                    }
	                    Ycallback(datestr);
	                }
	                $("#datePage").hide();
	                $("#dateshadow").hide();
	            });
	            $("#datecancle").click(function() {
	                $("#datePage").hide();
	                $("#dateshadow").hide();
	                //Ncallback(false);
	            });
	        }

	        function extendOptions() {
	            $("#datePage").show();
	            $("#dateshadow").css({'display':'block'});
	        }

	        //日期滑动
	        function init_iScrll() {
	            var strY = $("#yearwrapper ul li").eq(indexY).html().substr(0, $("#yearwrapper ul li").eq(indexY ).html().length - 1);
	            var strM = $("#monthwrapper ul li").eq(indexM).html().substr(0, $("#monthwrapper ul li").eq(indexM).html().length - 1);
	            yearScroll = new iScroll("yearwrapper", {
	                snap: "li",
	                vScrollbar: false,
	                onScrollEnd: function() {
	                    indexY = (this.y / 40) * (-1) + 1;
	                    opts.endday = checkdays(strY, strM);
	                    $("#daywrapper ul").html(createDAY_UL());
	                    dayScroll.refresh();
	                }
	            });
	            monthScroll = new iScroll("monthwrapper", {
	                snap: "li",
	                vScrollbar: false,
	                onScrollEnd: function() {
	                    indexM = (this.y / 40) * (-1) + 1;
	                    opts.endday = checkdays(strY, strM);
	                    $("#daywrapper ul").html(createDAY_UL());
	                    dayScroll.refresh();
	                }
	            });
	            dayScroll = new iScroll("daywrapper", {
	                snap: "li",
	                vScrollbar: false,
	                onScrollEnd: function() {
	                    indexD = (this.y / 40) * (-1) + 1;
	                }
	            });
	        }

	        function showdatetime() {
	            init_iScroll_datetime();
	            addTimeStyle();
	            $("#datescroll_datetime").show();
	            $("#Hourwrapper ul").html(createHOURS_UL());
	            $("#Minutewrapper ul").html(createMINUTE_UL());
	            $("#Secondwrapper ul").html(createSECOND_UL());
	        }

	        //日期+时间滑动
	        function init_iScroll_datetime() {
	            HourScroll = new iScroll("Hourwrapper", {
	                snap: "li",
	                vScrollbar: false,
	                onScrollEnd: function() {
	                    indexH = Math.round((this.y / 40) * (-1)) + 1;
	                    HourScroll.refresh();
	                }
	            });
	            MinuteScroll = new iScroll("Minutewrapper", {
	                snap: "li",
	                vScrollbar: false,
	                onScrollEnd: function() {
	                    indexI = Math.round((this.y / 40) * (-1)) + 1;
	                    HourScroll.refresh();
	                }
	            });
	            SecondScroll = new iScroll("Secondwrapper", {
	                snap: "li",
	                vScrollbar: false,
	                onScrollEnd: function() {
	                    indexS = Math.round((this.y / 40) * (-1));
	                    HourScroll.refresh();
	                }
	            });
	        }

	        function checkdays(year, month) {
	            var new_year = year; //取当前的年份        
	            var new_month = month++; //取下一个月的第一天，方便计算（最后一天不固定）      

	            if (month > 12) //如果当前大于12月，则年份转到下一年
	            {
	                new_month -= 12; //月份减
	                new_year++; //年份增        
	            }

	            var new_date = new Date(new_year, new_month, 1); //取当年当月中的第一天
	            return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate(); //获取当月最后一天日期
	        }

	        function createUL() {
	            CreateDateUI();
	            $("#yearwrapper ul").html(createYEAR_UL());
	            $("#monthwrapper ul").html(createMONTH_UL());
	            $("#daywrapper ul").html(createDAY_UL());
	            var docHeight = Zepto(document).height();
	            $('#dateshadow').css("height",docHeight);
	        }

	        function CreateDateUI() {
	            var str = '' +
	                '<div id="dateshadow"></div>' +
	                '<div id="datePage" class="page">' +
	                '<section>' +
	                '<div id="datetitle"><h1>请选择日期</h1></div>' +
	                '<div id="datemark"><a id="markyear"></a><a id="markmonth"></a><a id="markday"></a></div>' +
	                '<div id="timemark"><a id="markhour"></a><a id="markminut"></a><a id="marksecond"></a></div>' +
	                '<div id="datescroll">' +
	                '<div id="yearwrapper">' +
	                '<ul></ul>' +
	                '</div>' +
	                '<div id="monthwrapper">' +
	                '<ul></ul>' +
	                '</div>' +
	                '<div id="daywrapper">' +
	                '<ul></ul>' +
	                '</div>' +
	                '</div>' +
	                '<div id="datescroll_datetime">' +
	                '<div id="Hourwrapper">' +
	                '<ul></ul>' +
	                '</div>' +
	                '<div id="Minutewrapper">' +
	                '<ul></ul>' +
	                '</div>' +
	                '<div id="Secondwrapper">' +
	                '<ul></ul>' +
	                '</div>' +
	                '</div>' +
	                '</section>' +
	                '<footer id="dateFooter">' +
	                '<div id="setcancle">' +
	                '<ul>' +
	                '<li id="datecancle">取消</li>' +
	                '<li id="dateconfirm">确定</li>' +
	                '</ul>' +
	                '</div>' +
	                '</footer>' +
	                '</div>';
	            $("#datePlugin").html(str);
	        }

	        function addTimeStyle() {
	            $("#datePage").css("height", "380px");
	            $("#datePage").css("top", "60px");
	            $("#yearwrapper").css("position", "absolute");
	            $("#yearwrapper").css("bottom", "200px");
	            $("#monthwrapper").css("position", "absolute");
	            $("#monthwrapper").css("bottom", "200px");
	            $("#daywrapper").css("position", "absolute");
	            $("#daywrapper").css("bottom", "200px");
	        }

	        //创建 --年-- 列表
	        function createYEAR_UL() {
	            var str = "<li>&nbsp;</li>";

	            for (var i = opts.beginyear; i <= opts.endyear; i++) {
	                str += '<li>' + i + '年</li>';
	            }
	            return str + "<li>&nbsp;</li>";
	        }

	        //创建 --月-- 列表
	        function createMONTH_UL() {
	            var str = "<li>&nbsp;</li>";
	            for (var i = opts.beginmonth; i <= opts.endmonth; i++) {
	                if (i < 10) {
	                    i = "0" + i
	                }
	                str += '<li>' + i + '月</li>';
	            }
	            return str + "<li>&nbsp;</li>";
	        }

	        //创建 --日-- 列表
	        function createDAY_UL() {
	            $("#daywrapper ul").html("");
	            var str = "<li>&nbsp;</li>";
	            for (var i = opts.beginday; i <= opts.endday; i++) {
	                str += '<li>' + i + '日</li>';
	            }
	            return str + "<li>&nbsp;</li>";
	        }

	        //创建 --时-- 列表
	        function createHOURS_UL() {
	            var str = "<li>&nbsp;</li>";
	            for (var i = opts.beginhour; i < opts.endhour; i++) {
	                str += '<li>' + i + '时</li>';
	            }
	            return str + "<li>&nbsp;</li>";
	        }

	        //创建 --分-- 列表
	        function createMINUTE_UL() {
	            var str = "<li>&nbsp;</li>";
	            for (var i = opts.beginminute; i <= opts.endminute; i++) {
	                if (i < 10) {
	                    i = "0" + i;
	                }
	                str += '<li>' + i + '分</li>';
	            }
	            return str + "<li>&nbsp;</li>";
	        }

	        //创建 --分-- 列表
	        function createSECOND_UL() {
	            var str = "<li>&nbsp;</li>";
	            str += "<li>上午</li><li>下午</li>";
	            return str + "<li>&nbsp;</li>";
	        }
	    }
	})(Zepto);

/***/ }
/******/ ]);