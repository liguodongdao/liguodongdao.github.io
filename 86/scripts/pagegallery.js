/*! created by 第一车网 */
webpackJsonp([2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _app = __webpack_require__(1);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	$(document).on('touchmove', function (e) {
		e.preventDefault();
		return false;
	});

	var showinfo = {
		'1': ['时尚设计', '犀利而时尚的设计，赋予86与众不同的个性。'],
		'2': ['先进的跑车驾驶舱', '间距紧凑与轻量的“2+2座椅”，营造“驾乘融合”的氛围。'],
		'3': ['6速自动变速器', '直接敏捷的换挡体验，出色的燃油经济性。'],
		'4': ['自动车型仪表盘', '4.2英寸多功能信息显示屏。'],
		'5': ['方向盘', '直径362mm方向盘，更灵活更具运动细胞。'],
		'6': ['赛车式尾部设计', '采用立体梯形设计，让驾驭者游刃天地间。'],
		'7': ['前排座椅安全带', '驾驶席和副驾驶席配备3点式ELR安全带（带预张紧器装置）。'],
		'8': ['高科技面料座椅', 'Alcantara高级座椅材料。'],
		'9': ['超大空间', '空间和性能的完美平衡。'],
		'10': ['兼具美观与功能的内饰', '86内部空间采用以功能为中心的配色方案和全新设计的纹理装饰。'],
		'11': ['6速手动变速器', '采用刚性浮式设计。'],
		'12': ['时尚设计', '犀利而时尚的设计，赋予86与众不同的个性。'],
		'13': ['赛车式尾部设计', '采用立体梯形设计，让驾驭者游刃天地间。'],
		'14': ['手动车型仪表盘', '4.2英寸多功能信息显示屏。'],
		'15': ['方向盘', '直径362mm方向盘，更灵活更具运动细胞。'],
		'16': ['智能钥匙', '大大提高用车的便利性。'],
		'17': ['高强度车身框架及可溃缩式车身结构设计', '采用高强度框架，防止车身变形；同时采用可溃缩式车身结构设计，有效吸收和分散撞击能量。'],
		'18': ['前排座椅安全带', '驾驶席和副驾驶席配备3点式ELR安全带（带预张紧器装置）。'],
		'19': ['卓越空气动力学设计', '利用气流保持车身稳定性,畅享科技带来的快意体验。'],
		'20': ['水平对置发动机', '水平对置发动机技术与丰田领先的D-4S直喷技术完美结合。'],
		'21': ['高强度车身框架及可溃缩式车身结构设计', '采用高强度框架，防止车身变形；同时采用可溃缩式车身结构设计，有效吸收和分散撞击能量。'],
		'22': ['悬架系统', '麦弗逊式前悬和双叉臂式后悬设计,确保良好的局部抓地性。'],
		'23': ['多种配色方案', '根据黑红色调的整体对比,营造激情与动感的驾驶氛围。'],
		'24': ['轻量化车身', '实现了一辆高性能跑车所需的卓越操控稳定性。'],
		'25': ['多种配色方案', '更多个性化选择，满足不同需求。'],
		'26': ['多种配色方案', '更多个性化选择，满足不同需求。']
	};

	//pagegallery init
	function galleryInit() {
		console.log('this is gallery init');
		var $gallery = $('.p-gallery');

		var startWidth = 0,
		    //起始宽度
		currentWidth; //当前宽度

		var startPos, //起始位置
		currentPos; //当前位置

		//滑动条的宽度
		var gwidth = $gallery.find('.gallery-progress').width();

		var container_width = $gallery.find('.gallery-container').width();
		var content_width = $gallery.find('.container-content').width();
		var move_width = container_width - content_width;

		//
		//滚动条更新函数
		//
		function move(callback, bool) {
			var bool;
			var poslength;
			if (bool) {
				poslength = startPos - currentPos;
			} else {
				poslength = currentPos - startPos;
			}
			currentWidth = poslength / gwidth * 100 + startWidth;
			if (currentWidth > 100) {
				currentWidth = 100;
			} else if (currentWidth < 0) {
				currentWidth = 0;
			}
			$gallery.find('.progress-bar').css('width', currentWidth + '%');
			callback && callback(currentWidth);
		}

		$gallery.find('.bar-sphere , .gallery-container').on('touchstart', function (e) {
			console.log('touchstart');
			var touch = e.touches[0];
			startPos = touch.clientX;
		});

		$gallery.find('.bar-sphere , .gallery-container').on('touchmove', function (e) {
			console.log('touchmove');
			var touch = e.touches[0];
			currentPos = touch.clientX;

			var bool = false;
			if (!$(e.currentTarget).hasClass('bar-sphere')) {
				bool = true;
			}
			//滑动条滑动回调函数
			move(function (pos) {
				var position = move_width * (pos / 100);
				$gallery.find('.container-content').css('left', position);
			}, bool);
		});

		/*
	 $gallery.find('.gallery-container').on('touchmove',function(e){
	 	var touch = e.touches[0];
	 	currentPos = touch.clientX;
	 });
	 */

		$gallery.find('.bar-sphere , .gallery-container').on('touchend', function (e) {
			startWidth = currentWidth;
		});

		$gallery.find('.container-content img').on('tap', function (e) {
			var $target = $(e.currentTarget);
			var imgsrc = $target.attr('data-src');
			var index = $target.attr('data-index');

			$gallery.find('.m-preview .preview-img img').attr('src', imgsrc);
			$gallery.find('.m-preview .preview-text h3').text(showinfo[index][0]);
			$gallery.find('.m-preview .preview-text p').text(showinfo[index][1]);

			$gallery.find('.m-preview').show();
		});

		$gallery.find('.m-preview .preview-close').on('tap', function () {
			$gallery.find('.m-preview').hide();
			$gallery.find('.m-preview .preview-img img').attr('src', '');
			$gallery.find('.m-preview .preview-text h3').text('');
			$gallery.find('.m-preview .preview-text p').text('');
		});
	}
	galleryInit();

/***/ }
]);