//====================
//  百度map的一些api
//====================
var map = new BMap.Map('mapcontainer');
var point = new BMap.Point(116.404,39.915);
map.centerAndZoom(point,15);

//地图移动
map.panTo( new BMap.Point(116.409, 39.918) );

//控件类
//=========
//缩放
map.addControl(new BMap.NavigationControl());
//距离标尺
map.addControl(new BMap.ScaleControl());
//世界地图控件
map.addControl(new BMap.OverviewMapControl());

//覆盖物类
//========
//红色marker
var marker = new BMap.Marker(point);
map.addOverlay(marker);
marker.enableDragging();

//显示信息窗口
/*
var opts = {
    width: 250,
    height: 100,
    title: 'hello'
}
var infoWindow = new BMap.InfoWindow('World',opts);
map.openInfoWindow(infoWindow,map.getCenter());
*/

//折线覆盖物
/*
var polyline = new BMap.Polyline([    
   new BMap.Point(116.399, 39.910),    
   new BMap.Point(116.405, 39.920)    
 ],    
 {strokeColor:"blue", strokeWeight:6, strokeOpacity:0.5}    
);    
map.addOverlay(polyline);
*/

//路线搜索服务

//获取本地坐标
/*
function getLocation(){
    if( navigator.geolocation ){
        navigator.geolocation.getCurrentPosition(function( position ){
            alert('已获取地理位置坐标');
            alert('维度'+position.coords.latitude+'经度'+position.coords.longitude);
        },function(){
            alert('获取位置信息失败');
        });
    }else{
        alert('该浏览器不支持获取地理位置.');
    }
}
getLocation();
*/
