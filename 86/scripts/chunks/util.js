//工具类函数集合
var util = {

	//html 转义
    html_encode: function( str ){
          var s = "";   
          if (str.length == 0) return "";   
          s = str.replace(/&/g, "&gt;");   
          s = s.replace(/</g, "&lt;");   
          s = s.replace(/>/g, "&gt;");   
          s = s.replace(/ /g, "&nbsp;");   
          s = s.replace(/\'/g, "&#39;");   
          s = s.replace(/\"/g, "&quot;");   
          s = s.replace(/\n/g, "<br>");   
          return s;   
    },

    //html 反转义
    html_decode: function( str ){
          var s = "";   
          if (str.length == 0) return "";    
          s = str.replace(/&lt;/g, "<");   
          s = s.replace(/&gt;/g, ">");   
          s = s.replace(/&nbsp;/g, " ");   
          s = s.replace(/&#39;/g, "\'");   
          s = s.replace(/&quot;/g, "\"");   
          s = s.replace(/<br>/g, "\n");   
          return s;   
    },

    //=========
    //
    //重置select的值
    // @param $select
    // @param array [{'name':'XXX','value':'XXX'},{'name':'XXX','value':'XXX'},{'name':'XXX','value':'XXX'}] 或
    //              ['XXX','XXX','XXX']
    //================================
    resetSelect: function( $select, array , selectvalue ){
        var optionStr = '';

        if( array.length <=0 ) return;

        for(var i=0; i<array.length; i++){
            if( typeof array[i] == 'object' ){
                optionStr = optionStr + '<option value="' + array[i]['value'] + '">' + array[i]['name'] + '</option>' 
            }else{
                optionStr = optionStr + '<option value="' + array[i] + '">' + array[i] + '</option>' 
            }
        }

        $select.html(optionStr);

        if( selectvalue ){
            $select.val( selectvalue );
        } else {
            $select[0].options[0].selected = true
        }
        //todo 默认选中第一个 并触发事件
        $select.trigger('change');
    },

    //获取请求参数
    getParam: function ( name ){

      var params = {};
      var querys = location.search.slice(1).split('&');
      querys.forEach(function(item){
        params[item.split('=')[0]]=item.split('=')[1]
      })
      return params[name] || false;
    }
}

export default util;
