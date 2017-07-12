//
//   微信分享
//=======================
$(function(){
	var $header = $('header');
	
	//默认分享信息
	var title = "嘿，新86！丰田新款86荣耀上市！",
		desc = "86军，丰田新86邀你一起征服弯道！",
		link = "http://wap.toyota.com.cn/86/",
		imgUrl = "http://wap.toyota.com.cn/Content/86/images/share/86_share_common.gif";

	//礼包页面分享信息
    var giftTitle = "丰田新款86超值TRD改装大礼包",
		giftDesc = "全球限量86套，每一套都有丰田官方的唯一证书，TRD原装进口，低于日本售价。",
		giftLink = "http://wap.toyota.com.cn/86/gift/",
		giftImgUrl = "http://wap.toyota.com.cn/Content/86/images/share/86_share_gift.gif";

	//微信初始化
	function wxInit( params ){
		if( !wx ) return;
		wx.config({
			debug: false,
			appId: params.appId,
			timestamp: params.timestamp,
			nonceStr: params.nonceStr,
			signature: params.signature,
			jsApiList:['onMenuShareTimeline','onMenuShareAppMessage']
		});
		wx.ready(function(){

			var data = {};
			//判断是否是礼包页面
			if( /gift/.test( location.href ) ){
				data.title = giftTitle;
				data.desc = giftDesc;
				data.link = giftLink;
				data.imgUrl = giftImgUrl;
			//普通页面
			}else{
				data.title = title;
				data.desc = desc;
				data.link = link;
				data.imgUrl = imgUrl;
			}
			wx.onMenuShareAppMessage({
			    title: data.title,
			    desc: data.desc,
			    link: data.link,
			    imgUrl: data.imgUrl, // 分享图标
			    type: '', // 分享类型,music、video或link，不填默认为link
			    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空    
			    success:function(){
			    }   
			});
			wx.onMenuShareTimeline({//分享到朋友圈
				title: data.title,
				link: data.link,
				imgUrl: data.imgUrl, // 分享图标
				type: '', // 分享类型,music、video或link，不填默认为link
				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空   
				success:function(){
				} 
			});
		});
	}

	//初始化
	//获取参数信息
	var path = location.href.split('#')[0];
	$.ajax({
	    url: '/Toyota86/getWxConfigParas/',
		data:{
			'urlStr':path
		},
		type:'POST',
		timeout: 5000,
		success: function( data ){
			if( data.Success ){
				//初始化微信js
				wxInit(data);
			}
		}
	});
})

