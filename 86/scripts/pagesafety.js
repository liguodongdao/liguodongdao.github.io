/*! created by 第一车网 */
webpackJsonp([8],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _app = __webpack_require__(1);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var $safety = $('.p-safety');

	$safety.find('.ani-a').fadeIn('fast');
	setTimeout(function () {
		$safety.find('.ani-b').fadeIn('fast');
		$safety.find('.ani-c').fadeIn('fast');
		setTimeout(function () {
			$safety.find('.safety-ani').fadeOut('fast');
		}, 3000);
	}, 1200);

	var $preview = $('.m-preview');

	var htmldata = {
		'0': '<h3>高强度车身框架及<br>可溃缩式车身结构设计</h3><p>采用高强度框架，防止车身变形；同时采用可溃缩式车身结构设计，有效吸收和分散撞击能量。</p>',
		'1': '<h3>气囊组合</h3><p>驾驶席和副驾驶席配备前气囊,</p><p>驾驶席和副驾驶席配备侧气囊,</p><p>驾驶席侧和副驾驶席侧配备帘式气囊,</p><p>驾驶席配备膝部气囊。</p>',
		'2': '<h3>前排座椅安全带</h3><p>驾驶席和副驾驶席配备3点式ELR安全带</p><p>(带预张紧器装置)</p>',
		'3': '<h3>后排座椅安全带</h3><p>后排座椅配备3点式ELR安全带</p><p>(带预张紧器装置)</p>'
	};

	$preview.find('.preview-close').on('tap', function () {
		$preview.find('.preview-text').empty();
		$preview.hide();
	});

	$safety.find('.pic').on('tap', function () {

		var imgsrc = $(this).attr('data-img');
		var index = $(this).attr('data-index');

		$preview.find('.preview-img img').attr('src', imgsrc);
		$preview.find('.preview-text').html(htmldata[index]);
		$preview.show();
	});

/***/ }
]);