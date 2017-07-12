/*! created by 第一车网 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		11:0
/******/ 	};

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

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"0":"pageapperance","1":"pagedata","2":"pagegallery","3":"pagegift","4":"pagehistory","5":"pageindex","6":"pageinterior","7":"pagepower","8":"pagesafety","9":"pagesearch","10":"pagesubmit"}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	//nav事件注册
	//公用app对象
	var app = {};

	//添加事件机制
	//===============
	var events = app.events = {};
	app.on = function (name, callback) {
		var list = events[name] || (events[name] = []);
		list.push(callback);
		return app;
	};
	app.off = function (name, callback) {
		if (!(name || callback)) {
			events = app.events = {};
			return app;
		}
		var list = events[name];
		if (list) {
			if (callback) {
				for (var i = list.length - 1; i >= 0; i--) {
					if (list[i] === callback) {
						list.splice(i, 1);
					}
				}
			} else {
				delete events[name];
			}
		}
		return app;
	};
	app.emit = function (name, data) {
		var list = events[name];

		if (list) {
			// Copy callback lists to prevent modification
			list = list.slice();
			// Execute event callbacks, use index because it's the faster.
			for (var i = 0, len = list.length; i < len; i++) {
				list[i](data);
			}
		}
		return app;
	};

	//默认注册头部事件
	//===================
	function initHead() {
		var $toggle = $('header .navtoggle');
		var $nav = $('nav');
		$toggle.on('click', function (e) {
			//隐藏
			if ($toggle.hasClass('active')) {
				$toggle.removeClass('active');
				app.hideMask();
				$nav.slideUp('fast');
				//显示
			} else {
				$toggle.addClass('active');
				app.showMask();
				$nav.slideDown('fast');
			}
		});
		$('body').on('click', '.g-mask', function () {
			$toggle.removeClass('active');
			app.hideMask();
			$nav.slideUp('fast');
		});
	}
	initHead();

	//获取资源文件的加载情况
	//由注册的回调函数获取
	//=======================
	function initImgStateChange() {

		var $imgs = $('img');

		var length = $imgs.length,
		    current = 0;

		$imgs.one('load', function () {

			current = current + 1;
			app.emit('imgstate', current / length * 100);
		}).each(function () {

			if (this.complete) $(this).load();
		});
	}
	initImgStateChange();

	//
	//当页面中有loading进度条时
	//调用此函数可以设置进度条进度
	app.setProgress = function (number) {
		var $loading = $('.p-loading');
		if ($loading.length <= 0) {
			return false;
		};
		number = Math.floor(number);
		$loading.find('.con-ico').css({ 'left': number - 40 + '%' });
		$loading.find('.con-top').css({ 'width': number + '%' });
		$loading.find('.con-number').text(number + '%');
	};

	var $body = $('body');
	var maskhtml = '<div class="g-mask"></div>';

	//显示全局遮罩
	app.showMask = function () {
		var $mask = $(maskhtml);
		$body.append($mask);
	};
	//隐藏全局遮罩
	app.hideMask = function () {
		var $mask = $('.g-mask');
		if ($mask.length > 0) $mask.remove();
	};

	exports.default = app;

/***/ }
/******/ ]);