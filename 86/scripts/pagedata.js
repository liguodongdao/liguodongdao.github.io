/*! created by 第一车网 */
webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _app = __webpack_require__(1);

	var _app2 = _interopRequireDefault(_app);

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//默认配置数据
	var typea = {
	    'type': 'ZN6-ECB8',
	    'level': '精英手动版',
	    'SFX': 'R6',
	    'price': 'pricea',
	    normals: {
	        a1: {
	            'name': '长×宽×高(*)', 'value': '4,240×1,775×1,320mm'
	        },
	        a2: {
	            'name': '轴距', 'value': '2,570mm'
	        },
	        a3: {
	            'name': '轮距(前/后)', 'value': '1,520/1,540mm'
	        },
	        a4: {
	            'name': '最小离地间隙(空载)', 'value': '130mm'
	        },
	        a5: {
	            'name': '最小转弯半径', 'value': '5.4m'
	        },
	        a6: {
	            'name': '整备质量', 'value': '1,245kg'
	        },
	        a7: {
	            'name': '满载质量', 'value': '1,670kg'
	        },
	        a8: {
	            'name': '轮胎规格', 'value': '205/55R 16'
	        },
	        a9: {
	            'name': '定员', 'value': '4'
	        },
	        b1: {
	            'name': '发动机', 'value': 'FA20'
	        },
	        b2: {
	            'name': '型式', 'value': '水平对置4缸.DOHC(**).自然吸气.直喷'
	        },
	        b3: {
	            'name': '排气量', 'value': '1,998cc'
	        },
	        b4: {
	            'name': '最大功率', 'value': '147kW/7,000rpm'
	        },
	        b5: {
	            'name': '最大扭矩', 'value': '205Nm/6,600rpm'
	        },
	        b6: {
	            'name': '缸径×行程', 'value': '86mm*86mm'
	        },
	        b7: {
	            'name': '压缩比', 'value': '12.5:1'
	        },
	        b8: {
	            'name': '变速箱型式', 'value': '6速手动'
	        },
	        b9: {
	            'name': '油箱容积', 'value': '50'
	        },
	        c1: {
	            'name': '制动系统(前/后)', 'value': '通风盘式/盘式'
	        },
	        c2: {
	            'name': '悬架系统(前/后)', 'value': '麦弗逊/双连杆'
	        },
	        c3: {
	            'name': '驱动方式', 'value': '后轮驱动'
	        },
	        c4: {
	            'name': '差速器', 'value': '托森差速器(Torsen LSD)'
	        }
	    },
	    config: {
	        a1: {
	            'name': 'LED前大灯(带自动水平调节和大灯清洗装置)', 'value': '●'
	        },
	        a2: {
	            'name': 'LED日间行车灯', 'value': '●'
	        },
	        a3: {
	            'name': 'LED前雾灯', 'value': '●'
	        },
	        a4: {
	            'name': 'LED高位刹车灯', 'value': '●'
	        },
	        a5: {
	            'name': '防紫外线车窗(前侧窗,后侧窗,后窗)', 'value': '●'
	        },
	        a6: {
	            'name': '双排气管和尾喉', 'value': '●'
	        },
	        a7: {
	            'name': '雨刷器(间隙可调)', 'value': '●'
	        },
	        a8: {
	            'name': '电动调节外后视镜(与车身同色,带加热及电动折叠)', 'value': '●'
	        },
	        b1: {
	            'name': '防眩目室内后视镜', 'value': '有框'
	        },
	        b2: {
	            'name': '遮阳板(驾驶席、副驾驶席)', 'value': '带化妆镜'
	        },
	        b3: {
	            'name': '仪表盘', 'value': '黑底色转速表'
	        },
	        b4: {
	            'name': '多功能信息显示系统', 'value': '●'
	        },
	        b5: {
	            'name': '方向盘'
	        },
	        b6: {
	            'name': '真皮', 'value': '-'
	        },
	        b7: {
	            'name': '多功能按键', 'value': '-'
	        },
	        b8: {
	            'name': '换挡拨片', 'value': '-'
	        },
	        b9: {
	            'name': '换挡手柄/手刹', 'value': '非真皮材质'
	        },
	        b10: {
	            'name': '迎宾照明系统', 'value': '●'
	        },
	        b11: {
	            'name': '室内照明灯(锁车后灯光渐弱)', 'value': '●'
	        },
	        b12: {
	            'name': '铝制踏板(加速踏板、制动踏板、脚歇踏板)', 'value': '-'
	        },
	        b13: {
	            'name': '12伏电源接口2个', 'value': '●'
	        },
	        b14: {
	            'name': '门饰板', 'value': '标准'
	        },
	        b15: {
	            'name': '迎宾踏板', 'value': '●'
	        },
	        b16: {
	            'name': '脚垫', 'value': '●'
	        },
	        c1: {
	            'name': '驾驶席、副驾驶席带颈椎伤害缓冲设计', 'value': '●'
	        },
	        c2: {
	            'name': '座椅材质(*)', 'value': '织物'
	        },
	        c3: {
	            'name': '座椅加热(前排)', 'value': '-'
	        },
	        c4: {
	            'name': '手动驾驶席可前后、垂直、翻到',
	            'value': '●'
	        },
	        c5: {
	            'name': '手动副驾驶可前后调节、翻到',
	            'value': '●'
	        },
	        c6: {
	            'name': '前排头枕带垂直调节(驾驶席&副驾驶席)',
	            'value': '●'
	        },
	        c7: {
	            'name': '一体式可倒式后排座椅',
	            'value': '●'
	        },
	        d1: {
	            'name': 'EPS(电动助力转向系统)',
	            'value': '●'
	        },
	        d2: {
	            'name': 'ABS防抱死制动系统(带EBD电子制动力分配系统)',
	            'value': '●'
	        },
	        d3: {
	            'name': 'VSC车身稳定控制系统(带Track模式)',
	            'value': '●'
	        },
	        d4: {
	            'name': 'HAC上坡辅助控制系统',
	            'value': '●'
	        },
	        d5: {
	            'name': '三模式自动变速箱(正常,运动,雪地)',
	            'value': '-'
	        },
	        d6: {
	            'name': 'ELR预紧3点式安全带',
	            'value': '●'
	        },
	        d7: {
	            'name': 'SRS空气囊(前排座椅正面及侧面,驾驶席膝部,帘式)',
	            'value': '●'
	        },
	        d8: {
	            'name': '防盗报警系统(带发动机锁止功能)',
	            'value': '●'
	        },
	        d9: {
	            'name': '智能钥匙及一键式启动',
	            'value': '-'
	        },
	        d10: {
	            'name': '定速巡航系统',
	            'value': '-'
	        },
	        d11: {
	            'name': '防夹电动车窗',
	            'value': '●'
	        },
	        d12: {
	            'name': '电动门锁',
	            'value': '●'
	        },
	        e1: {
	            'name': '空调',
	            'value': '手动'
	        },
	        e2: {
	            'name': 'AM/FM/CD',
	            'value': '●'
	        },
	        e3: {
	            'name': 'Audio Jack(USB+AUX)',
	            'value': '●'
	        }
	    }
	};
	var typeb = {
	    'type': 'ZN6-ECE8',
	    'level': '豪华手动版',
	    'SFX': 'M6',
	    'price': 'priceb',
	    normals: {
	        a1: {
	            'name': '长×宽×高(*)', 'value': '4,240×1,775×1,320mm'
	        },
	        a2: {
	            'name': '轴距', 'value': '2,570mm'
	        },
	        a3: {
	            'name': '轮距(前/后)', 'value': '1,520/1,540mm'
	        },
	        a4: {
	            'name': '最小离地间隙(空载)', 'value': '130mm'
	        },
	        a5: {
	            'name': '最小转弯半径', 'value': '5.4m'
	        },
	        a6: {
	            'name': '整备质量', 'value': '1,249kg'
	        },
	        a7: {
	            'name': '满载质量', 'value': '1,670kg'
	        },
	        a8: {
	            'name': '轮胎规格', 'value': '205/55R 16'
	        },
	        a9: {
	            'name': '定员', 'value': '4'
	        },
	        b1: {
	            'name': '发动机', 'value': 'FA20'
	        },
	        b2: {
	            'name': '型式', 'value': '水平对置4缸.DOHC(**).自然吸气.直喷'
	        },
	        b3: {
	            'name': '排气量', 'value': '1,998cc'
	        },
	        b4: {
	            'name': '最大功率', 'value': '147kW/7,000rpm'
	        },
	        b5: {
	            'name': '最大扭矩', 'value': '205Nm/6,600rpm'
	        },
	        b6: {
	            'name': '缸径×行程', 'value': '86mm*86mm'
	        },
	        b7: {
	            'name': '压缩比', 'value': '12.5:1'
	        },
	        b8: {
	            'name': '变速箱型式', 'value': '6速手动'
	        },
	        b9: {
	            'name': '油箱容积', 'value': '50'
	        },
	        c1: {
	            'name': '制动系统(前/后)', 'value': '通风盘式/盘式'
	        },
	        c2: {
	            'name': '悬架系统(前/后)', 'value': '麦弗逊/双连杆'
	        },
	        c3: {
	            'name': '驱动方式', 'value': '后轮驱动'
	        },
	        c4: {
	            'name': '差速器', 'value': '托森差速器(Torsen LSD)'
	        }
	    },
	    config: {
	        a1: {
	            'name': 'LED前大灯(带自动水平调节和大灯清洗装置)', 'value': '●'
	        },
	        a2: {
	            'name': 'LED日间行车灯', 'value': '●'
	        },
	        a3: {
	            'name': 'LED前雾灯', 'value': '●'
	        },
	        a4: {
	            'name': 'LED高位刹车灯', 'value': '●'
	        },
	        a5: {
	            'name': '防紫外线车窗(前侧窗,后侧窗,后窗)', 'value': '●'
	        },
	        a6: {
	            'name': '双排气管和尾喉', 'value': '●'
	        },
	        a7: {
	            'name': '雨刷器(间隙可调)', 'value': '●'
	        },
	        a8: {
	            'name': '电动调节外后视镜(与车身同色,带加热及电动折叠)', 'value': '●'
	        },
	        b1: {
	            'name': '防眩目室内后视镜', 'value': '无框'
	        },
	        b2: {
	            'name': '遮阳板(驾驶席、副驾驶席)', 'value': '带化妆镜及照明灯'
	        },
	        b3: {
	            'name': '仪表盘', 'value': '白底色转速表+车速数字显示'
	        },
	        b4: {
	            'name': '多功能信息显示系统', 'value': '4.2英寸TFT'
	        },
	        b5: {
	            'name': '方向盘'
	        },
	        b6: {
	            'name': '真皮', 'value': '●'
	        },
	        b7: {
	            'name': '多功能按键', 'value': '●'
	        },
	        b8: {
	            'name': '换挡拨片', 'value': '-'
	        },
	        b9: {
	            'name': '换挡手柄/手刹', 'value': '真皮材质'
	        },
	        b10: {
	            'name': '迎宾照明系统', 'value': '●'
	        },
	        b11: {
	            'name': '室内照明灯(锁车后灯光渐弱)', 'value': '●'
	        },
	        b12: {
	            'name': '铝制踏板(加速踏板、制动踏板、脚歇踏板)', 'value': '●'
	        },
	        b13: {
	            'name': '12伏电源接口2个', 'value': '●'
	        },
	        b14: {
	            'name': '门饰板', 'value': '豪华'
	        },
	        b15: {
	            'name': '迎宾踏板', 'value': '金属材质'
	        },
	        b16: {
	            'name': '脚垫', 'value': '●'
	        },
	        c1: {
	            'name': '驾驶席、副驾驶席带颈椎伤害缓冲设计', 'value': '●'
	        },
	        c2: {
	            'name': '座椅材质(*)', 'value': '真皮+Alcantara'
	        },
	        c3: {
	            'name': '座椅加热(前排)', 'value': '●'
	        },
	        c4: {
	            'name': '手动驾驶席可前后、垂直、翻到',
	            'value': '●'
	        },
	        c5: {
	            'name': '手动副驾驶可前后调节、翻到',
	            'value': '●'
	        },
	        c6: {
	            'name': '前排头枕带垂直调节(驾驶席&副驾驶席)',
	            'value': '●'
	        },
	        c7: {
	            'name': '一体式可倒式后排座椅',
	            'value': '●'
	        },
	        d1: {
	            'name': 'EPS(电动助力转向系统)',
	            'value': '●'
	        },
	        d2: {
	            'name': 'ABS防抱死制动系统(带EBD电子制动力分配系统)',
	            'value': '●'
	        },
	        d3: {
	            'name': 'VSC车身稳定控制系统(带Track模式)',
	            'value': '●'
	        },
	        d4: {
	            'name': 'HAC上坡辅助控制系统',
	            'value': '●'
	        },
	        d5: {
	            'name': '三模式自动变速箱(正常,运动,雪地)',
	            'value': '-'
	        },
	        d6: {
	            'name': 'ELR预紧3点式安全带',
	            'value': '●'
	        },
	        d7: {
	            'name': 'SRS空气囊(前排座椅正面及侧面,驾驶席膝部,帘式)',
	            'value': '●'
	        },
	        d8: {
	            'name': '防盗报警系统(带发动机锁止功能)',
	            'value': '●'
	        },
	        d9: {
	            'name': '智能钥匙及一键式启动',
	            'value': '●'
	        },
	        d10: {
	            'name': '定速巡航系统',
	            'value': '●'
	        },
	        d11: {
	            'name': '防夹电动车窗',
	            'value': '●'
	        },
	        d12: {
	            'name': '电动门锁',
	            'value': '●'
	        },
	        e1: {
	            'name': '空调',
	            'value': '独立双区域自动'
	        },
	        e2: {
	            'name': 'AM/FM/CD',
	            'value': '●'
	        },
	        e3: {
	            'name': 'Audio Jack(USB+AUX)',
	            'value': '●'
	        }
	    }
	};
	var typec = {
	    'type': 'ZN6-ECB7',
	    'level': '精英自动版',
	    'SFX': 'E6',
	    'price': 'pricec',
	    normals: {
	        a1: {
	            'name': '长×宽×高(*)', 'value': '4,240×1,775×1,320mm'
	        },
	        a2: {
	            'name': '轴距', 'value': '2,570mm'
	        },
	        a3: {
	            'name': '轮距(前/后)', 'value': '1,520/1,540mm'
	        },
	        a4: {
	            'name': '最小离地间隙(空载)', 'value': '130mm'
	        },
	        a5: {
	            'name': '最小转弯半径', 'value': '5.4m'
	        },
	        a6: {
	            'name': '整备质量', 'value': '1,266kg'
	        },
	        a7: {
	            'name': '满载质量', 'value': '1,700kg'
	        },
	        a8: {
	            'name': '轮胎规格', 'value': '205/55R 16'
	        },
	        a9: {
	            'name': '定员', 'value': '4'
	        },
	        b1: {
	            'name': '发动机', 'value': 'FA20'
	        },
	        b2: {
	            'name': '型式', 'value': '水平对置4缸.DOHC(**).自然吸气.直喷'
	        },
	        b3: {
	            'name': '排气量', 'value': '1,998cc'
	        },
	        b4: {
	            'name': '最大功率', 'value': '147kW/7,000rpm'
	        },
	        b5: {
	            'name': '最大扭矩', 'value': '205Nm/6,600rpm'
	        },
	        b6: {
	            'name': '缸径×行程', 'value': '86mm*86mm'
	        },
	        b7: {
	            'name': '压缩比', 'value': '12.5:1'
	        },
	        b8: {
	            'name': '变速箱型式', 'value': '6速自动带高级电子控制自动变速系统(SPDS)'
	        },
	        b9: {
	            'name': '油箱容积', 'value': '50'
	        },
	        c1: {
	            'name': '制动系统(前/后)', 'value': '通风盘式/盘式'
	        },
	        c2: {
	            'name': '悬架系统(前/后)', 'value': '麦弗逊/双连杆'
	        },
	        c3: {
	            'name': '驱动方式', 'value': '后轮驱动'
	        },
	        c4: {
	            'name': '差速器', 'value': '-'
	        }
	    },
	    config: {
	        a1: {
	            'name': 'LED前大灯(带自动水平调节和大灯清洗装置)', 'value': '●'
	        },
	        a2: {
	            'name': 'LED日间行车灯', 'value': '●'
	        },
	        a3: {
	            'name': 'LED前雾灯', 'value': '●'
	        },
	        a4: {
	            'name': 'LED高位刹车灯', 'value': '●'
	        },
	        a5: {
	            'name': '防紫外线车窗(前侧窗,后侧窗,后窗)', 'value': '●'
	        },
	        a6: {
	            'name': '双排气管和尾喉', 'value': '●'
	        },
	        a7: {
	            'name': '雨刷器(间隙可调)', 'value': '●'
	        },
	        a8: {
	            'name': '电动调节外后视镜(与车身同色,带加热及电动折叠)', 'value': '●'
	        },
	        b1: {
	            'name': '防眩目室内后视镜', 'value': '有框'
	        },
	        b2: {
	            'name': '遮阳板(驾驶席、副驾驶席)', 'value': '带化妆镜'
	        },
	        b3: {
	            'name': '仪表盘', 'value': '黑底色转速表'
	        },
	        b4: {
	            'name': '多功能信息显示系统', 'value': '●'
	        },
	        b5: {
	            'name': '方向盘'
	        },
	        b6: {
	            'name': '真皮', 'value': '-'
	        },
	        b7: {
	            'name': '多功能按键', 'value': '-'
	        },
	        b8: {
	            'name': '换挡拨片', 'value': '-'
	        },
	        b9: {
	            'name': '换挡手柄/手刹', 'value': '非真皮材质'
	        },
	        b10: {
	            'name': '迎宾照明系统', 'value': '●'
	        },
	        b11: {
	            'name': '室内照明灯(锁车后灯光渐弱)', 'value': '●'
	        },
	        b12: {
	            'name': '铝制踏板(加速踏板、制动踏板、脚歇踏板)', 'value': '-'
	        },
	        b13: {
	            'name': '12伏电源接口2个', 'value': '●'
	        },
	        b14: {
	            'name': '门饰板', 'value': '标准'
	        },
	        b15: {
	            'name': '迎宾踏板', 'value': '●'
	        },
	        b16: {
	            'name': '脚垫', 'value': '●'
	        },
	        c1: {
	            'name': '驾驶席、副驾驶席带颈椎伤害缓冲设计', 'value': '●'
	        },
	        c2: {
	            'name': '座椅材质(*)', 'value': '织物'
	        },
	        c3: {
	            'name': '座椅加热(前排)', 'value': '-'
	        },
	        c4: {
	            'name': '手动驾驶席可前后、垂直、翻到',
	            'value': '●'
	        },
	        c5: {
	            'name': '手动副驾驶可前后调节、翻到',
	            'value': '●'
	        },
	        c6: {
	            'name': '前排头枕带垂直调节(驾驶席&副驾驶席)',
	            'value': '●'
	        },
	        c7: {
	            'name': '一体式可倒式后排座椅',
	            'value': '●'
	        },
	        d1: {
	            'name': 'EPS(电动助力转向系统)',
	            'value': '●'
	        },
	        d2: {
	            'name': 'ABS防抱死制动系统(带EBD电子制动力分配系统)',
	            'value': '●'
	        },
	        d3: {
	            'name': 'VSC车身稳定控制系统(带Track模式)',
	            'value': '●'
	        },
	        d4: {
	            'name': 'HAC上坡辅助控制系统',
	            'value': '●'
	        },
	        d5: {
	            'name': '三模式自动变速箱(正常,运动,雪地)',
	            'value': '-'
	        },
	        d6: {
	            'name': 'ELR预紧3点式安全带',
	            'value': '●'
	        },
	        d7: {
	            'name': 'SRS空气囊(前排座椅正面及侧面,驾驶席膝部,帘式)',
	            'value': '●'
	        },
	        d8: {
	            'name': '防盗报警系统(带发动机锁止功能)',
	            'value': '●'
	        },
	        d9: {
	            'name': '智能钥匙及一键式启动',
	            'value': '-'
	        },
	        d10: {
	            'name': '定速巡航系统',
	            'value': '-'
	        },
	        d11: {
	            'name': '防夹电动车窗',
	            'value': '●'
	        },
	        d12: {
	            'name': '电动门锁',
	            'value': '●'
	        },
	        e1: {
	            'name': '空调',
	            'value': '手动'
	        },
	        e2: {
	            'name': 'AM/FM/CD',
	            'value': '●'
	        },
	        e3: {
	            'name': 'Audio Jack(USB+AUX)',
	            'value': '●'
	        }
	    }
	};
	var typed = {
	    'type': 'ZN6-ECE7',
	    'level': '豪华自动版',
	    'SFX': 'A6',
	    'price': 'priced',
	    normals: {
	        a1: {
	            'name': '长×宽×高(*)', 'value': '4,240×1,775×1,320mm'
	        },
	        a2: {
	            'name': '轴距', 'value': '2,570mm'
	        },
	        a3: {
	            'name': '轮距(前/后)', 'value': '1,520/1,540mm'
	        },
	        a4: {
	            'name': '最小离地间隙(空载)', 'value': '130mm'
	        },
	        a5: {
	            'name': '最小转弯半径', 'value': '5.4m'
	        },
	        a6: {
	            'name': '整备质量', 'value': '1,272kg'
	        },
	        a7: {
	            'name': '满载质量', 'value': '1,700kg'
	        },
	        a8: {
	            'name': '轮胎规格', 'value': '205/55R 16'
	        },
	        a9: {
	            'name': '定员', 'value': '4'
	        },
	        b1: {
	            'name': '发动机', 'value': 'FA20'
	        },
	        b2: {
	            'name': '型式', 'value': '水平对置4缸.DOHC(**).自然吸气.直喷'
	        },
	        b3: {
	            'name': '排气量', 'value': '1,998cc'
	        },
	        b4: {
	            'name': '最大功率', 'value': '147kW/7,000rpm'
	        },
	        b5: {
	            'name': '最大扭矩', 'value': '205Nm/6,600rpm'
	        },
	        b6: {
	            'name': '缸径×行程', 'value': '86mm*86mm'
	        },
	        b7: {
	            'name': '压缩比', 'value': '12.5:1'
	        },
	        b8: {
	            'name': '变速箱型式', 'value': '6速自动带高级电子控制自动变速系统(SPDS)'
	        },
	        b9: {
	            'name': '油箱容积', 'value': '50'
	        },
	        c1: {
	            'name': '制动系统(前/后)', 'value': '通风盘式/盘式'
	        },
	        c2: {
	            'name': '悬架系统(前/后)', 'value': '麦弗逊/双连杆'
	        },
	        c3: {
	            'name': '驱动方式', 'value': '后轮驱动'
	        },
	        c4: {
	            'name': '差速器', 'value': '托森差速器(Torsen LSD)'
	        }
	    },
	    config: {
	        a1: {
	            'name': 'LED前大灯(带自动水平调节和大灯清洗装置)', 'value': '●'
	        },
	        a2: {
	            'name': 'LED日间行车灯', 'value': '●'
	        },
	        a3: {
	            'name': 'LED前雾灯', 'value': '●'
	        },
	        a4: {
	            'name': 'LED高位刹车灯', 'value': '●'
	        },
	        a5: {
	            'name': '防紫外线车窗(前侧窗,后侧窗,后窗)', 'value': '●'
	        },
	        a6: {
	            'name': '双排气管和尾喉', 'value': '●'
	        },
	        a7: {
	            'name': '雨刷器(间隙可调)', 'value': '●'
	        },
	        a8: {
	            'name': '电动调节外后视镜(与车身同色,带加热及电动折叠)', 'value': '●'
	        },
	        b1: {
	            'name': '防眩目室内后视镜', 'value': '无框'
	        },
	        b2: {
	            'name': '遮阳板(驾驶席、副驾驶席)', 'value': '带化妆镜及照明灯'
	        },
	        b3: {
	            'name': '仪表盘', 'value': '白底色转速表+车速数字显示'
	        },
	        b4: {
	            'name': '多功能信息显示系统', 'value': '4.2英寸TFT'
	        },
	        b5: {
	            'name': '方向盘'
	        },
	        b6: {
	            'name': '真皮', 'value': '●'
	        },
	        b7: {
	            'name': '多功能按键', 'value': '●'
	        },
	        b8: {
	            'name': '换挡拨片', 'value': '●'
	        },
	        b9: {
	            'name': '换挡手柄/手刹', 'value': '真皮材质'
	        },
	        b10: {
	            'name': '迎宾照明系统', 'value': '●'
	        },
	        b11: {
	            'name': '室内照明灯(锁车后灯光渐弱)', 'value': '●'
	        },
	        b12: {
	            'name': '铝制踏板(加速踏板、制动踏板、脚歇踏板)', 'value': '●'
	        },
	        b13: {
	            'name': '12伏电源接口2个', 'value': '●'
	        },
	        b14: {
	            'name': '门饰板', 'value': '豪华'
	        },
	        b15: {
	            'name': '迎宾踏板', 'value': '金属材质'
	        },
	        b16: {
	            'name': '脚垫', 'value': '●'
	        },
	        c1: {
	            'name': '驾驶席、副驾驶席带颈椎伤害缓冲设计', 'value': '●'
	        },
	        c2: {
	            'name': '座椅材质(*)', 'value': '真皮+Alcantara'
	        },
	        c3: {
	            'name': '座椅加热(前排)', 'value': '●'
	        },
	        c4: {
	            'name': '手动驾驶席可前后、垂直、翻到',
	            'value': '●'
	        },
	        c5: {
	            'name': '手动副驾驶可前后调节、翻到',
	            'value': '●'
	        },
	        c6: {
	            'name': '前排头枕带垂直调节(驾驶席&副驾驶席)',
	            'value': '●'
	        },
	        c7: {
	            'name': '一体式可倒式后排座椅',
	            'value': '●'
	        },
	        d1: {
	            'name': 'EPS(电动助力转向系统)',
	            'value': '●'
	        },
	        d2: {
	            'name': 'ABS防抱死制动系统(带EBD电子制动力分配系统)',
	            'value': '●'
	        },
	        d3: {
	            'name': 'VSC车身稳定控制系统(带Track模式)',
	            'value': '●'
	        },
	        d4: {
	            'name': 'HAC上坡辅助控制系统',
	            'value': '●'
	        },
	        d5: {
	            'name': '三模式自动变速箱(正常,运动,雪地)',
	            'value': '-'
	        },
	        d6: {
	            'name': 'ELR预紧3点式安全带',
	            'value': '●'
	        },
	        d7: {
	            'name': 'SRS空气囊(前排座椅正面及侧面,驾驶席膝部,帘式)',
	            'value': '●'
	        },
	        d8: {
	            'name': '防盗报警系统(带发动机锁止功能)',
	            'value': '●'
	        },
	        d9: {
	            'name': '智能钥匙及一键式启动',
	            'value': '●'
	        },
	        d10: {
	            'name': '定速巡航系统',
	            'value': '●'
	        },
	        d11: {
	            'name': '防夹电动车窗',
	            'value': '●'
	        },
	        d12: {
	            'name': '电动门锁',
	            'value': '●'
	        },
	        e1: {
	            'name': '空调',
	            'value': '独立双区域自动'
	        },
	        e2: {
	            'name': 'AM/FM/CD',
	            'value': '●'
	        },
	        e3: {
	            'name': 'Audio Jack(USB+AUX)',
	            'value': '●'
	        }
	    }
	};

	console.log(_util2.default.getParam('type'));
	var type = _util2.default.getParam('type') || 'a';

	var infodata;
	switch (type) {
	    case 'a':
	        infodata = typea;
	        break;
	    case 'b':
	        infodata = typeb;
	        break;
	    case 'c':
	        infodata = typec;
	        break;
	    case 'd':
	        infodata = typed;
	        break;
	}

	var cardetail = new Vue({
	    el: '#cardata',
	    data: {
	        info: infodata,
	        state: {
	            'tablea': true,
	            'tableb': false
	        },
	        carType: type //select框
	    },
	    methods: {
	        'toggle': function toggle(number) {
	            if (number == 0) {
	                this.state.tablea = true;
	                this.state.tableb = false;
	            } else if (number == 1) {
	                this.state.tablea = false;
	                this.state.tableb = true;
	            }
	        }
	    }
	});

	cardetail.$watch('carType', function (newVal, oldVal) {
	    switch (newVal) {
	        case 'a':
	            this.info = typea;
	            break;
	        case 'b':
	            this.info = typeb;
	            break;
	        case 'c':
	            this.info = typec;
	            break;
	        case 'd':
	            this.info = typed;
	            break;
	    }
	    this.state.tablea = true;
	    this.state.tableb = false;
	});

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//工具类函数集合
	var util = {

	    //html 转义
	    html_encode: function html_encode(str) {
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
	    html_decode: function html_decode(str) {
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
	    resetSelect: function resetSelect($select, array, selectvalue) {
	        var optionStr = '';

	        if (array.length <= 0) return;

	        for (var i = 0; i < array.length; i++) {
	            if (_typeof(array[i]) == 'object') {
	                optionStr = optionStr + '<option value="' + array[i]['value'] + '">' + array[i]['name'] + '</option>';
	            } else {
	                optionStr = optionStr + '<option value="' + array[i] + '">' + array[i] + '</option>';
	            }
	        }

	        $select.html(optionStr);

	        if (selectvalue) {
	            $select.val(selectvalue);
	        } else {
	            $select[0].options[0].selected = true;
	        }
	        //todo 默认选中第一个 并触发事件
	        $select.trigger('change');
	    },

	    //获取请求参数
	    getParam: function getParam(name) {

	        var params = {};
	        var querys = location.search.slice(1).split('&');
	        querys.forEach(function (item) {
	            params[item.split('=')[0]] = item.split('=')[1];
	        });
	        return params[name] || false;
	    }
	};

	exports.default = util;

/***/ }
]);