/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	__webpack_require__(1);
	__webpack_require__(8);
	
	var mokit = __webpack_require__(9);
	var Router = __webpack_require__(48);
	var Touch = __webpack_require__(55);
	var Transition = __webpack_require__(57);
	var Frame = __webpack_require__(62);
	
	mokit.use(Router);
	mokit.use(Touch);
	mokit.use(Transition);
	
	var router = new mokit.Router();
	
	router.map({
	  '/': '/home',
	  '/home': __webpack_require__(65),
	  '/about': __webpack_require__(72)
	});
	
	router.start(Frame, document.body);

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var info = __webpack_require__(10);
	var utils = __webpack_require__(11);
	var Class = __webpack_require__(12);
	var Watcher = __webpack_require__(13);
	var Observer = __webpack_require__(14);
	var Template = __webpack_require__(16);
	var Component = __webpack_require__(43);
	var EventEmitter = __webpack_require__(15);
	
	//持载模板相关对象
	utils.copy(Template, Component);
	
	Component.version = info.version;
	Component.Template = Template;
	Component.Watcher = Watcher;
	Component.Observer = Observer;
	Component.EventEmitter = EventEmitter;
	Component.utils = utils;
	Component.Class = Class;
	
	//定义安装插件的方法
	Component.use = function (plugin) {
	  var install = plugin.install || plugin;
	  if (!utils.isFunction(install)) {
	    throw new Error('Invalid Plugin');
	  }
	  return install.call(plugin, this);
	};
	
	//安装内置的路由插件
	//Component.use(Router);
	
	module.exports = Component;

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = {
		"name": "mokit",
		"version": "3.0.6"
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	(function (ntils) {
	
	  /**
	   * 空函数
	   */
	  ntils.noop = function () { };
	
	  /**
	   * 验证一个对象是否为NULL
	   * @method isNull
	   * @param  {Object}  obj 要验证的对象
	   * @return {Boolean}     结果
	   * @static
	   */
	  ntils.isNull = function (obj) {
	    return obj === null || typeof obj === "undefined";
	  };
	
	  /**
	   * 除去字符串两端的空格
	   * @method trim
	   * @param  {String} str 源字符串
	   * @return {String}     结果字符串
	   * @static
	   */
	  ntils.trim = function (str) {
	    if (this.isNull(str)) return str;
	    if (str.trim) {
	      return str.trim();
	    } else {
	      return str.replace(/(^[\\s]*)|([\\s]*$)/g, "");
	    }
	  };
	
	  /**
	   * 替换所有
	   * @method replace
	   * @param {String} str 源字符串
	   * @param {String} str1 要替换的字符串
	   * @param {String} str2 替换为的字符串
	   * @static
	   */
	  ntils.replace = function (str, str1, str2) {
	    if (this.isNull(str)) return str;
	    return str.replace(new RegExp(str1, 'g'), str2);
	  };
	
	  /**
	   * 从字符串开头匹配
	   * @method startWith
	   * @param {String} str1 源字符串
	   * @param {String} str2 要匹配的字符串
	   * @return {Boolean} 匹配结果
	   * @static
	   */
	  ntils.startWith = function (str1, str2) {
	    if (this.isNull(str1) || this.isNull(str2)) return false;
	    return str1.indexOf(str2) === 0;
	  };
	
	  /**
	   * 是否包含
	   * @method contains
	   * @param {String} str1 源字符串
	   * @param {String} str2 检查包括字符串
	   * @return {Boolean} 结果
	   * @static
	   */
	  ntils.contains = function (str1, str2) {
	    var self = this;
	    if (this.isNull(str1) || this.isNull(str2)) return false;
	    return str1.indexOf(str2) > -1;
	  };
	
	  /**
	   * 从字符串结束匹配
	   * @method endWidth
	   * @param {String} str1 源字符串
	   * @param {String} str2 匹配字符串
	   * @return {Boolean} 匹配结果
	   * @static
	   */
	  ntils.endWith = function (str1, str2) {
	    if (this.isNull(str1) || this.isNull(str2)) return false;
	    return str1.indexOf(str2) === (str1.length - str2.length);
	  };
	
	  /**
	   * 是否包含属性
	   * @method hasProperty
	   * @param  {Object}  obj  对象
	   * @param  {String}  name 属性名
	   * @return {Boolean}      结果
	   * @static
	   */
	  ntils.has = ntils.hasProperty = function (obj, name) {
	    if (this.isNull(obj) || this.isNull(name)) return false;
	    return (name in obj) || (obj.hasOwnProperty(name));
	  };
	
	  /**
	   * 验证一个对象是否为Function
	   * @method isFunction
	   * @param  {Object}  obj 要验证的对象
	   * @return {Boolean}     结果
	   * @static
	   */
	  ntils.isFunction = function (obj) {
	    if (this.isNull(obj)) return false;
	    return typeof obj === "function";
	  };
	
	  /**
	   * 验证一个对象是否为String
	   * @method isString
	   * @param  {Object}  obj 要验证的对象
	   * @return {Boolean}     结果
	   * @static
	   */
	  ntils.isString = function (obj) {
	    if (this.isNull(obj)) return false;
	    return typeof obj === 'string' || obj instanceof String;
	  };
	
	  /**
	   * 验证一个对象是否为Number
	   * @method isNumber
	   * @param  {Object}  obj 要验证的对象
	   * @return {Boolean}     结果
	   * @static
	   */
	  ntils.isNumber = function (obj) {
	    if (this.isNull(obj)) return false;
	    return typeof obj === 'number' || obj instanceof Number;
	  };
	
	  /**
	   * 验证一个对象是否为Boolean
	   * @method isBoolean
	   * @param  {Object}  obj 要验证的对象
	   * @return {Boolean}     结果
	   * @static
	   */
	  ntils.isBoolean = function (obj) {
	    if (this.isNull(obj)) return false;
	    return typeof obj === 'boolean' || obj instanceof Boolean;
	  };
	
	  /**
	   * 验证一个对象是否为HTML Element
	   * @method isElement
	   * @param  {Object}  obj 要验证的对象
	   * @return {Boolean}     结果
	   * @static
	   */
	  ntils.isElement = function (obj) {
	    if (this.isNull(obj)) return false;
	    if (window.Element) {
	      return obj instanceof Element;
	    } else {
	      return (obj.tagName && obj.nodeType && obj.nodeName && obj.attributes && obj.ownerDocument);
	    }
	  };
	
	  /**
	   * 验证一个对象是否为HTML Text Element
	   * @method isText
	   * @param  {Object}  obj 要验证的对象
	   * @return {Boolean}     结果
	   * @static
	   */
	  ntils.isText = function (obj) {
	    if (this.isNull(obj)) return false;
	    return obj instanceof Text;
	  };
	
	  /**
	   * 验证一个对象是否为Object
	   * @method isObject
	   * @param  {Object}  obj 要验证的对象
	   * @return {Boolean}     结果
	   * @static
	   */
	  ntils.isObject = function (obj) {
	    if (this.isNull(obj)) return false;
	    return typeof obj === "object";
	  };
	
	  /**
	   * 验证一个对象是否为Array或伪Array
	   * @method isArray
	   * @param  {Object}  obj 要验证的对象
	   * @return {Boolean}     结果
	   * @static
	   */
	  ntils.isArray = function (obj) {
	    if (this.isNull(obj)) return false;
	    var v1 = Object.prototype.toString.call(obj) === '[object Array]';
	    var v2 = obj instanceof Array;
	    var v3 = !this.isString(obj) && this.isNumber(obj.length) && this.isFunction(obj.splice);
	    var v4 = !this.isString(obj) && this.isNumber(obj.length) && obj[0];
	    return v1 || v2 || v3 || v4;
	  };
	
	  /**
	   * 验证是不是一个日期对象
	   * @method isDate
	   * @param {Object} val   要检查的对象
	   * @return {Boolean}           结果
	   * @static
	   */
	  ntils.isDate = function (val) {
	    if (this.isNull(val)) return false;
	    return val instanceof Date;
	  };
	
	  /**
	   * 验证是不是一个正则对象
	   * @method isDate
	   * @param {Object} val   要检查的对象
	   * @return {Boolean}           结果
	   * @static
	   */
	  ntils.isRegexp = function (val) {
	    return val instanceof RegExp;
	  };
	
	  /**
	   * 转换为数组
	   * @method toArray
	   * @param {Array|Object} array 伪数组
	   * @return {Array} 转换结果数组
	   * @static
	   */
	  ntils.toArray = function (array) {
	    if (this.isNull(array)) return [];
	    return Array.prototype.slice.call(array);
	  };
	
	  /**
	   * 转为日期格式
	   * @method toDate
	   * @param {Number|String} val 日期字符串或整型数值
	   * @return {Date} 日期对象
	   * @static
	   */
	  ntils.toDate = function (val) {
	    var self = this;
	    if (self.isNumber(val))
	      return new Date(val);
	    else if (self.isString(val))
	      return new Date(self.replace(self.replace(val, '-', '/'), 'T', ' '));
	    else if (self.isDate(val))
	      return val;
	    else
	      return null;
	  };
	
	  /**
	   * 遍历一个对像或数组
	   * @method each
	   * @param  {Object or Array}   obj  要遍历的数组或对象
	   * @param  {Function} fn            处理函数
	   * @return {void}                   无返回值
	   * @static
	   */
	  ntils.each = function (list, handler, scope) {
	    if (this.isNull(list) || this.isNull(handler)) return;
	    if (this.isArray(list)) {
	      var listLength = list.length;
	      for (var i = 0; i < listLength; i++) {
	        var rs = handler.call(scope || list[i], i, list[i]);
	        if (!this.isNull(rs)) return rs;
	      }
	    } else {
	      for (var key in list) {
	        var rs = handler.call(scope || list[key], key, list[key]);
	        if (!this.isNull(rs)) return rs;
	      }
	    }
	  };
	
	  /**
	   * 格式化日期
	   * @method formatDate
	   * @param {Date|String|Number} date 日期
	   * @param {String} format 格式化字符串
	   * @param {object} dict 反译字典
	   * @return {String} 格式化结果
	   * @static
	   */
	  ntils.formatDate = function (date, format, dict) {
	    if (this.isNull(format) || this.isNull(date)) return date;
	    date = this.toDate(date);
	    dict = dict || {};
	    var placeholder = {
	      "M+": date.getMonth() + 1, //month
	      "d+": date.getDate(), //day
	      "h+": date.getHours(), //hour
	      "m+": date.getMinutes(), //minute
	      "s+": date.getSeconds(), //second
	      "w+": date.getDay(), //week
	      "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
	      "S": date.getMilliseconds() //millisecond
	    }
	    if (/(y+)/.test(format)) {
	      format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	    }
	    for (var key in placeholder) {
	      if (new RegExp("(" + key + ")").test(format)) {
	        var value = placeholder[key];
	        value = dict[value] || value;
	        format = format.replace(RegExp.$1, RegExp.$1.length == 1
	          ? value : ("00" + value).substr(("" + value).length));
	      }
	    }
	    return format;
	  };
	
	  /**
	   * 拷贝对象
	   * @method copy
	   * @param {Object} src 源对象
	   * @param {Object} dst 目标对象
	   * @static
	   */
	  ntils.copy = function (src, dst, igonres) {
	    dst = dst || (this.isArray(src) ? [] : {});
	    this.each(src, function (key) {
	      if (igonres && igonres.indexOf(key) > -1) return;
	      delete dst[key];
	      if (Object.getOwnPropertyDescriptor) {
	        try {
	          Object.defineProperty(dst, key, Object.getOwnPropertyDescriptor(src, key));
	        } catch (ex) {
	          dst[key] = src[key];
	        }
	      } else {
	        dst[key] = src[key];
	      }
	    })
	    return dst;
	  };
	
	  /**
	   * 深度克隆对象
	   * @method clone
	   * @param {Object} src 源对象
	   * @return {Object} 新对象
	   * @static
	   */
	  ntils.clone = function (src, igonres) {
	    if (this.isNull(src) ||
	      this.isString(src) ||
	      this.isNumber(src) ||
	      this.isBoolean(src) ||
	      this.isDate(src)) {
	      return src;
	    }
	    var objClone = src;
	    try {
	      objClone = new src.constructor();
	    } catch (ex) { }
	    this.each(src, function (key, value) {
	      if (objClone[key] != value && !this.contains(igonres, key)) {
	        if (this.isObject(value)) {
	          objClone[key] = this.clone(value, igonres);
	        } else {
	          objClone[key] = value;
	        }
	      }
	    }, this);
	    ['toString', 'valueOf'].forEach(function (key) {
	      if (this.contains(igonres, key)) return;
	      this.defineFreezeProp(objClone, key, src[key]);
	    }, this);
	    return objClone;
	  };
	
	  /**
	   * 合并对象
	   * @method mix
	   * @return 合并后的对象
	   * @param {Object} dst 目标对象
	   * @param {Object} src 源对象
	   * @param {Array} igonres 忽略的属性名,
	   * @param {Number} mode 模式
	   */
	  ntils.mix = function (dst, src, igonres, mode) {
	    //根据模式来判断，默认是Obj to Obj的  
	    if (mode) {
	      switch (mode) {
	        case 1: // proto to proto  
	          return ntils.mix(dst.prototype, src.prototype, igonres, 0);
	        case 2: // object to object and proto to proto  
	          ntils.mix(dst.prototype, src.prototype, igonres, 0);
	          break; // pass through  
	        case 3: // proto to static  
	          return ntils.mix(dst, src.prototype, igonres, 0);
	        case 4: // static to proto  
	          return ntils.mix(dst.prototype, src, igonres, 0);
	        default: // object to object is what happens below  
	      }
	    }
	    //---
	    src = src || {};
	    dst = dst || (this.isArray(src) ? [] : {});
	    this.keys(src).forEach(function (key) {
	      if (this.contains(igonres, key)) return;
	      if (this.isObject(src[key]) &&
	        (src[key].constructor == Object ||
	          src[key].constructor == Array ||
	          src[key].constructor == null)) {
	        dst[key] = ntils.mix(dst[key], src[key], igonres, 0);
	      } else {
	        dst[key] = src[key];
	      }
	    }, this);
	    return dst;
	  };
	
	  /**
	   * 定义不可遍历的属性
	   **/
	  ntils.defineFreezeProp = function (obj, name, value) {
	    try {
	      Object.defineProperty(obj, name, {
	        value: value,
	        enumerable: false,
	        configurable: true, //能不能重写定义
	        writable: false //能不能用「赋值」运算更改
	      });
	    } catch (err) {
	      obj[name] = value;
	    }
	  };
	
	  /**
	   * 获取所有 key 
	   */
	  ntils.keys = function (obj) {
	    if (Object.keys) return Object.keys(obj);
	    var keys = [];
	    this.each(obj, function (key) {
	      keys.push(key);
	    });
	    return keys;
	  };
	
	  /**
	   * 创建一个对象
	   */
	  ntils.create = function (proto, props) {
	    if (Object.create) return Object.create(proto, props);
	    var Cotr = function () { };
	    Cotr.prototype = proto;
	    var obj = new Cotr();
	    if (props) this.copy(props, obj);
	    return obj;
	  };
	
	  /**
	   * 设置 proto
	   * 在不支持 setPrototypeOf 也不支持 __proto__ 的浏览器
	   * 中，会采用 copy 方式
	   */
	  ntils.setPrototypeOf = function (obj, proto) {
	    if (Object.setPrototypeOf) {
	      return Object.setPrototypeOf(obj, proto || this.create(null));
	    } else {
	      if (!('__proto__' in Object)) this.copy(proto, obj);
	      obj.__proto__ = proto;
	    }
	  };
	
	  /**
	   * 获取 proto
	   */
	  ntils.getPrototypeOf = function (obj) {
	    if (obj.__proto__) return obj.__proto__;
	    if (Object.getPrototypeOf) return Object.getPrototypeOf(obj);
	    if (obj.constructor) return obj.constructor.prototype;
	  };
	
	  /**
	   * 是否深度相等
	   */
	  ntils.deepEqual = function (a, b) {
	    if (a === b) return true;
	    if (!this.isObject(a) || !this.isObject(b)) return false;
	    var aKeys = this.keys(a);
	    var bKeys = this.keys(b);
	    if (aKeys.length !== bKeys.length) return false;
	    var allKeys = aKeys.concat(bKeys);
	    var checkedMap = this.create(null);
	    var result = true;
	    this.each(allKeys, function (i, key) {
	      if (checkedMap[key]) return;
	      if (!this.deepEqual(a[key], b[key])) result = false;
	      checkedMap[key] = true;
	    }, this);
	    return result;
	  };
	
	  /**
	   * 从一个数值循环到别一个数
	   * @param {number} fromNum 开始数值
	   * @param {Number} toNum 结束数值
	   * @param {Number} step 步长值
	   * @param {function} handler 执行函数
	   * @returns {void} 无返回
	   */
	  ntils.fromTo = function (fromNum, toNum, step, handler) {
	    if (!handler) handler = [step, step = handler][0];
	    step = Math.abs(step || 1);
	    if (fromNum < toNum) {
	      for (var i = fromNum; i <= toNum; i += step) handler(i);
	    } else {
	      for (var i = fromNum; i >= toNum; i -= step) handler(i);
	    }
	  };
	
	  /**
	   * 生成一个Guid
	   * @method newGuid
	   * @return {String} GUID字符串
	   * @static
	   */
	  ntils.newGuid = function () {
	    var S4 = function () {
	      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	    };
	    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
	  };
	
	  /**
	   * 对象变换
	   **/
	  ntils.map = function (list, fn) {
	    var buffer = this.isArray(list) ? [] : {};
	    this.each(list, function (name, value) {
	      buffer[name] = fn(name, value);
	    });
	    return buffer;
	  };
	
	  /**
	   * 通过路径设置属性值
	   */
	  ntils.setByPath = function (obj, path, value) {
	    if (this.isNull(obj) || this.isNull(path) || path === '') {
	      return;
	    }
	    if (!this.isArray(path)) {
	      path = path.replace(/\[/, '.').replace(/\]/, '.').split('.');
	    }
	    this.each(path, function (index, name) {
	      if (this.isNull(name) || name.length < 1) return;
	      if (index === path.length - 1) {
	        obj[name] = value;
	      } else {
	        obj[name] = obj[name] || {};
	        obj = obj[name];
	      }
	    }, this);
	  };
	
	  /**
	   * 通过路径获取属性值
	   */
	  ntils.getByPath = function (obj, path) {
	    if (this.isNull(obj) || this.isNull(path) || path === '') {
	      return obj;
	    }
	    if (!this.isArray(path)) {
	      path = path.replace(/\[/, '.').replace(/\]/, '.').split('.');
	    }
	    this.each(path, function (index, name) {
	      if (this.isNull(name) || name.length < 1) return;
	      if (!this.isNull(obj)) obj = obj[name];
	    }, this);
	    return obj;
	  };
	
	  /**
	   * 数组去重
	   **/
	  ntils.unique = function (array) {
	    if (this.isNull(array)) return array;
	    var newArray = [];
	    this.each(array, function (i, value) {
	      if (newArray.indexOf(value) > -1) return;
	      newArray.push(value);
	    });
	    return newArray;
	  };
	
	  /**
	   * 解析 function 的参数列表
	   **/
	  ntils.getFunctionArgumentNames = function (fn) {
	    if (!fn) return [];
	    var src = fn.toString();
	    var parts = src.split(')')[0].split('=>')[0].split('(');
	    return (parts[1] || parts[0]).split(',').map(function (name) {
	      return name.trim();
	    }).filter(function (name) {
	      return name != 'function';
	    });
	  };
	
	  /**
	   * 缩短字符串
	   */
	  ntils.short = function (str, maxLength) {
	    if (!str) return str;
	    maxLength = maxLength || 40;
	    var strLength = str.length;
	    var trimLength = maxLength / 2;
	    return strLength > maxLength ? str.substr(0, trimLength) + '...' + str.substr(strLength - trimLength) : str;
	  };
	
	  /**
	   * 首字母大写
	   */
	  ntils.firstUpper = function (str) {
	    if (this.isNull(str)) return;
	    str[0] = str[0].toLowerCase();
	    return str;
	  };
	
	  /**
	   * 解析字符串为 dom 
	   * @param {string} str 字符串
	   * @returns {HTMLNode} 解析后的 DOM 
	   */
	  ntils.parseDom = function (str) {
	    this._PDD_ = this._PDD_ || document.createElement('div');
	    this._PDD_.innerHTML = ntils.trim(str);
	    var firstNode = this._PDD_.childNodes[0];
	    //先 clone 一份再通过 innerHTML 清空
	    //否则 IE9 下，清空时会导出返回的 DOM 没有子结点
	    if (firstNode) firstNode = firstNode.cloneNode(true);
	    this._PDD_.innerHTML = '';
	    return firstNode;
	  };
	
	})(( false) ? (window.ntils = {}) : exports);

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	const utils = __webpack_require__(11);
	
	function ClassFactory(options) {
	  //处理 options
	  options = options || utils.create(null);
	  options.$name = options.$name || 'Class';
	  options.$extends = options.$extends || ClassFactory;
	  options.$static = options.$static || utils.create(null);
	  //处理父类 prototype
	  var superPrototype = utils.isFunction(options.$extends) ?
	    options.$extends.prototype : options.$extends;
	  //定义新类
	  var Class = function () {
	    //处理 super
	    if (!this.$super) {
	      utils.defineFreezeProp(this, '$super', function () {
	        if (this._super_called_) return this._super_ret_;
	        this._super_called_ = true;
	        if (utils.isFunction(options.$extends)) {
	          this._super_ret_ = options.$extends.apply(this, arguments);
	          //这几行确保可继承于数组
	          if (this._super_ret_) {
	            var proto = utils.getPrototypeOf(this);
	            utils.setPrototypeOf(proto, this._super_ret_);
	          }
	        } else {
	          this._super_ret_ = options.$extends;
	        }
	        return this._super_ret_;
	      });
	      for (var name in superPrototype) {
	        var value = superPrototype[name];
	        if (utils.isFunction(value)) {
	          this.$super[name] = value.bind(this);
	        } else {
	          this.$super[name] = value;
	        }
	      }
	    }
	    //调用构造
	    if (utils.isFunction(options.constructor) &&
	      options.constructor !== Object) {
	      return options.constructor.apply(this, arguments);
	    } else {
	      //如果没有实现 constructor 则调用父类构造
	      this.$super.apply(this, arguments);
	    }
	  };
	  //处理 prototype
	  Class.prototype = utils.create(superPrototype);
	  utils.copy(options, Class.prototype);
	  utils.defineFreezeProp(Class.prototype, '$class', Class);
	  //处理静态成员
	  utils.copy(options.$static, Class);
	  if (utils.isFunction(options.$extends)) {
	    utils.setPrototypeOf(Class, options.$extends);
	  }
	  if (!options.$extends.$extend) {
	    utils.copy(ClassFactory, Class);
	  }
	  utils.defineFreezeProp(Class, '$super', options.$extends);
	  //--
	  return Class;
	}
	
	//定义扩展方法
	ClassFactory.$extend = function (options) {
	  options.$extends = this;
	  return new ClassFactory(options);
	};
	
	ClassFactory.Class = ClassFactory;
	module.exports = ClassFactory;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Class = __webpack_require__(12);
	var utils = __webpack_require__(11);
	
	/**
	 * Watcher 类
	 * 通过「计算函数」、「执行函数」可以创建一个 Watcher 实例
	 */
	var Watcher = new Class({
	
	  /**
	   * 通过「计算函数」、「执行函数」构建一个 Watcher 实例
	   * @param {function} calcor 计算函数
	   * @param {function} handler 处理函数
	   * @param {boolean} first 是否自动执行第一次
	   * @returns {void} 无返回
	   */
	  constructor: function /*istanbul ignore next*/constructor(calcor, handler, first) {
	    if (!utils.isFunction(calcor) || !utils.isFunction(handler)) {
	      throw new Error('Invalid parameters');
	    }
	    this.calcor = calcor;
	    this.handler = handler;
	    if (first) this.calc(true);
	  },
	
	  /**
	   * 执行计算
	   * @param {boolean} force 是否强制触发「计算函数」
	   * @returns {Object} 计算后的值
	   */
	  calc: function /*istanbul ignore next*/calc(force) {
	    var newValue = this.calcor();
	    if (force || !utils.deepEqual(newValue, this.value)) {
	      this.handler(newValue, this.value);
	    }
	    this.value = utils.clone(newValue);
	  }
	
	});
	
	module.exports = Watcher;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Class = __webpack_require__(12);
	var utils = __webpack_require__(11);
	var EventEmitter = __webpack_require__(15);
	
	var OBSERVER_PROP_NAME = '_observer_';
	var CHANGE_EVENT_NAME = 'change';
	var EVENT_MAX_DISPATCH_LAYER = 20;
	var IGNORE_REGEXPS = [/^\_(.*)\_$/i, /^\_\_/i];
	
	/**
	 * 对象观察类，可以监控对象变化
	 * 目前方案问题:
	 *   对于父子关系和事件冒泡，目前方案如果用 delete 删除一个属性，无关真实删除关系，
	 *   即便调用 clearReference 也无法再清除关系，子对象的 parents 中会一直有一个引用，当前方案最高效
	 * 其它方法一:
	 *   将「关系」放入全局数组中，然后将 ob.parents 变成一个「属性」从全局数组件中 filter 出来，
	 *   基本和目前方法类似，但是关系在外部存领教，所以 clearReference 可清除。
	 * 其它方案二: 
	 *   构造时添加到全局数组，每一个 observer change 时都让放到全局的 observer 遍历自身的，
	 *   检果事件源是不是自已的子对象，如果是则触发自身 change 事件，这样 ob 对象本身没有相关引用
	 *   clearReference 时只从全局清除掉就行了，并且 delete 操作也不会影响，但效率稍差。
	 * 其它方案三: 
	 *   给构造函数添加一个 deep 属性，只有 deep 的 ob 对象，才放入到全局数组中，检查时逻辑同方案二
	 *   但是因为要检查的对象会少很多，效率会更高一点。
	 */
	var Observer = new Class({
	  $extends: EventEmitter,
	
	  /**
	   * 通过目标对象构造一个观察对象
	   * @param {Object} target 目标对象
	   * @param {Object} options 选项
	   * @returns {void} 无返回
	   */
	  constructor: function /*istanbul ignore next*/constructor(target, options) {
	    if (utils.isNull(target)) {
	      throw new Error('Invalid target');
	    }
	    options = options || {};
	    var observer = target[OBSERVER_PROP_NAME];
	    if (observer) {
	      utils.copy(options, observer.options);
	      if (observer.options.root) {
	        observer.parents.length = 0;
	      }
	      observer.apply();
	      return observer;
	    }
	    EventEmitter.call(this);
	    utils.defineFreezeProp(this, 'options', options);
	    utils.defineFreezeProp(this, 'shadow', {});
	    utils.defineFreezeProp(this, 'target', target);
	    utils.defineFreezeProp(this, 'parents', []);
	    utils.defineFreezeProp(target, OBSERVER_PROP_NAME, this);
	    this.apply();
	  },
	
	  /**
	   * 添加一个属性，动态添中的属性，无法被观察，
	   * 但是通过 set 方法添加的属性可能被观察。
	   * @param {string} name 名称
	   * @param {Object} value 值
	   * @returns {void} 无返回
	   */
	  set: function /*istanbul ignore next*/set(name, value) {
	    if (utils.isFunction(value) || Observer.isIgnore(name)) {
	      return;
	    }
	    Object.defineProperty(this.target, name, {
	      get: function /*istanbul ignore next*/get() {
	        return this[OBSERVER_PROP_NAME].shadow[name];
	      },
	      set: function /*istanbul ignore next*/set(value) {
	        var observer = this[OBSERVER_PROP_NAME];
	        var oldValue = observer.shadow[name];
	        if (oldValue === value) return;
	        if (utils.isObject(value)) {
	          var childObserver = new Observer(value);
	          observer.addChild(childObserver, name);
	        }
	        //移除旧值的父引用
	        //如果用 delete 删除属性将无法移除父子引用
	        if (oldValue && oldValue[OBSERVER_PROP_NAME]) {
	          observer.removeChild(oldValue[OBSERVER_PROP_NAME], name);
	        }
	        observer.shadow[name] = value;
	        observer.emitChange({ path: name, value: value });
	      },
	      configurable: true,
	      enumerable: true
	    });
	    this.target[name] = value;
	  },
	
	  /**
	   * 自动应用所有动态添加的属性
	   * @returns {void} 无返回
	   */
	  apply: function /*istanbul ignore next*/apply() {
	    if (utils.isArray(this.target)) {
	      this._wrapArray(this.target);
	    }
	    var names = this._getPropertyNames(this.target);
	    names.forEach(function (name) {
	      var desc = Object.getOwnPropertyDescriptor(this.target, name);
	      if (!('value' in desc)) return;
	      this.set(name, this.target[name]);
	    }, this);
	  },
	
	  /**
	   * 清除所有父子引用
	   * @returns {void} 无返回
	   */
	  clearReference: function /*istanbul ignore next*/clearReference() {
	    utils.each(this.target, function (name, value) {
	      if (utils.isNull(value)) return;
	      var child = value[OBSERVER_PROP_NAME];
	      if (child) this.removeChild(child);
	    }, this);
	  },
	
	  /**
	   * 派发一个事件，事件会向父级对象冒泡
	   * @param {string} eventName 事件名称
	   * @param {Object} event 事件对象
	   * @returns {void} 无返回
	   */
	  dispatch: function /*istanbul ignore next*/dispatch(eventName, event) {
	    if (event._src_ === this) return;
	    event._src_ = event._src_ || this;
	    event._layer_ = event._layer_ || 0;
	    event._layer_++;
	    if (event._layer_ >= EVENT_MAX_DISPATCH_LAYER) return;
	    this.emit(eventName, event);
	    if (!this.parents || this.parents.length < 1) return;
	    this.parents.forEach(function (item) {
	      if (!(item.name in item.parent.target)) {
	        return item.parent.removeChild(this);
	      }
	      var parentEvent = utils.copy(event);
	      parentEvent.path = item.name + '.' + event.path;
	      item.parent.dispatch(eventName, parentEvent);
	    }, this);
	  },
	
	  /**
	   * 添子观察者对象
	   * @param {Object} child 父对象
	   * @param {String} name 属性名
	   * @returns {void} 无返回
	   */
	  addChild: function /*istanbul ignore next*/addChild(child, name) {
	    if (utils.isNull(child) || utils.isNull(name)) {
	      throw new Error('Invalid paramaters');
	    }
	    if (child.options.root) return;
	    child.parents.push({ parent: this, name: name });
	  },
	
	  /**
	   * 移除子对象
	   * @param {Object} child 父对象
	   * @param {String} name 属性名
	   * @returns {void} 无返回
	   */
	  removeChild: function /*istanbul ignore next*/removeChild(child, name) {
	    if (utils.isNull(child)) {
	      throw new Error('Invalid paramaters');
	    }
	    var foundIndex = -1;
	    child.parents.forEach(function (item, index) {
	      if (item.parent === this && item.name === name) {
	        foundIndex = index;
	      }
	    }, this);
	    if (foundIndex > -1) {
	      child.parents.splice(foundIndex, 1);
	    }
	  },
	
	  /**
	   * 触发 change 事件
	   * @param {Object} event 事件对象
	   * @returns {void} 无返回
	   */
	  emitChange: function /*istanbul ignore next*/emitChange(event) {
	    this.dispatch(CHANGE_EVENT_NAME, event);
	  },
	
	  /**
	   * 获取所有成员名称列表
	   * @returns {Array} 所有成员名称列表
	   */
	  _getPropertyNames: function /*istanbul ignore next*/_getPropertyNames() {
	    var names = utils.isArray(this.target) ? this.target.map(function (item, index) {
	      return index;
	    }) : Object.keys(this.target);
	    return names.filter(function (name) {
	      return name !== OBSERVER_PROP_NAME;
	    });
	  },
	
	  /**
	   * 包裹数组
	   * @param {array} array 源数组
	   * @returns {array} 处理后的数组
	   */
	  _wrapArray: function /*istanbul ignore next*/_wrapArray(array) {
	    utils.defineFreezeProp(array, 'push', function () {
	      var items = [].slice.call(arguments);
	      items.forEach(function (item) {
	        //这里也会触发对应 index 的 change 事件
	        this[OBSERVER_PROP_NAME].set(array.length, item);
	      }, this);
	      this[OBSERVER_PROP_NAME].emitChange({ path: 'length', value: this.length });
	    });
	    utils.defineFreezeProp(array, 'pop', function () {
	      var item = [].pop.apply(this, arguments);
	      this[OBSERVER_PROP_NAME].emitChange({ path: this.length, value: item });
	      this[OBSERVER_PROP_NAME].emitChange({ path: 'length', value: this.length });
	      return item;
	    });
	    utils.defineFreezeProp(array, 'unshift', function () {
	      var items = [].slice.call(arguments);
	      items.forEach(function (item) {
	        //这里也会触发对应 index 的 change 事件
	        this[OBSERVER_PROP_NAME].set(0, item);
	      }, this);
	      this[OBSERVER_PROP_NAME].emitChange({ path: 'length', value: this.length });
	    });
	    utils.defineFreezeProp(array, 'shift', function () {
	      var item = [].shift.apply(this, arguments);
	      this[OBSERVER_PROP_NAME].emitChange({ path: 0, value: item });
	      this[OBSERVER_PROP_NAME].emitChange({ path: 'length', value: this.length });
	      return item;
	    });
	    utils.defineFreezeProp(array, 'splice', function () {
	      var startIndex = arguments[0];
	      var endIndex = utils.isNull(arguments[1]) ? startIndex + arguments[1] : this.length - 1;
	      var items = [].splice.apply(this, arguments);
	      for (var i = startIndex; i <= endIndex; i++) {
	        this[OBSERVER_PROP_NAME].emitChange({ path: i, value: items[i - startIndex] });
	      }
	      this[OBSERVER_PROP_NAME].emitChange({ path: 'length', value: this.length });
	      return items;
	    });
	    utils.defineFreezeProp(array, 'set', function (index, value) {
	      if (index >= this.length) {
	        this[OBSERVER_PROP_NAME].emitChange({ path: 'length', value: this.length });
	      }
	      this[OBSERVER_PROP_NAME].set(index, value);
	    });
	  }
	
	});
	
	/**
	 * 观察一个对象
	 * @param {Object} target 目标对象
	 * @return {Observer} 观察者对象
	 */
	Observer.observe = function (target) {
	  return new Observer(target);
	};
	
	/**
	 * 检查是不是忽略的属性名
	 * @param {string} word 待检查的字符串
	 * @returns {void} 无返回
	 */
	Observer.isIgnore = function (word) {
	  return IGNORE_REGEXPS.some(function (re) /*istanbul ignore next*/{
	    return re.test(word);
	  });
	};
	
	module.exports = Observer;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var utils = __webpack_require__(11);
	var Class = __webpack_require__(12);
	
	/**
	 * 事件触发器基类
	 */
	var EventEmitter = new Class({
	  $extends: Function,
	
	  /**
	   * 构建一个一个事修的触发器对象
	   * @param {object} target 将代理的目标对象可以省略
	   * @returns {void} 无返回
	   */
	  constructor: function /*istanbul ignore next*/constructor(target) {
	    target = target || this;
	    var emitter = target._emitter_;
	    if (emitter) return emitter;
	    utils.defineFreezeProp(this, '_target_', target);
	    utils.defineFreezeProp(target, '_emitter_', this);
	    this._isElement_ = utils.isElement(this._target_);
	    this._listeners_ = this._listeners_ || {};
	    this.on = this.$on = this.$addListener = this.addListener;
	    this.off = this.$off = this.$removeListener = this.removeListener;
	    this.$emit = this.emit;
	  },
	
	  /**
	   * 添加一个事件监听函数
	   * @param {string} name 事件名称
	   * @param {function} listener 事件处理函数
	   * @param {capture} capture 是否是捕获阶段事件(只在代理 dom 对象时有效)
	   * @returns {void} 无返回
	   */
	  addListener: function /*istanbul ignore next*/addListener(name, listener, capture) {
	    if (this._isElement_) {
	      this._addElementEventListener(name, listener, capture);
	    }
	    this._listeners_[name] = this._listeners_[name] || [];
	    this._listeners_[name].push(listener);
	    if (this._listeners_[name].length > EventEmitter._maxListeners) {
	      throw new Error('The `' + name + '` event listener is not more than 10');
	    }
	  },
	
	  /**
	   * 移除「一个/一组/所有」事件监听函数
	   * @param {string} name 事件名称
	   * @param {function} listener 事件处理函数
	   * @param {capture} capture 是否是捕获阶段事件(只在代理 dom 对象时有效)
	   * @returns {void} 无返回
	   */
	  removeListener: function /*istanbul ignore next*/removeListener(name, listener, capture) {
	    if (name && listener) {
	      if (this._isElement_) {
	        this._removeElementEventListener(name, listener, capture);
	      }
	      if (!this._listeners_[name]) return;
	      var index = this._listeners_[name].indexOf(listener);
	      this._listeners_[name].splice(index, 1);
	    } else if (name) {
	      if (this._isElement_ && this._listeners_[name]) {
	        this._listeners_[name].forEach(function (_listener) {
	          this.removeListener(name, _listener, capture);
	        }, this);
	      }
	      delete this._listeners_[name];
	    } else {
	      utils.each(this._listeners_, function (name) {
	        this.removeListener(name, null, capture);
	      }, this);
	      this._listeners_ = {};
	    }
	  },
	
	  /**
	   * 触发自身的一个事件
	   * @param {string} name 事件名称
	   * @param {object} data 传递的对象
	   * @param {string} canBubble 能否冒泡(只在代理 dom 对象时有效)
	   * @param {object} cancelAble 能否取消(只在代理 dom 对象时有效)
	   * @returns {void} 无返回
	   */
	  emit: function /*istanbul ignore next*/emit(name, data, canBubble, cancelAble) {
	    if (this._isElement_) {
	      return this._emitElementEvent(name, data, canBubble, cancelAble);
	    }
	    if (!this._listeners_[name]) return;
	    var stopPropagation = false;
	    this._listeners_[name].forEach(function (handler) {
	      var rs = handler.call(this._target_, data);
	      if (rs === false) stopPropagation = true;
	    }, this);
	    return stopPropagation;
	  },
	
	  /**
	   * 添加 DOM 元素事件
	   * @param {string} name 事件名称
	   * @param {function} listener 事件处理函数
	   * @param {capture} capture 是否是捕获阶段事件
	   * @returns {void} 无返回
	   */
	  _addElementEventListener: function /*istanbul ignore next*/_addElementEventListener(name, listener, capture) {
	    this._target_.addEventListener(name, listener, capture);
	    //如果存在已注册的自定义 “组合事件”
	    var descriptor = EventEmitter._events[name];
	    if (descriptor) {
	      descriptor.addListener = descriptor.addListener || descriptor.on;
	      descriptor.addListener(this, name, listener, capture);
	    }
	  },
	
	  /**
	   * 移除 DOM 元素事件
	   * @param {string} name 事件名称
	   * @param {function} listener 事件处理函数
	   * @param {capture} capture 是否是捕获阶段事件
	   * @returns {void} 无返回
	   */
	  _removeElementEventListener: function /*istanbul ignore next*/_removeElementEventListener(name, listener, capture) {
	    this._target_.removeEventListener(name, listener, capture);
	    //如果存在已注册的自定义 “组合事件”
	    var descriptor = EventEmitter._events[name];
	    if (descriptor) {
	      descriptor.removeListener = descriptor.removeListener || descriptor.off;
	      descriptor.removeListener(this, name, listener, capture);
	    }
	  },
	
	  /**
	   * 触发 DOM 元素事件
	   * @param {string} name 事件名称
	   * @param {object} data 传递的对象
	   * @param {string} canBubble 能否冒泡
	   * @param {object} cancelAble 能否取消
	   * @returns {void} 无返回
	   */
	  _emitElementEvent: function /*istanbul ignore next*/_emitElementEvent(name, data, canBubble, cancelAble) {
	    var event = document.createEvent('HTMLEvents');
	    event.initEvent(name, canBubble, cancelAble);
	    utils.copy(data, event, ['data']);
	    event.data = data;
	    return this._target_.dispatchEvent(event);
	  }
	
	});
	
	//最多添加多少个 listener
	EventEmitter._maxListeners = 10;
	
	//所有自定义事件
	EventEmitter._events = [];
	
	/**
	 * 注册自定义事件(只在代理 dom 对象时有效)
	 * @param {object} descriptor 事件定义
	 * @returns {void} 无返回
	 */
	EventEmitter.register = function (descriptor) {
	  var names = descriptor.name;
	  if (!names) return;
	  if (!utils.isArray(names)) names = names.split(',');
	  names.forEach(function (name) {
	    this._events[name] = descriptor;
	  }, this);
	};
	
	module.exports = EventEmitter;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Compiler = __webpack_require__(17);
	var Directive = __webpack_require__(18);
	var Expression = __webpack_require__(19);
	var Template = __webpack_require__(42);
	var directives = __webpack_require__(20);
	
	Template.Template = Template;
	Template.Compiler = Compiler;
	Template.Directive = Directive;
	Template.directives = directives;
	Template.Expression = Expression;
	
	module.exports = Template;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Class = __webpack_require__(12);
	var Directive = __webpack_require__(18);
	var utils = __webpack_require__(11);
	var Expression = __webpack_require__(19);
	var commonDirectives = __webpack_require__(20);
	
	var DEFAULT_PREFIX = 'm';
	
	/**
	 * 模板编译器
	 * 可以通过指定「前缀」或「指令集」构建实例
	 */
	var Compiler = new Class({
	
	  /**
	   * 构造一个编译器
	   * @param {Object} options 选项
	   * @returns {void} 无返回
	   */
	  constructor: function /*istanbul ignore next*/constructor(options) {
	    options = options || {};
	    this.prefix = options.prefix || DEFAULT_PREFIX;
	    this.elementDirectives = {};
	    this.attributeDirectives = {};
	    this.registerDirectives(commonDirectives);
	    this.registerDirectives(options.directives);
	  },
	
	  /**
	   * 添加指令
	   * @param {Object} directives 指令集 
	   * @returns {void} 无返回
	   */
	  registerDirectives: function /*istanbul ignore next*/registerDirectives(directives) {
	    utils.each(directives, function (name, directive) {
	      name = name.replace(/([A-Z])/g, '-$1');
	      if (name[0] == '-') name = name.slice(1);
	      var fullName = directive.options.prefix === false ? name : /*istanbul ignore next*/this.prefix + ':' + name;
	      if (directive.options.type == Directive.TE) {
	        this.elementDirectives[fullName.toUpperCase()] = directive;
	      } else {
	        this.attributeDirectives[fullName] = directive;
	      }
	    }, this);
	  },
	
	  /**
	   * 解析要 attr 指令信息
	   * @param {string} attrName 要解析的名称字符串
	   * @returns {Object} 解析后的对象
	   */
	  _parseAttrInfo: function /*istanbul ignore next*/_parseAttrInfo(attrName) {
	    var parts = attrName.toLowerCase().split(':');
	    var info = {};
	    if (parts.length > 1) {
	      info.name = /*istanbul ignore next*/parts[0] + ':' + parts[1];
	      info.decorates = parts.slice(2);
	    } else {
	      info.name = parts[0];
	      info.decorates = [];
	    }
	    return info;
	  },
	
	  /**
	   * 创建一个指令实例
	   * @param {Directive} Directive 指令类
	   * @param {Object} options 指令构建选项
	   * @returns {Directive} 指令实例
	   */
	  _createDirectiveInstance: function /*istanbul ignore next*/_createDirectiveInstance(Directive, options) {
	    options.compiler = this;
	    options.prefix = this.prefix;
	    return new Directive(options);
	  },
	
	  /**
	   * 初始化一个编译完成的 handler
	   * @param {function} handler 编译后的的模板函数
	   * @returns {void} 无返回
	   */
	  _bindHandler: function /*istanbul ignore next*/_bindHandler(handler) {
	    //排序 directives
	    handler.directives = handler.directives.sort(function (a, b) {
	      return b.level - a.level;
	    });
	    //初始化 directives
	    var boundDirectives = [];
	    utils.each(handler.directives, function (index, directive) {
	      directive.index = index;
	      directive.bind();
	      boundDirectives.push(directive);
	      //移除完成绑定的指令对应的 attribute
	      if (directive.remove !== false && directive.attribute) {
	        directive.node.removeAttribute(directive.attribute.name);
	      }
	      //如果遇到一个「终态」指令，停止向下初始化
	      if (directive.final) {
	        return handler.final = true;
	      }
	    }, this);
	    handler.directives = boundDirectives;
	  },
	
	  /**
	   * 编译一个元素本身
	   * @param {function} handler 当前模板函数
	   * @param {HTMLNode} node 当前 HTML 结点
	   * @returns {void} 无返回
	   */
	  _compileElement: function /*istanbul ignore next*/_compileElement(handler, node) {
	    var ElementDirective = this.elementDirectives[node.nodeName.toUpperCase()];
	    if (!ElementDirective) return;
	    handler.directives.push(this._createDirectiveInstance(ElementDirective, {
	      handler: handler,
	      node: node
	    }));
	  },
	
	  /**
	   * 编译一个元素所有 attributes 
	   * @param {function} handler 当前模板函数
	   * @param {HTMLNode} node 当前 HTML 结点
	   * @returns {void} 无返回
	   */
	  _compileAttributes: function /*istanbul ignore next*/_compileAttributes(handler, node) {
	    utils.toArray(node.attributes).forEach(function (attribute) {
	      var attrInfo = this._parseAttrInfo(attribute.name);
	      var AttrDirective = this.attributeDirectives[attrInfo.name] || this.attributeDirectives['*'];
	      if (!AttrDirective) return;
	      var directiveOptions = AttrDirective.options;
	      handler.directives.push(this._createDirectiveInstance(AttrDirective, {
	        handler: handler,
	        node: node,
	        attribute: attribute,
	        expression: directiveOptions.literal ? attribute.value : new Expression(attribute.value, directiveOptions.mixed),
	        decorates: attrInfo.decorates
	      }));
	    }, this);
	  },
	
	  /**
	   * 编译所有子结点
	   * @param {function} handler 当前模板函数
	   * @param {HTMLNode} node 当前 HTML 结点
	   * @returns {void} 无返回
	   */
	  _compileChildren: function /*istanbul ignore next*/_compileChildren(handler, node) {
	    if (handler.final) return;
	    utils.toArray(node.childNodes).forEach(function (childNode) {
	      if (childNode._compiled_) return;
	      var childHandler = this.compile(childNode);
	      childHandler.parent = this;
	      handler.children.push(childHandler);
	    }, this);
	  },
	
	  /**
	   * 编译一个模板
	   * @param {HTMLNode} node 模板根元素
	   * @param {Object} options 选项
	   * @returns {function} 模板函数
	   */
	  compile: function /*istanbul ignore next*/compile(node, options) {
	    if (!node) {
	      throw new Error('Invalid node for compile');
	    }
	    node._compiled_ = true;
	    options = options || {};
	    //定义编译结果函数
	    var handler = function handler(scope) {
	      if (utils.isNull(scope)) scope = {};
	      handler.directives.forEach(function (directive) {
	        directive.scope = scope;
	        directive.execute(scope);
	      }, this);
	      handler.children.forEach(function (childHandler) {
	        childHandler(scope);
	      }, this);
	    };
	    //--
	    handler.dispose = function () {
	      handler.directives.forEach(function (directive) {
	        directive.unbind();
	      }, this);
	      handler.children.forEach(function (childHandler) {
	        childHandler.dispose();
	      }, this);
	    };
	    handler.node = node;
	    //定义 children & directives 
	    handler.directives = [];
	    handler.children = [];
	    //编译相关指令
	    if (options.element !== false) this._compileElement(handler, node);
	    if (options.attribute !== false) this._compileAttributes(handler, node);
	    this._bindHandler(handler);
	    if (options.children !== false) this._compileChildren(handler, node);
	    //返回编译后函数
	    return handler;
	  }
	
	});
	
	module.exports = Compiler;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Class = __webpack_require__(12);
	var utils = __webpack_require__(11);
	var Expression = __webpack_require__(19);
	
	/**
	 * 指令定义工场函数
	 * @param {Object} classOptions 选项
	 * @returns {Directive} 指令类
	 */
	function Directive(classOptions) {
	  //处理指令选项
	  classOptions = classOptions || {};
	  classOptions.type = classOptions.type || Directive.TA;
	  classOptions.level = classOptions.level || Directive.LG;
	
	  //生成指令类
	  var DirectiveClass = new Class({
	
	    $extends: classOptions,
	    //指令构建函数
	    constructor: function /*istanbul ignore next*/constructor(instanceOptions) {
	      utils.copy(instanceOptions, this);
	    },
	    //挂载实例上的 options
	    options: classOptions,
	    //挂载实例核心方法
	    bind: classOptions.bind || utils.noop,
	    execute: classOptions.execute || function (scope) {
	      this.scope = scope;
	      if (this.options.type === Directive.TE) {
	        return this.update();
	      }
	      var newValue = this.options.literal ? this.attribute.value : this.expression.execute(scope);
	      if (!utils.deepEqual(this._value_, newValue)) {
	        this.update(newValue, this._value_);
	        this._value_ = newValue;
	      }
	    },
	    update: classOptions.update || utils.noop,
	    unbind: classOptions.unbind || utils.noop,
	    //挂载指令常用的类型
	    utils: utils,
	    Expression: Expression
	  });
	  //向指令类添加「指令定义信息」
	  DirectiveClass.options = classOptions;
	  utils.setPrototypeOf(DirectiveClass, classOptions);
	  return DirectiveClass;
	}
	
	//指令类型
	Directive.TA = 'A';
	Directive.TE = 'E';
	
	//指令级别
	Directive.LP = 3000; //prevent
	Directive.LS = 2000; //statement
	Directive.LE = 1000; //eleemtn
	Directive.LG = 0; //general
	Directive.LA = -1000; //any attribute
	Directive.LC = -2000; //cloak
	
	module.exports = Directive;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Class = __webpack_require__(12);
	var utils = __webpack_require__(11);
	
	/**
	 * 表达式类型，将字符串构析为可执行表达式实例
	 */
	var Expression = new Class({
	
	  /**
	   * 通过字符串构造一个表达式实例
	   * @param {string} code 代码字符串
	   * @param {boolean} mix 是否是混合代码
	   * @returns {void} 无返回
	   */
	  constructor: function /*istanbul ignore next*/constructor(code, mix) {
	    this.func = mix ? this._compileMixedCode(code) : this._compileCode(code);
	  },
	
	  /**
	   * 编译普通表达式代码
	   * @param {string} code 代码字符串
	   * @returns {function} 编辑后的函数
	   */
	  _compileCode: function /*istanbul ignore next*/_compileCode(code) {
	    code = this._escapeEOL(this._wrapCode(code));
	    return this._createFunction(code);
	  },
	
	  /**
	   * 编辑混合的表达式代码
	   * @param {string} code 代码字符串
	   * @returns {function} 编辑后的函数
	   */
	  _compileMixedCode: function /*istanbul ignore next*/_compileMixedCode(code) {
	    var statements = this._parseMixedCode(code);
	    code = this._escapeEOL(statements.join('+'));
	    return this._createFunction(code);
	  },
	
	  /**
	   * 通过符串代码创建一个可执行函数
	   * @param {string} code 代码字符串
	   * @returns {function} 创建的函数
	   */
	  _createFunction: function /*istanbul ignore next*/_createFunction(code) {
	    var func = new Function('utils', 'scope', 'with(scope){return ' + code + '}');
	    return func.bind(null, utils);
	  },
	
	  /**
	   * 解析混合代码字符串
	   * @param {string} code 混合代码字符串
	   * @returns {Array} 解析后的「token」列表
	   */
	  _parseMixedCode: function /*istanbul ignore next*/_parseMixedCode(code) {
	    var index = 0,
	        length = code.length;
	    var token = '',
	        isExpr = false,
	        tokens = [];
	    while (index <= length) {
	      var char = code[index++];
	      var nextChar = code[index];
	      if (utils.isNull(char)) {
	        if (token.length > 0) {
	          tokens.push('"' + this._escapeCode(token) + '"');
	        }
	        token = '';
	        isExpr = false;
	      } else if (!isExpr && char + nextChar == '{{') {
	        if (token.length > 0) {
	          tokens.push('"' + this._escapeCode(token) + '"');
	        }
	        token = '';
	        isExpr = true;
	        index++;
	      } else if (isExpr && char + nextChar == '}}') {
	        if (token.length > 0) {
	          tokens.push(this._wrapCode(token));
	        }
	        token = '';
	        isExpr = false;
	        index++;
	      } else {
	        token += char;
	      }
	    }
	    return tokens;
	  },
	
	  /**
	   * 转义处理代码字符串
	   * @param {string} code 源字符串
	   * @returns {string} 处理后的字符串
	   */
	  _escapeCode: function /*istanbul ignore next*/_escapeCode(code) {
	    return code.replace(/"/, '\\"').replace('\r\n', '\\r\\n').replace('\n', '\\n');
	  },
	
	  /**
	   * 转义换行符
	   * @param {string} code 源字符串
	   * @returns {string} 处理后的字符串
	   */
	  _escapeEOL: function /*istanbul ignore next*/_escapeEOL(code) {
	    return code.replace(/\n/gm, '\\\n');
	  },
	
	  /**
	   * 通过闭包和 try/cache 包裹代码
	   * 将模板中错误的代码直接显示在「模板中用到的位置」，更易于定位错误。
	   * @param {string} code 源字符串
	   * @returns {string} 处理后的字符串
	   */
	  _wrapCode: function /*istanbul ignore next*/_wrapCode(code) {
	    return '((function(){try{return (' + code + ')}catch(err){console.error(err);return err;}})())';
	  },
	
	  /**
	   * 通过 scope 对象执行表达式
	   * @param {Object} scope 上下文对象
	   * @returns {Object} 执行结果
	   */
	  execute: function /*istanbul ignore next*/execute(scope) {
	    if (utils.isNull(scope)) {
	      scope = {};
	    }
	    return this.func.call(scope, scope);
	  }
	
	});
	
	module.exports = Expression;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	module.exports = {
	  '#text': __webpack_require__(21),
	  'each': __webpack_require__(22),
	  'if': __webpack_require__(24),
	  'prop': __webpack_require__(25),
	  'attr': __webpack_require__(26),
	  'on': __webpack_require__(27),
	  'html': __webpack_require__(28),
	  'text': __webpack_require__(29),
	  'prevent': __webpack_require__(30),
	  'id': __webpack_require__(31),
	  'cloak': __webpack_require__(32),
	  'show': __webpack_require__(33),
	  'model': __webpack_require__(34),
	  '*': __webpack_require__(41) //处理所有未知 attr
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Directive = __webpack_require__(18);
	var Expression = __webpack_require__(19);
	
	module.exports = new Directive({
	  type: Directive.TE,
	  prefix: false,
	
	  /**
	   * 初始化指令
	   * @returns {void} 无返回
	   */
	  bind: function /*istanbul ignore next*/bind() {
	    this.expr = new Expression(this.node.nodeValue, true);
	    this.node.nodeValue = '';
	  },
	
	  execute: function /*istanbul ignore next*/execute(scope) {
	    this.scope = scope;
	    var newValue = this.expr.execute(scope);
	    if (this.node.nodeValue !== newValue) {
	      this.node.nodeValue = newValue;
	    }
	  }
	
	});

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Directive = __webpack_require__(18);
	var utils = __webpack_require__(11);
	var Scope = __webpack_require__(23);
	
	module.exports = new Directive({
	  level: Directive.LS + 1, //比 if 要高一个权重
	  final: true,
	  literal: true,
	
	  /**
	   * 初始化指令
	   * @returns {void} 无返回
	   */
	  bind: function /*istanbul ignore next*/bind() {
	    this.mountNode = document.createTextNode('');
	    this.node.parentNode.insertBefore(this.mountNode, this.node);
	    //虽然，bind 完成后，也会进行 attribute 的移除，
	    //但 each 指令必须先移除，否再进行 item 编译时 each 还会生效
	    this.node.removeAttribute(this.attribute.name);
	    this.node.parentNode.removeChild(this.node);
	    this.parseExpr();
	    this.eachItems = {};
	  },
	
	  parseExpr: function /*istanbul ignore next*/parseExpr() {
	    this.eachType = this.attribute.value.indexOf(' in ') > -1 ? 'in' : 'of';
	    var tokens = this.attribute.value.split(' ' + this.eachType + ' ');
	    var fnText = /*istanbul ignore next*/'with(scope){utils.each(' + tokens[1] + ',fn.bind(this,' + tokens[1] + '))}';
	    this.each = new Function('utils', 'scope', 'fn', fnText).bind(null, this.utils);
	    var names = tokens[0].split(',').map(function (name) {
	      return name.trim();
	    });
	    if (this.eachType == 'in') {
	      this.keyName = names[0];
	      this.valueName = names[1];
	    } else {
	      this.keyName = names[1];
	      this.valueName = names[0];
	    }
	  },
	
	  execute: function /*istanbul ignore next*/execute(scope) {
	    /*istanbul ignore next*/var _this = this;
	
	    var currentEachKeys = [];
	    var itemsFragment = document.createDocumentFragment();
	    var self = this;
	    this.each(scope, function (eachTarget, key) {
	      //创建新 scope，必须选创建再设置 prototype 或采用定义「属性」的方式
	      //因为指令参数指定的名称有可能和 scope 原有变量冲突
	      //将导致针对 watch 变量的赋值，从引用发循环
	      var newScope = new Scope(this.scope);
	      if (self.keyName) {
	        Object.defineProperty(newScope, self.keyName, {
	          /*istanbul ignore next*/get: function get() {
	            return key;
	          }
	        });
	      }
	      //value 采用「属性」进行代理，否则将会使「双向」绑定无把回设值
	      if (self.valueName) {
	        Object.defineProperty(newScope, self.valueName, {
	          /*istanbul ignore next*/get: function get() {
	            return eachTarget[key];
	          },
	          /*istanbul ignore next*/set: function set(value) {
	            eachTarget[key] = value;
	          }
	        });
	      }
	      var oldItem = this.eachItems[key];
	      if (oldItem) {
	        oldItem.handler(newScope);
	      } else {
	        var newItem = {};
	        //创建新元素
	        newItem.node = this.node.cloneNode(true);
	        itemsFragment.appendChild(newItem.node);
	        newItem.handler = this.compiler.compile(newItem.node);
	        newItem.handler(newScope);
	        this.eachItems[key] = newItem;
	      }
	      currentEachKeys.push(key);
	    }.bind(this));
	    utils.each(this.eachItems, function (key, item) {
	      if (currentEachKeys.some(function (k) /*istanbul ignore next*/{
	        return k == key;
	      })) return;
	      if (item.node.parentNode) {
	        item.node.parentNode.removeChild(item.node);
	      }
	      delete /*istanbul ignore next*/_this.eachItems[key];
	    }, this);
	    if (itemsFragment.childNodes.length > 0) {
	      this.mountNode.parentNode.insertBefore(itemsFragment, this.mountNode);
	    }
	  }
	
	});

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var utils = __webpack_require__(11);
	
	var Scope = function Scope(parent, props) {
	  //新的 scope 因为「继承」了 _observer_ 
	  //所以在新 scope 上进行双向绑定时，将将值成功回写
	  //如果有天不须用 utils.cteate 继承法，需要注意 _observer_ 
	  //或在新 scope 上 defineProperty 代理 parentScope
	  var scope = utils.create(parent);
	  utils.copy(props, scope);
	  return scope;
	};
	
	module.exports = Scope;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Directive = __webpack_require__(18);
	
	module.exports = new Directive({
	  level: Directive.LS,
	  final: true,
	
	  /**
	   * 初始化指令
	   * @returns {void} 无返回
	   */
	  bind: function /*istanbul ignore next*/bind() {
	    this.mountNode = document.createTextNode('');
	    this.node.parentNode.insertBefore(this.mountNode, this.node);
	    //虽然，bind 完成后，也会进行 attribute 的移除，
	    //但 if 指令必须先移除，否再进行 item 编译时 if 还会生效
	    this.node.removeAttribute(this.attribute.name);
	    this.node.parentNode.removeChild(this.node);
	  },
	
	  execute: function /*istanbul ignore next*/execute(scope) {
	    var newValue = this.expression.execute(scope);
	    if (newValue) {
	      //如果新计算的结果为 true 才执行 
	      this._handler = this._handler || this.compiler.compile(this.node);
	      this._handler(scope);
	      var node = this.node.$substitute || this.node;
	      if (!node.parentNode) {
	        this.mountNode.parentNode.insertBefore(node, this.mountNode);
	      }
	    } else {
	      var _node = this.node.$substitute || this.node;
	      if (_node.parentNode) _node.parentNode.removeChild(_node);
	    }
	  }
	
	});

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Directive = __webpack_require__(18);
	
	module.exports = new Directive({
	  update: function /*istanbul ignore next*/update(value) {
	    var target = this.node.$target || this.node;
	    target[this.decorates[0]] = value;
	  }
	});

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Directive = __webpack_require__(18);
	
	module.exports = new Directive({
	  update: function /*istanbul ignore next*/update(value) {
	    var target = this.node.$target || this.node;
	    if (target.setAttribute) {
	      target.setAttribute(this.decorates[0], value);
	    } else {
	      target[this.decorates[0]] = value;
	    }
	  }
	});

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Directive = __webpack_require__(18);
	var EventEmitter = __webpack_require__(15);
	var Scope = __webpack_require__(23);
	
	module.exports = new Directive({
	  literal: true,
	
	  /**
	   * 初始化指令
	   * @returns {void} 无返回
	   */
	  bind: function /*istanbul ignore next*/bind() {
	    var attrValue = this.attribute.value || '';
	    if (attrValue.indexOf('(') < 0 && attrValue.indexOf(')') < 0) {
	      attrValue += '($event)';
	    }
	    this.expr = new this.Expression(attrValue);
	    var eventTarget = this.node.$target || this.node;
	    this.emiter = new EventEmitter(eventTarget);
	    this.emiter.addListener(this.decorates[0], function (event) {
	      if (this.utils.isNull(this.scope)) return;
	      this.expr.execute(new Scope(this.scope, {
	        $event: event
	      }));
	    }.bind(this), false);
	  },
	
	  unbind: function /*istanbul ignore next*/unbind() {
	    this.emiter.removeListener();
	  },
	
	  execute: function /*istanbul ignore next*/execute(scope) {
	    this.scope = scope;
	  }
	
	});

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Directive = __webpack_require__(18);
	
	module.exports = new Directive({
	  update: function /*istanbul ignore next*/update(newValue) {
	    this.node.innerHTML = newValue;
	  }
	});

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Directive = __webpack_require__(18);
	
	module.exports = new Directive({
	  update: function /*istanbul ignore next*/update(newValue) {
	    this.node.innerText = newValue;
	  }
	});

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Directive = __webpack_require__(18);
	
	module.exports = new Directive({
	  level: Directive.LP,
	  final: true
	});

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Directive = __webpack_require__(18);
	
	module.exports = new Directive({
	  literal: true,
	
	  update: function /*istanbul ignore next*/update(id) {
	    if (id in this.scope) {
	      throw new Error('Conflicting component id `' + id + '`');
	    }
	    this.scope[id] = this.node.$target || this.node;
	  }
	
	});

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Directive = __webpack_require__(18);
	
	module.exports = new Directive({
	  level: Directive.LC,
	  literal: true,
	  prefix: false,
	
	  bind: function /*istanbul ignore next*/bind() {
	    this.node.removeAttribute(this.attribute.name);
	  }
	
	});

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Directive = __webpack_require__(18);
	
	module.exports = new Directive({
	  update: function /*istanbul ignore next*/update(value) {
	    this.node.style.display = value ? '' : 'none';
	  }
	});

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var SelectDirective = __webpack_require__(35);
	var EditableDirective = __webpack_require__(36);
	var InputDirective = __webpack_require__(37);
	var RadioDirective = __webpack_require__(38);
	var CheckboxDirective = __webpack_require__(39);
	var PropDirective = __webpack_require__(40);
	
	var Directive = function Directive(options) {
	  var node = options.node;
	  var tagName = node.tagName;
	  if (options.decorates[0]) {
	    return new PropDirective(options);
	  } else if (tagName == 'INPUT') {
	    var type = node.getAttribute('type');
	    if (type == 'radio') {
	      return new RadioDirective(options);
	    } else if (type == 'checkbox') {
	      return new CheckboxDirective(options);
	    } else {
	      return new InputDirective(options);
	    }
	  } else if (tagName == 'TEXTAREA') {
	    return new InputDirective(options);
	  } else if (tagName == 'SELECT') {
	    return new SelectDirective(options);
	  } else if (node.isContentEditable) {
	    return new EditableDirective(options);
	  } else {
	    throw new Error( /*istanbul ignore next*/'Directive `model` cannot be used on `' + tagName + '`');
	  }
	};
	
	//手动添加 classOptions
	Directive.options = {
	  level: Directive.LA
	};
	
	module.exports = Directive;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Directive = __webpack_require__(18);
	var EventEmitter = __webpack_require__(15);
	var Scope = __webpack_require__(23);
	
	module.exports = new Directive({
	  final: true,
	
	  /**
	   * 初始化指令
	   * @returns {void} 无返回
	   */
	  bind: function /*istanbul ignore next*/bind() {
	    this.backExpr = new this.Expression( /*istanbul ignore next*/this.attribute.value + '=_value_');
	    this.node.removeAttribute(this.attribute.name);
	    this._handler = this.compiler.compile(this.node);
	    this.emiter = new EventEmitter(this.node);
	    this.emiter.addListener('change', function () {
	      if (this.utils.isNull(this.scope)) return;
	      var selectedOptions = this.node.selectedOptions;
	      var value = this.node.multiple ? [].slice.call(selectedOptions).map(function (option) {
	        return option.value;
	      }, this) : selectedOptions[0].value;
	      this.backExpr.execute(new Scope(this.scope, {
	        _value_: value
	      }));
	    }.bind(this), false);
	  },
	
	  unbind: function /*istanbul ignore next*/unbind() {
	    this.emiter.removeListener();
	  },
	
	  execute: function /*istanbul ignore next*/execute(scope) {
	    this.scope = scope;
	    this._handler(scope);
	    var value = this.expression.execute(scope);
	    if (!this.utils.isArray(value)) value = [value];
	    [].slice.call(this.node.options).forEach(function (option) {
	      option.selected = value.indexOf(option.value) > -1;
	    }, this);
	  }
	
	});

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Directive = __webpack_require__(18);
	var EventEmitter = __webpack_require__(15);
	var Scope = __webpack_require__(23);
	
	module.exports = new Directive({
	
	  /**
	   * 初始化指令
	   * @returns {void} 无返回
	   */
	  bind: function /*istanbul ignore next*/bind() {
	    this.backExpr = new this.Expression( /*istanbul ignore next*/this.attribute.value + '=_value_');
	    this.emiter = new EventEmitter(this.node);
	    this.emiter.addListener('input', function () {
	      if (this.utils.isNull(this.scope)) return;
	      this.backExpr.execute(new Scope(this.scope, {
	        _value_: this.node.innerHTML
	      }));
	    }.bind(this), false);
	  },
	
	  unbind: function /*istanbul ignore next*/unbind() {
	    this.emiter.removeListener();
	  },
	
	  execute: function /*istanbul ignore next*/execute(scope) {
	    var value = this.expression.execute(scope);
	    if (this.node.innerHTML !== value) {
	      this.node.innerHTML = value;
	    }
	  }
	
	});

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Directive = __webpack_require__(18);
	var EventEmitter = __webpack_require__(15);
	var Scope = __webpack_require__(23);
	
	module.exports = new Directive({
	
	  /**
	   * 初始化指令
	   * @returns {void} 无返回
	   */
	  bind: function /*istanbul ignore next*/bind() {
	    this.backExpr = new this.Expression( /*istanbul ignore next*/this.attribute.value + '=_value_');
	    this.emiter = new EventEmitter(this.node);
	    this.emiter.addListener('input', function () {
	      if (this.utils.isNull(this.scope)) return;
	      this.backExpr.execute(new Scope(this.scope, {
	        _value_: this.node.value
	      }));
	    }.bind(this), false);
	  },
	
	  unbind: function /*istanbul ignore next*/unbind() {
	    this.emiter.removeListener();
	  },
	
	  execute: function /*istanbul ignore next*/execute(scope) {
	    var value = this.expression.execute(scope);
	    if (this.node.value !== value) {
	      this.node.value = value;
	    }
	  }
	
	});

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Directive = __webpack_require__(18);
	var EventEmitter = __webpack_require__(15);
	var Scope = __webpack_require__(23);
	
	module.exports = new Directive({
	  /**
	   * 初始化指令
	   * @returns {void} 无返回
	   */
	  bind: function /*istanbul ignore next*/bind() {
	    this.backExpr = new this.Expression( /*istanbul ignore next*/this.attribute.value + '=_value_');
	    this.emiter = new EventEmitter(this.node);
	    this.emiter.addListener('change', function () {
	      if (this.utils.isNull(this.scope)) return;
	      this.backExpr.execute(new Scope(this.scope, {
	        _value_: this.node.value
	      }));
	    }.bind(this), false);
	  },
	
	  unbind: function /*istanbul ignore next*/unbind() {
	    this.emiter.removeListener();
	  },
	
	  execute: function /*istanbul ignore next*/execute(scope) {
	    this.scope = scope;
	    var value = this.expression.execute(scope);
	    this.node.checked = value == this.node.value;
	  }
	
	});

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Directive = __webpack_require__(18);
	var EventEmitter = __webpack_require__(15);
	var Scope = __webpack_require__(23);
	
	module.exports = new Directive({
	
	  /**
	   * 初始化指令
	   * @returns {void} 无返回
	   */
	  bind: function /*istanbul ignore next*/bind() {
	    this.backExpr = new this.Expression( /*istanbul ignore next*/this.attribute.value + '=_value_');
	    this.emiter = new EventEmitter(this.node);
	    this.emiter.addListener('change', function () {
	      if (this.utils.isNull(this.scope)) return;
	      var value = this.expression.execute(this.scope);
	      if (this.utils.isArray(value) && this.node.checked) {
	        value.push(this.node.value);
	      } else if (this.utils.isArray(value) && !this.node.checked) {
	        var index = value.indexOf(this.node.value);
	        value.splice(index, 1);
	      } else {
	        this.backExpr.execute(new Scope(this.scope, {
	          _value_: this.node.checked
	        }));
	      }
	    }.bind(this), false);
	  },
	
	  unbind: function /*istanbul ignore next*/unbind() {
	    this.emiter.removeListener();
	  },
	
	  execute: function /*istanbul ignore next*/execute(scope) {
	    this.scope = scope;
	    var value = this.expression.execute(scope);
	    if (this.utils.isArray(value)) {
	      this.node.checked = value.indexOf(this.node.value) > -1;
	    } else {
	      this.node.checked = value;
	    }
	  }
	
	});

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Directive = __webpack_require__(18);
	var Scope = __webpack_require__(23);
	
	module.exports = new Directive({
	
	  /**
	   * 初始化指令
	   * @returns {void} 无返回
	   */
	  bind: function /*istanbul ignore next*/bind() {
	    /*istanbul ignore next*/var _this = this;
	
	    this.target = this.node.$target;
	    this.backExpr = new this.Expression( /*istanbul ignore next*/this.attribute.value + '=_value_');
	    this.bindProp = this.decorates[0];
	    if (!this.target) {
	      throw new Error( /*istanbul ignore next*/'Directive `model:' + this.bindProp + '` cannot be used on `' + this.node.tagName + '`');
	    }
	    this.watcher = this.target.$watch(this.bindProp, function (value) {
	      if ( /*istanbul ignore next*/_this.utils.isNull( /*istanbul ignore next*/_this.scope)) return;
	      /*istanbul ignore next*/_this.backExpr.execute(new Scope( /*istanbul ignore next*/_this.scope, {
	        _value_: value
	      }));
	    });
	  },
	
	  unbind: function /*istanbul ignore next*/unbind() {
	    this.target.$unWatch(this.watcher);
	  },
	
	  update: function /*istanbul ignore next*/update(value) {
	    this.target[this.bindProp] = value;
	  }
	
	});

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Directive = __webpack_require__(18);
	
	/**
	 * 通用的 attribute 指令
	 * 用于所有 attribute 的处理
	 * 例如:
	 *  <div attr1="{{expr1}}" {{expr2}} {{attr3}}="{{expr3}}">
	 *  </div>
	 */
	module.exports = new Directive({
	  level: Directive.LA,
	  prefix: false,
	  literal: true,
	  remove: false,
	
	  /**
	   * 初始化指令
	   * @returns {void} 无返回
	   */
	  bind: function /*istanbul ignore next*/bind() {
	    this.computedName = this.attribute.name;
	    this.computedValue = this.attribute.value;
	    this.nameExpr = new this.Expression(this.attribute.name, true);
	    this.valueExpr = new this.Expression(this.attribute.value, true);
	  },
	
	  execute: function /*istanbul ignore next*/execute(scope) {
	    var target = this.node.$target || this.node;
	    var newComputedName = this.nameExpr.execute(scope);
	    if (this.computedName !== newComputedName) {
	      //移除旧名称
	      if (target.removeAttribute) {
	        target.removeAttribute(this.computedName);
	      }
	      //设置新名称
	      this.computedName = newComputedName;
	      if (!this.utils.isNull(this.computedName) && this.computedName.length > 0) {
	        if (target.setAttribute) {
	          target.setAttribute(this.computedName, this.computedValue || '');
	        }
	      }
	    }
	    var newComputeValue = this.valueExpr.execute(scope);
	    if (this.computedValue !== newComputeValue) {
	      this.computedValue = newComputeValue;
	      if (target.setAttribute) {
	        target.setAttribute(this.computedName, this.computedValue || '');
	      } else {
	        target[this.computedName] = this.computedValue;
	      }
	    }
	  }
	
	});

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Class = __webpack_require__(12);
	var Observer = __webpack_require__(14);
	var EventEmitter = __webpack_require__(15);
	var Compiler = __webpack_require__(17);
	
	/**
	 * 模板类
	 * 可能通过 element 作为参数，创建一个模板实例
	 */
	var Template = new Class({
	
	  $extends: EventEmitter,
	
	  /**
	   * 构建一个模板板实例
	   * @param {HTMLNode} element HTML 元素
	   * @param {Object} options 选项
	   * @returns {void} 无返回
	   */
	  constructor: function /*istanbul ignore next*/constructor(element, options) {
	    options = options || {};
	    EventEmitter.call(this);
	    this.options = options;
	    this.element = element;
	    this.compiler = options.compiler || new Compiler(options);
	    this.render = this.compiler.compile(this.element);
	    this.update = this.update.bind(this);
	    this._update = this._update.bind(this);
	    this._updateTimer = 0;
	  },
	
	  /**
	   * 更新当前模板 (会过滤不必要的更新)
	   * @returns {void} 无返回
	   */
	  update: function /*istanbul ignore next*/update() {
	    if (this._updateTimer) {
	      clearTimeout(this._updateTimer);
	      this._updateTimer = null;
	    }
	    this._updateTimer = setTimeout(this._update, 0);
	  },
	
	  /**
	   * 更新当前模板内部方法 
	   * @returns {void} 无返回
	   */
	  _update: function /*istanbul ignore next*/_update() {
	    if (!this._updateTimer || !this.observer) return;
	    this.emit('update', this);
	    this.render(this.observer.target);
	    this._onBind();
	  },
	
	  /**
	   * 在绑定成功时
	   * @returns {void} 无返回
	   */
	  _onBind: function /*istanbul ignore next*/_onBind() {
	    if (this._bound) return;
	    this._bound = true;
	    this.emit('bind', this);
	  },
	
	  /**
	   * 将模板绑定到一个 scope
	   * @param {Object} scope 绑定的上下文对象
	   * @param {boolean} disableFirst 是否禁用第一次的自动渲染
	   * @returns {void} 无返回
	   */
	  bind: function /*istanbul ignore next*/bind(scope, disableFirst) {
	    if (!scope) return;
	    this.unbind();
	    this.observer = new Observer(scope, {
	      root: this.options.root
	    });
	    scope.$self = scope;
	    this.observer.on('change', this.update);
	    if (disableFirst) {
	      this._onBind();
	    } else {
	      this.update();
	    }
	  },
	
	  /**
	   * 解绑定
	   * @returns {void} 无返回
	   */
	  unbind: function /*istanbul ignore next*/unbind() {
	    if (!this.observer) return;
	    this.observer.removeListener('change', this.update);
	    this.observer.clearReference();
	    this.observer = null;
	  },
	
	  /**
	   * 释放
	   * @returns {void} 无返回
	   */
	  dispose: function /*istanbul ignore next*/dispose() {
	    this.unbind();
	    this.render.dispose();
	  }
	
	});
	
	module.exports = Template;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Component = __webpack_require__(44);
	var components = __webpack_require__(46);
	var directives = __webpack_require__(16).directives;
	
	Component.components = components;
	Component.Component = Component;
	
	Component.component = function (name, component) {
	  if (!component) return components[name];
	  components[name] = component;
	};
	
	Component.directive = function (name, directive) {
	  if (!directive) return directives[name];
	  directives[name] = directive;
	};
	
	module.exports = Component;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Class = __webpack_require__(12);
	var Template = __webpack_require__(16);
	var Watcher = __webpack_require__(13);
	var utils = __webpack_require__(11);
	var EventEmitter = __webpack_require__(15);
	var Observer = __webpack_require__(14);
	var ComponentDirective = __webpack_require__(45);
	
	/**
	 * 组件类
	 * 用于定义一个新的组件
	 * @param {Object} classOpts 类选项
	 * @returns {Component} 组件类
	 */
	function Component(classOpts) {
	
	  //处理组件选项
	  classOpts = classOpts || {};
	
	  //处理「继承」，目前的机制，只能用「合并类选项」
	  var mixes = classOpts.mixes;
	  delete classOpts.mixes;
	  if (mixes && !utils.isArray(mixes)) {
	    mixes = [mixes];
	  } else {
	    mixes = [];
	  }
	  var extendComponent = classOpts.extend || Component;
	  delete classOpts.extend;
	  //extend 会覆盖 mixes 中的同名成员
	  mixes.push(extendComponent);
	  //classOpts 会覆盖 extend 或 mixes 中的同名成员
	  mixes.push(classOpts);
	  var mixedClassOpts = {};
	  mixes.forEach(function (mixItem) {
	    if (mixItem instanceof Component || mixItem == Component) {
	      mixItem = mixItem.$options || {};
	    }
	    utils.mix(mixedClassOpts, mixItem);
	  });
	  classOpts = mixedClassOpts;
	
	  /**
	   * 定义组件类
	   * 可以通过 new ComponentClass() 创建组件实例
	   */
	  var ComponentClass = new Class({
	    $extends: extendComponent,
	
	    /**
	     * 组件类构造函数
	     * @param {object} instanceOpts 实例选项
	     * @returns {void} 无返回
	     */
	    constructor: function /*istanbul ignore next*/constructor(instanceOpts) {
	      /*istanbul ignore next*/var _this = this;
	
	      if (this == window) return new this.$class(instanceOpts);
	      EventEmitter.call(this);
	      instanceOpts = instanceOpts || {};
	      //创建组件实例时可以给实例添加成员
	      utils.each(instanceOpts, function (key, value) {
	        if (key in /*istanbul ignore next*/_this) return;
	        /*istanbul ignore next*/_this[key] = value;
	      });
	      this._onTemplateUpdate_ = this._onTemplateUpdate_.bind(this);
	      this._createdData_(classOpts.data);
	      this._createProperties_(classOpts.properties || classOpts.props);
	      this._createWatches_(classOpts.watches || classOpts.watch);
	      this.$directives = this.$directives || {};
	      this._importDirectives_(classOpts.directives);
	      this.$components = this.$components || {};
	      this._importComponents_(__webpack_require__(46));
	      this._importComponents_({
	        'self': ComponentClass
	      });
	      this._importComponents_(classOpts.components);
	      utils.defineFreezeProp(this, '$children', []);
	      if (instanceOpts.parent) this.$setParent(instanceOpts.parent);
	      this.$callHook('onInit');
	      Observer.observe(this);
	      if (classOpts.element) {
	        this.$mount();
	      } else {
	        this.$compile();
	      }
	    },
	
	    /**
	     * 设定父组件
	     * @param {Object} parent 父组件
	     * @returns {void} 无返回
	     */
	    $setParent: function /*istanbul ignore next*/$setParent(parent) {
	      if (this.$parent === parent) return;
	      if (this.$parent) {
	        this.$parent.$removeChild(this);
	      }
	      if (parent) {
	        parent.$addChild(this);
	      }
	    },
	
	    /**
	     * 添加子组件
	     * @param {Object} child 子组件
	     * @returns {void} 无返回
	     */
	    $addChild: function /*istanbul ignore next*/$addChild(child) {
	      if (!(child instanceof Component)) return;
	      this.$children.push(child);
	      utils.defineFreezeProp(child, '$parent', this);
	      utils.defineFreezeProp(child, '$root', this.$root || this);
	    },
	
	    /**
	     * 移除子组件
	     * @param {Object} child 子组件
	     * @returns {void} 无返回
	     */
	    $removeChild: function /*istanbul ignore next*/$removeChild(child) {
	      var index = this.$children.indexOf(child);
	      this.$children.splice(index, 1);
	      utils.defineFreezeProp(child, '$parent', null);
	      //utils.defineFreezeProp(child, '$root', null);
	    },
	
	    /**
	     * 获取根组件, 为了能通过 polyfill 处理 IE8 暂不用这种方式
	     */
	    get $root() {
	      if (this.$parent) {
	        return this.$parent.$root;
	      } else {
	        return this;
	      }
	    },
	
	    /**
	     * 导入用到的子组件类
	     * @param {Object} components 引入的组件
	     * @returns {void} 无返回
	     */
	    _importComponents_: function /*istanbul ignore next*/_importComponents_(components) {
	      utils.each(components, function (name, component) {
	        this.$components[name] = component;
	        this.$directives[name] = new ComponentDirective({
	          name: name,
	          component: component,
	          parent: this
	        });
	      }, this);
	    },
	
	    /**
	     * 导入一个用到的指令
	     * @param {Object} directives 引入的指令
	     * @returns {void} 无返回
	     */
	    _importDirectives_: function /*istanbul ignore next*/_importDirectives_(directives) {
	      utils.each(directives, function (name, directive) {
	        this.$directives[name] = directive;
	      }, this);
	    },
	
	    /**
	     * 调用生命周期 hook
	     * @param {string} name 调用的 hook 名称
	     * @param {Array} args 调用 hook 的参数列表
	     * @returns {void} 无反回
	     */
	    $callHook: function /*istanbul ignore next*/$callHook(name, args) {
	      if (!utils.isFunction(this[name])) return;
	      this[name].apply(this, args || []);
	    },
	
	    /**
	     * 创建数据对象
	     * @param {Object} data 组件数据对象
	     * @returns {void} 无返回
	     */
	    _createdData_: function /*istanbul ignore next*/_createdData_(data) {
	      if (utils.isFunction(data)) {
	        this.$data = data.call(this);
	      } else {
	        this.$data = data || {};
	      }
	      utils.each(this.$data, function (name) {
	        Object.defineProperty(this, name, {
	          configurable: true,
	          enumerable: true,
	          get: function /*istanbul ignore next*/get() {
	            if (!this.$data) return;
	            return this.$data[name];
	          },
	          set: function /*istanbul ignore next*/set(value) {
	            if (!this.$data) return;
	            this.$data[name] = value;
	          }
	        });
	      }, this);
	    },
	
	    /**
	     * 创建组件属性
	     * @param {Object} properties 属性定义对象
	     * @returns {void} 无返回
	     */
	    _createProperties_: function /*istanbul ignore next*/_createProperties_(properties) {
	      this.$properties = {};
	      utils.each(properties, function (name, descriptor) {
	        if (utils.isFunction(descriptor)) {
	          descriptor = {
	            get: descriptor
	          };
	        } else if (!utils.isObject(descriptor)) {
	          descriptor = {
	            value: descriptor
	          };
	        } else {
	          //不能直接用 descriptor，
	          //因为为会导到多个组件实例间的影响
	          descriptor = utils.copy(descriptor);
	        }
	        var hasGetterOrSetter = !!descriptor.get || !!descriptor.set;
	        if (!hasGetterOrSetter) {
	          descriptor.value = descriptor.value || null;
	          descriptor.get = function () {
	            return descriptor.value;
	          };
	          descriptor.set = function (value) {
	            descriptor.value = value;
	          };
	        }
	        Object.defineProperty(this, name, {
	          configurable: true,
	          enumerable: true,
	          get: function /*istanbul ignore next*/get() {
	            if (!descriptor.get) {
	              throw new Error('Property `' + name + '` cannot be read');
	            }
	            return descriptor.get.call(this);
	          },
	          set: function /*istanbul ignore next*/set(value) {
	            if (!descriptor.set) {
	              throw new Error('Property `' + name + '` cannot be written');
	            }
	            if (descriptor.test && !descriptor.test(value)) {
	              throw new Error('Invalid value `' + value + '` for property `' + name + '`');
	            }
	            descriptor.set.call(this, value);
	            if (this._observer_) {
	              this._observer_.emitChange({
	                path: name,
	                value: value
	              });
	            }
	          }
	        });
	        this.$properties[name] = descriptor;
	      }, this);
	    },
	
	    /**
	     * 创建监控
	     * 为什么用 watches 而不是 watchers 或其它？
	     * 因为，这里仅是「监控配置」并且是「复数」
	     * @param {Object} watches 监控定义对象
	     * @returns {void} 无返回
	     */
	    _createWatches_: function /*istanbul ignore next*/_createWatches_(watches) {
	      this._watchers_ = this._watchers_ || [];
	      utils.each(watches, function (name, handler) {
	        this.$watch(name, handler);
	      }, this);
	    },
	
	    /**
	     * 在模板发生更新时
	     * @returns {void} 无返回
	     */
	    _onTemplateUpdate_: function /*istanbul ignore next*/_onTemplateUpdate_() {
	      this._watchers_.forEach(function (watcher) {
	        watcher.calc();
	      }, this);
	    },
	
	    /**
	     * 添加一个监控
	     * @param {string|function} path 计算函数或路径
	     * @param {function} handler 处理函数
	     * @returns {void} 无返回
	     */
	    $watch: function /*istanbul ignore next*/$watch(path, handler) {
	      if (!utils.isFunction(handler)) return;
	      var calcer = path;
	      if (!utils.isFunction(path)) {
	        calcer = function /*istanbul ignore next*/calcer() {
	          return utils.getByPath(this, path);
	        };
	      }
	      var watcher = new Watcher(calcer.bind(this), handler.bind(this));
	      this._watchers_.push(watcher);
	      return watcher;
	    },
	
	    /**
	     * 取消一个 watcher 对象
	     * @param {object} watcher 监控对象实例
	     * @returns {void} 无返回
	     */
	    $unWatch: function /*istanbul ignore next*/$unWatch(watcher) {
	      var index = this._watchers_.findIndex(function (w) /*istanbul ignore next*/{
	        return w === watcher;
	      });
	      this._watchers_.splice(index, 1);
	    },
	
	    /**
	     * 创建元素
	     * @returns {void} 无返回
	     */
	    _createElement_: function /*istanbul ignore next*/_createElement_() {
	      if (this._created_) return;
	      this._created_ = true;
	      this.$callHook('onCreate');
	      utils.defineFreezeProp(this, '$element', this.element || ComponentClass.$template.cloneNode(true));
	      if (!this.$element || this.$element.nodeName === '#text') {
	        throw new Error('Invalid component template');
	      }
	      this.$callHook('onCreated');
	    },
	
	    /**
	     * 编译自身模板并完成绑定
	     * @returns {void} 无返回
	     */
	    $compile: function /*istanbul ignore next*/$compile() {
	      if (this._compiled_) return;
	      this._compiled_ = true;
	      this._createElement_();
	      utils.defineFreezeProp(this, '_template_', new Template(this.$element, {
	        directives: this.$directives,
	        root: true
	      }));
	      this._template_.bind(this);
	      this._template_.on('update', this._onTemplateUpdate_);
	      this._template_.on('bind', function () {
	        if (!this.deferReady) this.$callHook('onReady');
	      }.bind(this));
	    },
	
	    /**
	     * 向 DOM tree 中挂截组件
	     * @param {HTMLNode} mountNode 挂载点元素
	     * @param {append} append 是否 append 到挂载元素内
	     * @returns {void} 无返回 
	     */
	    $mount: function /*istanbul ignore next*/$mount(mountNode, append) {
	      if (this._mounted_) return;
	      this.$compile();
	      this.$callHook('onMount');
	      if (mountNode) {
	        mountNode.$substitute = this.$element;
	        this.$element._mountNode = mountNode;
	        if (append) {
	          mountNode.appendChild(this.$element);
	        } else if (mountNode.parentNode) {
	          mountNode.parentNode.insertBefore(this.$element, mountNode);
	        }
	      }
	      this._mounted_ = true;
	      this._removed_ = false;
	      this.$callHook('onMounted');
	    },
	
	    /**
	     * 将组件添加到指定容器元素内
	     * @param {HTMLNode} node 容器元素
	     * @returns {void} 无返回 
	     */
	    $appendTo: function /*istanbul ignore next*/$appendTo(node) {
	      this.$mount(node, true);
	    },
	
	    /**
	     * 移除组件
	     * @returns {void} 无返回
	     */
	    $remove: function /*istanbul ignore next*/$remove() {
	      if (this._removed_ || !this._mounted_) return;
	      this.$callHook('onRemove');
	      if (this.$element.parentNode) {
	        this.$element.parentNode.removeChild(this.$element);
	      }
	      this._removed_ = true;
	      this._mounted_ = false;
	      this.$callHook('onRemoved');
	    },
	
	    /**
	     * 触发自身的一个事件并向上冒泡
	     * @param {string} name 事件名称
	     * @param {object} data 传递的对象
	     * @returns {void} 无返回
	     */
	    $dispatch: function /*istanbul ignore next*/$dispatch(name, data) {
	      var stopPropagation = this.$emit(name, data);
	      if (!stopPropagation && this.$parent) {
	        this.$parent.$dispatch(name, data);
	      }
	    },
	
	    /**
	     * 触发自身的一个事件并向下广播
	     * @param {string} name 事件名称
	     * @param {object} data 传递的对象
	     * @returns {void} 无返回
	     */
	    $broadcast: function /*istanbul ignore next*/$broadcast(name, data) {
	      var stopPropagation = this.$emit(name, data);
	      if (!stopPropagation && this.$children && this.$children.length > 0) {
	        this.$children.forEach(function (child) {
	          child.$broadcast(name, data);
	        }, this);
	      }
	    },
	
	    /**
	     * 释放组件
	     * @returns {void} 无返回
	     */
	    $dispose: function /*istanbul ignore next*/$dispose() {
	      this.$remove();
	      this._emitter_.off();
	      this.$children.forEach(function (child) {
	        child.$dispose();
	      }, this);
	      if (this.$parent) {
	        var index = this.$parent.$children.indexOf(this);
	        this.$parent.$children.splice(index, 1);
	      }
	      this.$callHook('onDispose');
	      if (this._compiled_) {
	        this._template_.unbind();
	      }
	      this.$callHook('onDisposed');
	      for (var key in this) {
	        delete this[key];
	      }
	      ['_observer_', '$element', '$children', '$parent', '_template_'].forEach(function (key) {
	        delete this[key];
	      }, this);
	      utils.setPrototypeOf(this, null);
	    }
	
	  });
	
	  //保存类选项
	  ComponentClass.$options = classOpts;
	  ComponentClass.$template = utils.parseDom(classOpts.template);
	
	  //向 ComponentClass.prototype 上拷贝成员
	  utils.copy(classOpts, ComponentClass.prototype);
	  utils.copy(classOpts.methods, ComponentClass.prototype);
	
	  //使 ComponentClass instanceof Component === true 
	  //IE9/10 下为 false，并且动态为 Component.prototype 添加的成员不会在 ComponentClass 上生效
	  utils.setPrototypeOf(ComponentClass, Component.prototype);
	
	  return ComponentClass;
	}
	
	//继承自 EventEmitter
	Component.prototype = utils.create(EventEmitter.prototype);
	
	//组件扩展方法，简单封装 extends
	Component.extend = function (classOpts) {
	  return new Component(classOpts);
	};
	
	//定义扩展方法
	Component.prototype.extend = function (classOpts) {
	  classOpts = classOpts || {};
	  classOpts.extend = this;
	  return new Component(classOpts);
	};
	
	//创建实例的方法
	Component.prototype.create = function (instanceOpts) {
	  return new this(instanceOpts);
	};
	
	//针对包括 element 组件类的启动方法
	Component.prototype.start = function (instanceOpts) {
	  if (!this.$options || !this.$options.element) {
	    throw new Error('Start method cannot be called');
	  }
	  this.create(instanceOpts);
	};
	
	module.exports = Component;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Template = __webpack_require__(16);
	var Directive = Template.Directive;
	
	/**
	 * 创建一个组件指令
	 * @param {object} options 选项
	 * @returns {object} 组件指令
	 */
	function ComponentDirective(options) {
	
	  return new Directive({
	    type: Directive.TE,
	    literal: true,
	    final: true,
	    level: Directive.LE,
	
	    bind: function /*istanbul ignore next*/bind() {
	      this.component = new options.component({
	        deferReady: true,
	        parent: options.parent || this.scope
	      });
	      this.handleAttrs();
	      this.node.$target = this.component;
	      this.handler = this.compiler.compile(this.node, {
	        element: false,
	        children: false
	      });
	      this.handleContents();
	      this.component.$mount(this.node);
	      if (this.node.parentNode) {
	        this.node.parentNode.removeChild(this.node);
	      }
	    },
	
	    handleAttrs: function /*istanbul ignore next*/handleAttrs() {
	      this.attrs = [].slice.call(this.node.attributes);
	      var directiveRegexp = new RegExp('^' + this.prefix + ':', 'i');
	      this.attrs.forEach(function (attr) {
	        if (directiveRegexp.test(attr.name)) return;
	        if (attr.name in this.component.$properties) return;
	        this.component.$element.setAttribute(attr.name, attr.value);
	        this.node.removeAttribute(attr.name);
	      }, this);
	    },
	
	    handleContents: function /*istanbul ignore next*/handleContents() {
	      this.placeHandlers = [];
	      var places = [].slice.call(this.component.$element.querySelectorAll('[' + this.prefix + '\\:content]'));
	      places.forEach(function (place) {
	        //将内容插入到指定的「位置」
	        var contents = null;
	        var selector = place.getAttribute(this.prefix + ':content');
	        if (!selector) {
	          contents = [].slice.call(this.node.childNodes);
	        } else {
	          contents = [].slice.call(this.node.querySelectorAll(selector));
	        }
	        if (!contents || contents.length < 1) return;
	        place.innerHTML = '';
	        contents.forEach(function (content) {
	          place.appendChild(content.cloneNode(true));
	        }, this);
	        //编译插入后的子「内容模板」
	        var handler = this.compiler.compile(place);
	        this.placeHandlers.push(handler);
	      }, this);
	    },
	
	    execute: function /*istanbul ignore next*/execute(scope) {
	      this.handler(scope);
	      if (!this._ready_) {
	        this._ready_ = true;
	        this.component.$callHook('onReady');
	      }
	      this.placeHandlers.forEach(function (handler) {
	        handler(scope);
	      }, this);
	    }
	
	  });
	}
	
	module.exports = ComponentDirective;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	module.exports = {
	  View: __webpack_require__(47)
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Component = __webpack_require__(44);
	var utils = __webpack_require__(11);
	
	/**
	 * 内置视图组件
	 * 可以加载并显示其它组件，并可以指定「转场效果」
	 */
	var View = new Component({
	
	  template: '<div></div>',
	
	  properties: {
	
	    /**
	     * 显示到视图中的组件
	     */
	    component: {
	      test: function /*istanbul ignore next*/test(value) {
	        if (!value) return false;
	        return value instanceof Component || utils.isString(value);
	      },
	      set: function /*istanbul ignore next*/set(component) {
	        if (this._transitioning) return;
	        this._transitioning = true;
	        //如果 value 是字符串则尝试从 $parent.components 中获取组件类 
	        if (utils.isString(component)) {
	          if (this.$parent && this.$parent.$components) {
	            this.component = this.$parent.$components[component];
	          } else {
	            this.component = null;
	          }
	          return;
	        }
	        //声明新旧组件变量
	        var newComponentInstance = null;
	        var oldComponentInstance = this.componentInstance;
	        //创建新组件实例
	        if (utils.isFunction(component)) {
	          newComponentInstance = new component({
	            parent: this
	          });
	        } else {
	          component.$setParent(this);
	          newComponentInstance = component;
	        }
	        //通过转场控制器进行转场准备
	        this.transition.prep(newComponentInstance, oldComponentInstance);
	        //挂载新组件实例
	        newComponentInstance.$appendTo(this.$element);
	        //通过转场控制器进行转场
	        this.transition.go(newComponentInstance, oldComponentInstance, function () {
	          //触发相关事件
	          this.$emit('enter', newComponentInstance);
	          this.$emit('leave', oldComponentInstance);
	          //销毁旧组件实例
	          if (oldComponentInstance) {
	            oldComponentInstance.$dispose();
	          }
	          this._transitioning = false;
	        }.bind(this));
	        //暂存当前组件实例
	        this.componentInstance = newComponentInstance;
	      },
	      get: function /*istanbul ignore next*/get() {
	        return this._Component;
	      }
	    },
	
	    /**
	     * 视图的转场控制对象
	     */
	    transition: {
	      get: function /*istanbul ignore next*/get() {
	        return this._transition || View.transition;
	      },
	      set: function /*istanbul ignore next*/set(transition) {
	        if (this._transitioning) return;
	        if (!transition || utils.isFunction(transition.prep) && utils.isFunction(transition.go)) {
	          if (this._transition && utils.isFunction(this._transition.clean)) {
	            this._transition.clean(this);
	          }
	          if (transition && utils.isFunction(transition.init)) {
	            transition.init(this);
	          }
	          this._transition = transition;
	        } else {
	          throw new Error('Invalid transition');
	        }
	      }
	    }
	  },
	
	  /**
	   * 切换到指定的组件
	   * @param {Component} component 组件
	   * @param {transition} transition 转场控制组件
	   * @returns {void} 无返回
	   */
	  switchTo: function /*istanbul ignore next*/switchTo(component, transition) {
	    if (transition) {
	      this.transition = transition;
	    }
	    this.component = component;
	  }
	
	});
	
	/**
	 * 默认转场设置
	 */
	View.transition = {
	  //init: function () { },
	  //clean: function () { },
	
	  /**
	   * 转场开始前的准备
	   * @param {Component} newComponent 新组件
	   * @param {Component} oldComponent 旧组件
	   * @returns {void} 无返回
	   */
	  prep: function /*istanbul ignore next*/prep(newComponent, oldComponent) {
	    if (oldComponent) oldComponent.$element.style.display = 'none';
	  },
	
	  /**
	   * 执行转场动画
	   * @param {Component} newComponent 新组件
	   * @param {Component} oldComponent 旧组件
	   * @param {Function} done 完成后的回调
	   * @returns {void} 无返回
	   */
	  go: function /*istanbul ignore next*/go(newComponent, oldComponent, done) {
	    done();
	  }
	};
	
	module.exports = View;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Plugin = __webpack_require__(49);
	module.exports = new Plugin(function () {
	  return __webpack_require__(50);
	});

/***/ },
/* 49 */
/***/ function(module, exports) {

	/*istanbul ignore next*/'use strict';
	
	var factory = function factory(thunk) {
	  function Plugin(opts) {
	    return typeof Plugin.entity === 'function' ? new Plugin.entity(opts) : Plugin.entity;
	  }
	  Plugin.install = function (mokit) {
	    factory.mokit = mokit;
	    this.entity = thunk();
	    this.entity.install(mokit);
	  };
	  if (typeof mokit !== 'undefined') {
	    mokit.use(Plugin);
	  }
	  return Plugin;
	};
	
	module.exports = factory;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var mokit = __webpack_require__(49).mokit;
	var utils = mokit.utils;
	var Class = mokit.Class;
	var EventEmitter = mokit.EventEmitter;
	var Component = mokit.Component;
	var RouterBase = __webpack_require__(51);
	var HashDirver = __webpack_require__(52);
	var RouterView = __webpack_require__(53);
	var LinkDirective = __webpack_require__(54);
	
	var ROOT_PATH = '/';
	
	var Router = new Class({
	  $name: 'Router',
	  $extends: RouterBase,
	
	  /**
	   * 路由类构造函数
	   * @param {Object} options 选项
	   * @returns {void} 无返回
	   */
	  constructor: function /*istanbul ignore next*/constructor(options) {
	    this.$super();
	    options = options || utils.create(null);
	    if (options.view) this.view = options.view;
	    this.emitter = new EventEmitter(this);
	    this.dirvier = options.dirvier || new HashDirver(this);
	    this.dirvier.on('changed', this._onChanged.bind(this));
	  },
	
	  /**
	   *「路由视组」访问器
	   * @returns {RouterView} 路由视图组件实例
	   */
	  get view() {
	    return this._view;
	  },
	
	  /**
	   *「路由视组」设置器
	   * @param {RouterView} view 路由视图组件实例
	   * @returns {void} 无返回
	   */
	  set view(view) {
	    if (!(view instanceof RouterView)) {
	      throw new Error('Invalid RouterView');
	    }
	    this._view = view;
	    this._view._router = this;
	    this._onChanged(this.dirvier.get());
	  },
	
	  /**
	   * 路由发生变化时的处理函数
	   * @param {string} path 将要转到的路径
	   * @returns {void} 无返回
	   */
	  _onChanged: function /*istanbul ignore next*/_onChanged(path) {
	    path = path || '/';
	    var fromPath = this.dirvier.get();
	    var toPath = this.resolveUri(path, fromPath);
	    toPath = path.split('?')[0].split('!')[0];
	    var routes = this.get(toPath);
	    if (!routes || routes.length < 1) return;
	    this.route = routes[0];
	    this.route.path = toPath;
	    this.route.query = this.parseQuery();
	    if (this.view) {
	      setTimeout(function () {
	        this.view.component = this.route.component;
	      }.bind(this), 0);
	    }
	    this.emitter.$emit('enter', toPath);
	    this.emitter.$emit('leave', fromPath);
	  },
	
	  /**
	   * 转到一个路径
	   * @param {string} path 将要转到的路径
	   * @returns {void} 无返回
	   */
	  go: function /*istanbul ignore next*/go(path) {
	    this.dirvier.set(path);
	  },
	
	  /**
	   * 映射路由配置
	   * @param {Object} map 路由配置
	   * @returns {void} 无返回
	   */
	  map: function /*istanbul ignore next*/map(_map) {
	    utils.each(_map, function (pattern, item) {
	      if (utils.isString(item)) {
	        item = _map[item];
	      }
	      if (item instanceof Component) {
	        item = { component: item };
	      }
	      if (!item) throw new Error('Invalid route `' + pattern + '`');
	      item.pattern = pattern;
	      this.addOne(item);
	    }, this);
	  },
	
	  /**
	   * 解析相对路径
	   * @param {string} toUri 原始路径
	   * @param {string} fromUri 参数路径
	   * @returns {string} 解析后的相关路径
	   */
	  resolveUri: function /*istanbul ignore next*/resolveUri(toUri, fromUri) {
	    toUri = toUri || ROOT_PATH;
	    if (toUri[0] == ROOT_PATH) return toUri;
	    fromUri = fromUri || ROOT_PATH;
	    fromUri = fromUri.split('?')[0].split('#')[0];
	    var baseDir = fromUri.substring(0, fromUri.lastIndexOf(ROOT_PATH));
	    var uriParts = toUri.split('#')[0].split(ROOT_PATH);
	    var uriHash = toUri.split('#')[1];
	    var newUriParts = baseDir.length > 0 ? baseDir.split(ROOT_PATH) : [];
	    uriParts.forEach(function (part) {
	      if (part == '..') {
	        newUriParts.pop();
	      } else if (part && part != '.') {
	        newUriParts.push(part);
	      }
	    }, this);
	    return ROOT_PATH + newUriParts.join(ROOT_PATH) + (uriHash ? '#' + uriHash : '');
	  },
	
	  /**
	   * 解析查询字符串并生成查询参数对象
	   * @returns {Object} 查询参数对象
	   */
	  parseQuery: function /*istanbul ignore next*/parseQuery() {
	    var queryString = (location.href.split('#')[1] || '').split('?')[1] || '';
	    var pairs = queryString.split('&');
	    var query = utils.create(null);
	    pairs.forEach(function (pair) {
	      var strs = pair.split('=');
	      query[strs[0]] = strs[1];
	    }, this);
	    return query;
	  },
	
	  /**
	   * 启动应用
	   * @param {Component} root 应用根组件类
	   * @param {element} element 挂载元素
	   * @returns {Component} 应用根件实例
	   */
	  start: function /*istanbul ignore next*/start(root, element) {
	    this.app = new root({
	      _router: this
	    });
	    this.app.$appendTo(element);
	    return this.app;
	  }
	
	});
	
	Router.HashDirver = HashDirver;
	
	/**
	 * 路由插件安装方法
	 * @param {Component} owner 组件类
	 * @returns {void} 无返回
	 */
	Router.install = function (owner) {
	
	  owner.Router = this;
	
	  //为组件实例扩展 $router 属性
	  Object.defineProperty(owner.prototype, '$router', {
	    get: function /*istanbul ignore next*/get() {
	      if (this instanceof RouterView) {
	        return this._router || this.$parent && this.$parent.$router;
	      } else if (this.$parent) {
	        return this.$parent.$router;
	      } else if (!this.$parent) {
	        return this._router || this.router;
	      } else {
	        return null;
	      }
	    }
	  });
	
	  //为组件实例扩展 $route 属性
	  Object.defineProperty(owner.prototype, '$route', {
	    get: function /*istanbul ignore next*/get() {
	      return this.$router && this.$router.route;
	    }
	  });
	
	  //添加全局组件 RouterView
	  owner.component('RouterView', RouterView);
	
	  //添加 link 指令
	  owner.directive('link', LinkDirective);
	};
	
	module.exports = Router;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var utils = __webpack_require__(11);
	
	/**
	 * 定义正则表达式常量
	 */
	var PLACE_HOLDER_EXPR = /\{.+?\}/gim;
	var COLLECT_EXPR_STR = '([^\\/]+)';
	var GREEDY_COLLECT_EXPR_STR = '(.+)';
	
	/**
	 * 定义路由实例扩展 __proto__
	 **/
	var routeInstanceProto = {};
	
	/**
	 * 生成 action URL
	 * @param {String} action action 名称
	 * @return {String} 对应的 path
	 **/
	routeInstanceProto.actionUrl = function (action) {
	  var self = this;
	  var actionUrl = self.withoutActionUrl + '/' + action;
	  actionUrl = actionUrl.replace(/\/\//igm, '/');
	  return actionUrl;
	};
	
	/**
	 * 定义路由对象
	 * @param {Object} routes 路由眏射表
	 * @param {Object} options 选项
	 * @returns {void} 无返回
	 */
	function Router(routes, options) {
	  var self = this;
	  options = options || {};
	  self.options = options;
	  self.table = [];
	  if (routes) {
	    self.add(routes);
	  }
	}
	
	/**
	 * 解析占位符 key 定义
	 * @param {String} _keyDefStr 占位符定义
	 * @returns {Object} 占符符信息对象
	 **/
	Router.prototype._parseKeyDef = function (_keyDefStr) {
	  var keyDefStr = _keyDefStr.substring(1, _keyDefStr.length - 1);
	  var keyDefParts = keyDefStr.split(':');
	  var keyDef = {};
	  keyDef.name = keyDefParts[0];
	  if (keyDef.name[0] == '*') {
	    keyDef.greedy = true;
	    keyDef.name = keyDef.name.substring(1);
	  }
	  if (keyDefParts[1]) {
	    keyDef.expr = new RegExp(keyDefParts[1], 'igm');
	  }
	  return keyDef;
	};
	
	/**
	 * 添加一个路由配置
	 * @param {Object} route 路由项
	 * @returns {void} 无返回
	 */
	Router.prototype.addOne = function (route) {
	  var self = this;
	  if (!route || !route.pattern) return;
	  //取到所有路由key
	  PLACE_HOLDER_EXPR.lastIndex = 0;
	  var keyDefs = route.pattern.match(PLACE_HOLDER_EXPR) || [];
	  route.keys = {};
	  //初始化 url 匹配测试表达式字符串
	  var exprStr = '^' + route.pattern + '$';
	  utils.each(keyDefs, function (i) {
	    //处理 key 定义
	    var keyDef = self._parseKeyDef(keyDefs[i]);
	    route.keys[keyDef.name] = {
	      index: i,
	      expr: keyDef.expr
	    };
	    //将 'key 占位符' 的表达式，替换为 '提交值的正则表达式'
	    var collectExprStr = keyDef.greedy ? GREEDY_COLLECT_EXPR_STR : COLLECT_EXPR_STR;
	    exprStr = exprStr.replace(keyDefs[i], collectExprStr);
	  });
	  //生成 url 匹配测试表达式
	  route.expr = new RegExp(exprStr, 'igm');
	  //处理所有 route 的 method 
	  route.methods = route.methods || self.options.defaultMethods;
	  if (route.methods && route.methods.length > 0) {
	    route.methods = route.methods.map(function (method) {
	      return method.toUpperCase();
	    });
	  }
	  //继承原型
	  route.__proto__ = routeInstanceProto;
	  self.table.push(route);
	};
	
	/**
	 * 添加一组路由配置表
	 * @param {Route} routes 一个路由实体,格式:{pattern:'',target:object}
	 * @returns {void} 无返回
	 */
	Router.prototype.add = function (routes) {
	  var self = this;
	  utils.each(routes, function (_name, _route) {
	    //判断是字符串还是一个对象，并都将 _route 转为对象
	    var route = utils.isString(_route) ? { 'target': _route } : _route;
	    //尝试从名称中解析出 method 和 pattern
	    var name = (_name || '/').toString();
	    var nameParts = name.split(' ');
	    if (nameParts.length > 1) {
	      route.methods = nameParts[0].split(',');
	      route.pattern = route.pattern || nameParts[1];
	    } else {
	      route.pattern = route.pattern || nameParts[0];
	    }
	    //解析 controller 和 action
	    //target 和 controller 不可同时配置，target 可以为 'controller action' 这样的格式
	    if (route.target) {
	      var targetParts = route.target.split(' ');
	      route.controller = route.controller || targetParts[0];
	      route.action = route.action || targetParts[1];
	    }
	    route.target = route.controller;
	    //添加 route
	    self.addOne(route);
	  });
	};
	
	/**
	 * 解析路由动态 action
	 * @param {Object} route 路由项
	 * @returns {Object} 解析后路由项
	 **/
	Router.prototype._parseDynamicAction = function (route) {
	  if (route && route.action && route.action.indexOf('{') > -1) {
	    utils.each(route.params, function (key, val) {
	      route.action = utils.replace(route.action, '{' + key + '}', val);
	    });
	  }
	  return route;
	};
	
	/**
	 * 创建一个路由实例
	 * @param {object} srcRoute 路由项原型 proto
	 * @param {String} url URL
	 * @param {Object} params 参数
	 * @returns {Object} 路由实例
	 **/
	Router.prototype._createRouteInstance = function (srcRoute, url, params) {
	  var self = this;
	  var routeInstance = { __proto__: srcRoute };
	  routeInstance.params = params;
	  if (routeInstance.action) {
	    var urlParts = url.split('/');
	    routeInstance.withoutActionUrl = urlParts.slice(0, urlParts.length - 1);
	  } else {
	    routeInstance.withoutActionUrl = url;
	  }
	  routeInstance = self._parseDynamicAction(routeInstance);
	  return routeInstance;
	};
	
	/**
	 * 通过请求路径获取第一个匹配的路由
	 * @param {String} url 请求路径
	 * @param {Boolean} handleActionFromUrl 是否从 URL 中分析 action
	 * @returns {Route} 路由实体
	 */
	Router.prototype.get = function (url, handleActionFromUrl) {
	  var self = this;
	  var routeArray = [];
	  if (utils.isNull(url)) {
	    return routeArray;
	  }
	  url = url.replace(/\/\//igm, '/');
	  utils.each(self.table, function (i, route) {
	    route.expr.lastIndex = 0;
	    if (!route.expr.test(url)) return;
	    //通过子表达式 '正则的()' 取值
	    route.expr.lastIndex = 0;
	    var values = route.expr.exec(url);
	    //生成 params
	    var params = {};
	    var failed = utils.each(route.keys, function (key, keyDef) {
	      params[key] = values[keyDef.index + 1];
	      if (!keyDef.expr) return;
	      keyDef.expr.lastIndex = 0;
	      if (!keyDef.expr.test(params[key])) {
	        return true;
	      }
	    });
	    if (failed) return;
	    routeArray.push(self._createRouteInstance(route, url, params));
	  });
	  //确定 parseActionFromUrl 的值
	  handleActionFromUrl = utils.isNull(handleActionFromUrl) ? self.options.parseActionFromUrl : handleActionFromUrl;
	  //如果需要 parseActionFromUrl
	  if (handleActionFromUrl) {
	    var _routeArray = self._getForActionFromUrl(url);
	    routeArray.push.apply(routeArray, _routeArray);
	  }
	  return routeArray;
	};
	
	/**
	 * 从 url 中分解出来 action ，然后获取 route array
	 * @param {String} url 路径
	 * @returns {Object} 路由实例
	 **/
	Router.prototype._getForActionFromUrl = function (url) {
	  var self = this;
	  /*
	  一是在如果直接匹配不成功时，才将 “/” 分隔的最后一个 “字串” 当作 action 进行再一次匹配
	  */
	  var urlParts = url.split('/');
	  var lastIndex = urlParts.length - 1;
	  var action = urlParts[lastIndex];
	  //检查分解出来的 action 是否合法
	  if (action === '' || action.indexOf('.') > -1) {
	    return null;
	  }
	  var ctrlRouteUrl = urlParts.slice(0, lastIndex).join('/');
	  if (ctrlRouteUrl === '') ctrlRouteUrl = '/';
	  var ctrlRouteArray = self.get(ctrlRouteUrl, false) || [];
	  var routeArray = ctrlRouteArray.filter(function (route) {
	    /**
	     * 从 URL 分解出来的 action 不可能是动态的 action
	     * route.action 没有指定时才能作为 parseAction 的合法 route
	     **/
	    if (route.action) return false;
	    //设定 action 作为指向 action 的 route
	    route.action = action;
	    //标记一下 action 在 url 中
	    route.actionFromUrl = true;
	    return true;
	  });
	  return routeArray;
	};
	
	/**
	 * 过滤出包含指定 method 的 route
	 * @param {array} routeArray 路由实例数组
	 * @param {String} method HTTP method
	 * @returns {Object} 匹配的路由实例
	 **/
	Router.prototype.matchByMethod = function (routeArray, method) {
	  if (!routeArray || routeArray.length < 1) {
	    return routeArray;
	  }
	  return routeArray.filter(function (route) {
	    if (!route || !route.methods || route.methods.length < 1) {
	      return false;
	    }
	    return route.methods.indexOf(method) > -1;
	  })[0];
	};
	
	module.exports = Router;
	
	/*end*/

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var mokit = __webpack_require__(49).mokit;
	var Class = mokit.Class;
	var EventEmitter = mokit.EventEmitter;
	
	var SEPARATOR = '#!';
	var ROOT_PATH = '/';
	
	/**
	 * 基于 has 的路由驱动
	 */
	var HashDriver = new Class({
	  $name: 'HashDriver',
	  $extends: EventEmitter,
	
	  /**
	   * 路由驱动构造函数
	   * @param {Object} router 路径实例
	   * @returns {void} 无返回
	   */
	  constructor: function /*istanbul ignore next*/constructor(router) {
	    this.$super();
	    this.router = router;
	    window.addEventListener('hashchange', function () {
	      this._onChange();
	    }.bind(this));
	  },
	
	  /**
	   * 获取当前路径
	   * @returns {string} 当前路径
	   */
	  get: function /*istanbul ignore next*/get() {
	    return location.hash.split(SEPARATOR)[1] || ROOT_PATH;
	  },
	
	  /**
	   * 设置当前路径
	   * @param {string} path 要转到的路径
	   * @returns {void} 无返回
	   */
	  set: function /*istanbul ignore next*/set(path) {
	    path = path || ROOT_PATH;
	    location.hash = SEPARATOR + path;
	  },
	
	  /**
	   * 路由发生变化时的处理函数
	   * @param {string} path 将要转到的路径
	   * @returns {void} 无返回
	   */
	  _onChange: function /*istanbul ignore next*/_onChange(path) {
	    path = path || this.get() || '';
	    if (path[0] != ROOT_PATH) path = ROOT_PATH + path;
	    this.emit('changed', path);
	  }
	
	});
	
	module.exports = HashDriver;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var mokit = __webpack_require__(49).mokit;
	var View = mokit.components.View;
	
	var RouterView = View.extend({
	  properties: {
	    router: {
	      test: function /*istanbul ignore next*/test(router) {
	        return !!router;
	      },
	      get: function /*istanbul ignore next*/get() {
	        return this._router;
	      },
	      set: function /*istanbul ignore next*/set(router) {
	        this._router = router;
	        this._router.view = this;
	      }
	    }
	  },
	  onCreated: function /*istanbul ignore next*/onCreated() {
	    if (!this.router && this.$router) {
	      this.router = this.$router;
	    }
	  }
	});
	
	module.exports = RouterView;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var mokit = __webpack_require__(49).mokit;
	var Directive = mokit.Directive;
	var EventEmitter = mokit.EventEmitter;
	
	module.exports = new Directive({
	  literal: true,
	
	  bind: function /*istanbul ignore next*/bind() {
	    var eventTarget = this.node.$target || this.node;
	    this.emiter = new EventEmitter(eventTarget);
	    this.emiter.addListener(this.decorates[0] || 'click', function () {
	      if (!this.scope || !this.scope.$router) return;
	      this.scope.$router.go(this.path);
	    }.bind(this), false);
	  },
	
	  unbind: function /*istanbul ignore next*/unbind() {
	    this.emiter.removeListener();
	  },
	
	  update: function /*istanbul ignore next*/update(path) {
	    this.path = path;
	  }
	
	});

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Plugin = __webpack_require__(49);
	module.exports = new Plugin(function () {
	  return __webpack_require__(56);
	});

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var mokit = __webpack_require__(49).mokit;
	var utils = mokit.utils;
	
	var SUPPORT_TOUCH = 'ontouchstart' in document;
	var START_EVENT_NAME = SUPPORT_TOUCH ? 'touchstart' : 'mousedown';
	var MOVE_EVENT_NAME = SUPPORT_TOUCH ? 'touchmove' : 'mousemove';
	var END_EVENT_NAME = SUPPORT_TOUCH ? 'touchend' : 'mouseup';
	var CUSTOM_EVENT_NAMES = /*istanbul ignore next*/'tap,taphold,dbltap,swipe,swipeup,swiperight,\nswipedown,swipeleft,pointdown,pointmove,pointup';
	
	module.exports = {
	  name: CUSTOM_EVENT_NAMES,
	
	  option: {
	    swipeDurationThreshold: 1000,
	    swipeHorizontalDistanceThreshold: 25,
	    swipeVerticalDistanceThreshold: 45,
	    holdDurationThreshold: 1000,
	    dblDurationThreshold: 450,
	    scrollSupressionThreshold: 25
	  },
	
	  addListener: function /*istanbul ignore next*/addListener(emitter, name, listener, capture) {
	    if (!utils.isFunction(listener)) return;
	
	    var self = this;
	
	    //处理 touchstart 事件
	    listener.touchstart = listener.touchstart || function (event) {
	      var point = event.changedTouches ? event.changedTouches[0] : event;
	      listener.startPoint = listener.endPoint = {
	        'x': point.pageX,
	        'y': point.pageY,
	        'timeStamp': event.timeStamp,
	        'point': point
	      };
	      if (name == 'taphold') {
	        listener.createHoldHandler(event);
	      }
	      //模拟鼠标事件
	      if (name == 'pointdown') {
	        utils.copy(listener.startPoint, event);
	        emitter.emit('pointdown', event);
	        emitter.isPointDown = true;
	      }
	    };
	
	    //创建 hold 处理器
	    listener.createHoldHandler = listener.createHoldHandler || function (event) {
	      // 处理 taphold 事件
	      if (!listener.holdTimer && !listener.holdHandler) {
	        var option = self.option;
	        listener.holdHandler = function () {
	          event.taphold = true;
	          emitter.emit('taphold', event);
	        };
	        listener.holdTimer = setTimeout(function () {
	          if (listener.holdHandler) listener.holdHandler();
	        }, option.holdDurationThreshold);
	      }
	    };
	
	    //清除 hold 处理器
	    listener.clearHoldHandler = listener.clearHoldHandler || function () {
	      if (listener.holdTimer) {
	        clearTimeout(listener.holdTimer);
	        listener.holdTimer = null;
	        listener.holdHandler = null;
	      }
	    };
	
	    //获取划动信息
	    listener.getTouchInfo = function (event) {
	      var point = event.changedTouches ? event.changedTouches[0] : event;
	      listener.endPoint = {
	        'x': point.pageX,
	        'y': point.pageY,
	        'timeStamp': event.timeStamp,
	        'point': point
	      };
	      //
	      var option = self.option;
	      // 一些计算结果
	      var info = {};
	      info.timeStamp = listener.endPoint ? listener.endPoint.timeStamp : null;
	      info.existStartAndStop = listener.endPoint && listener.startPoint;
	      info.horizontalDistance = info.existStartAndStop ? listener.endPoint.x - listener.startPoint.x : 0;
	      info.verticalDistance = info.existStartAndStop ? listener.endPoint.y - listener.startPoint.y : 0;
	      info.horizontalDistanceValue = Math.abs(info.horizontalDistance);
	      info.verticalDistanceVlaue = Math.abs(info.verticalDistance);
	      info.isHorizontal = info.horizontalDistanceValue >= info.verticalDistanceVlaue;
	      info.isVertical = !info.sHorizontal;
	      info.isSwipeMove = info.horizontalDistanceValue >= option.swipeHorizontalDistanceThreshold || info.verticalDistanceVlaue >= option.swipeVerticalDistanceThreshold;
	      info.isSwipeTime = info.existStartAndStop ? listener.endPoint.timeStamp - listener.startPoint.timeStamp <= option.swipeDurationThreshold : true;
	      info.isHoldTime = info.existStartAndStop ? listener.endPoint.timeStamp - listener.startPoint.timeStamp >= option.holdDurationThreshold : false;
	      //这里的 direction 仅是指划动方法，不代表 swipe 动作，swipe 动作还有时间或划动距离等因素
	      if (info.isHorizontal && info.horizontalDistance > 0) {
	        info.direction = 'right';
	      } else if (info.isHorizontal && info.horizontalDistance < 0) {
	        info.direction = 'left';
	      } else if (info.isVertical && info.verticalDistance > 0) {
	        info.direction = 'down';
	      } else if (info.isVertical && info.verticalDistance < 0) {
	        info.direction = 'up';
	      }
	      return info;
	    };
	
	    //处理 touchmove 事件
	    listener.touchmove = listener.touchmove || function (event) {
	      var info = listener.getTouchInfo(event);
	      if (info.isSwipeMove) {
	        listener.clearHoldHandler();
	      }
	      var stopBubble = false;
	      //模拟鼠标事件
	      if (emitter.isPointDown && name == 'pointmove') {
	        utils.copy(listener.endPoint, event);
	        emitter.emit('pointmove', event);
	        stopBubble = true;
	      }
	      //在绑定划动的方向上禁止滚动，因为 Android 4.x 不如此处理，touchend 事件将不触发
	      if (name == 'swipe' || name == 'swipe' + info.direction) {
	        stopBubble = true;
	      }
	      //如果需要阻止冒泡
	      if (stopBubble) {
	        return false;
	      }
	    };
	
	    //完成事件
	    listener.done = listener.done || function (event) {
	      listener.clearHoldHandler();
	      var info = listener.getTouchInfo(event);
	      //模拟鼠标事件
	      if (name == 'pointup') {
	        utils.copy(listener.endPoint, event);
	        emitter.emit('pointup', event);
	        emitter.isPointDown = false;
	      }
	      // 根据计算结果判断
	      if (info.isSwipeTime && info.isSwipeMove) {
	        event.swipe = true;
	        event.direction = info.direction;
	        if (name == 'swipe') {
	          emitter.emit('swipe', event);
	        }
	        if (name == 'swipe' + event.direction) {
	          emitter.emit('swipe' + event.direction, event);
	        }
	      } else if (info.isSwipeTime && !info.isSwipeMove && !info.isHoldTime) {
	        if (name == 'tap') {
	          emitter.emit('tap', event);
	        }
	        if (name == 'dbltap') {
	          //处理 “双击”
	          var option = self.option;
	          event.dbltap = listener.PreTapTime && info.timeStamp - listener.PreTapTime <= option.dblDurationThreshold;
	          if (event.dbltap) {
	            emitter.emit('dbltap', event);
	            listener.PreTapTime = null;
	          } else {
	            listener.PreTapTime = listener.endPoint.timeStamp;
	          }
	        }
	      }
	    };
	
	    //绑定组合事件
	    emitter.on(START_EVENT_NAME, listener.touchstart, capture);
	    emitter.on(MOVE_EVENT_NAME, listener.touchmove, capture);
	    emitter.on(END_EVENT_NAME, listener.done, capture);
	  },
	
	  removeListener: function /*istanbul ignore next*/removeListener(emitter, name, listener, capture) {
	    //只有指定了 handler 才能取消构成组合事件的 “原事件”
	    //否则会直接移除会将其他 touchstart 等事件也移除
	    if (utils.isFunction(listener)) {
	      if (utils.isFunction(listener.touchstart)) {
	        emitter.off(START_EVENT_NAME, listener.touchstart, capture);
	      }
	      if (utils.isFunction(listener.touchmove)) {
	        emitter.off(MOVE_EVENT_NAME, listener.touchmove, capture);
	      }
	      if (utils.isFunction(listener.done)) {
	        emitter.off(END_EVENT_NAME, listener.done, capture);
	      }
	    }
	  },
	
	  install: function /*istanbul ignore next*/install(mokit) {
	    mokit.EventEmitter.register(this);
	    mokit.Touch = this;
	  }
	
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	var Plugin = __webpack_require__(49);
	module.exports = new Plugin(function () {
	  return __webpack_require__(58);
	});

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	__webpack_require__(59);
	var classes = __webpack_require__(60);
	var utils = __webpack_require__(61);
	var mokit = __webpack_require__(49).mokit;
	var EventEmitter = mokit.EventEmitter;
	var Class = mokit.Class;
	
	var Transition = new Class({
	
	  constructor: function /*istanbul ignore next*/constructor(id) {
	    this.classes = classes.get(id);
	  },
	
	  init: function /*istanbul ignore next*/init(view) {
	    utils.addClass(view.$element, 'ts-container');
	  },
	
	  clean: function /*istanbul ignore next*/clean(view) {
	    utils.removeClass(view.$element, 'ts-container');
	  },
	
	  prep: function /*istanbul ignore next*/prep(newComponent, oldComponent) {
	    if (!newComponent || !oldComponent) return;
	    utils.addClass(newComponent.$element, 'ts-item');
	    utils.addClass(oldComponent.$element, 'ts-item');
	  },
	
	  go: function /*istanbul ignore next*/go(newComponent, oldComponent, done) {
	    if (!newComponent || !oldComponent) return done();
	    var doneCount = 0;
	    var newEmitter = new EventEmitter(newComponent.$element);
	    var oldEmitter = new EventEmitter(oldComponent.$element);
	    var checkDone = function () {
	      if (++doneCount > 1) {
	        newEmitter.off(utils.ANIMATION_END_EVENT_NAME, checkDone);
	        oldEmitter.off(utils.ANIMATION_END_EVENT_NAME, checkDone);
	        utils.removeClass(oldComponent.$element, this.classes.leave);
	        utils.removeClass(oldComponent.$element, 'ts-item');
	        utils.removeClass(newComponent.$element, this.classes.enter);
	        utils.removeClass(newComponent.$element, 'ts-item');
	        done();
	      }
	    }.bind(this);
	    newEmitter.on(utils.ANIMATION_END_EVENT_NAME, checkDone);
	    oldEmitter.on(utils.ANIMATION_END_EVENT_NAME, checkDone);
	    utils.addClass(newComponent.$element, this.classes.enter);
	    utils.addClass(oldComponent.$element, this.classes.leave);
	  }
	
	});
	
	Transition.install = function (mokit) {
	  mokit.Transition = this;
	};
	
	module.exports = Transition;

/***/ },
/* 59 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 60 */
/***/ function(module, exports) {

	/*istanbul ignore next*/'use strict';
	
	/**
	 * 获取动画样式
	 * @param {int} num 编号
	 * @returns {Object} 包含一组样式名的对象
	 */
	exports.get = function (num) {
	  var leave = /*istanbul ignore next*/void 0,
	      enter = /*istanbul ignore next*/void 0;
	  /* eslint-disable */
	  switch (num) {
	    case 1:
	      leave = 'ts-moveToLeft';
	      enter = 'ts-moveFromRight';
	      break;
	    case 2:
	      leave = 'ts-moveToRight';
	      enter = 'ts-moveFromLeft';
	      break;
	    case 3:
	      leave = 'ts-moveToTop';
	      enter = 'ts-moveFromBottom';
	      break;
	    case 4:
	      leave = 'ts-moveToBottom';
	      enter = 'ts-moveFromTop';
	      break;
	    case 5:
	      leave = 'ts-fade';
	      enter = 'ts-moveFromRight ts-ontop';
	      break;
	    case 6:
	      leave = 'ts-fade';
	      enter = 'ts-moveFromLeft ts-ontop';
	      break;
	    case 7:
	      leave = 'ts-fade';
	      enter = 'ts-moveFromBottom ts-ontop';
	      break;
	    case 8:
	      leave = 'ts-fade';
	      enter = 'ts-moveFromTop ts-ontop';
	      break;
	    case 9:
	      leave = 'ts-moveToLeftFade';
	      enter = 'ts-moveFromRightFade';
	      break;
	    case 10:
	      leave = 'ts-moveToRightFade';
	      enter = 'ts-moveFromLeftFade';
	      break;
	    case 11:
	      leave = 'ts-moveToTopFade';
	      enter = 'ts-moveFromBottomFade';
	      break;
	    case 12:
	      leave = 'ts-moveToBottomFade';
	      enter = 'ts-moveFromTopFade';
	      break;
	    case 13:
	      leave = 'ts-moveToLeftEasing ts-ontop';
	      enter = 'ts-moveFromRight';
	      break;
	    case 14:
	      leave = 'ts-moveToRightEasing ts-ontop';
	      enter = 'ts-moveFromLeft';
	      break;
	    case 15:
	      leave = 'ts-moveToTopEasing ts-ontop';
	      enter = 'ts-moveFromBottom';
	      break;
	    case 16:
	      leave = 'ts-moveToBottomEasing ts-ontop';
	      enter = 'ts-moveFromTop';
	      break;
	    case 17:
	      leave = 'ts-scaleDown';
	      enter = 'ts-moveFromRight ts-ontop';
	      break;
	    case 18:
	      leave = 'ts-scaleDown';
	      enter = 'ts-moveFromLeft ts-ontop';
	      break;
	    case 19:
	      leave = 'ts-scaleDown';
	      enter = 'ts-moveFromBottom ts-ontop';
	      break;
	    case 20:
	      leave = 'ts-scaleDown';
	      enter = 'ts-moveFromTop ts-ontop';
	      break;
	    case 21:
	      leave = 'ts-scaleDown';
	      enter = 'ts-scaleUpDown ts-delay300';
	      break;
	    case 22:
	      leave = 'ts-scaleDownUp';
	      enter = 'ts-scaleUp ts-delay300';
	      break;
	    case 23:
	      leave = 'ts-moveToLeft ts-ontop';
	      enter = 'ts-scaleUp';
	      break;
	    case 24:
	      leave = 'ts-moveToRight ts-ontop';
	      enter = 'ts-scaleUp';
	      break;
	    case 25:
	      leave = 'ts-moveToTop ts-ontop';
	      enter = 'ts-scaleUp';
	      break;
	    case 26:
	      leave = 'ts-moveToBottom ts-ontop';
	      enter = 'ts-scaleUp';
	      break;
	    case 27:
	      leave = 'ts-scaleDownCenter';
	      enter = 'ts-scaleUpCenter ts-delay400';
	      break;
	    case 28:
	      leave = 'ts-rotateRightSideFirst';
	      enter = 'ts-moveFromRight ts-delay200 ts-ontop';
	      break;
	    case 29:
	      leave = 'ts-rotateLeftSideFirst';
	      enter = 'ts-moveFromLeft ts-delay200 ts-ontop';
	      break;
	    case 30:
	      leave = 'ts-rotateTopSideFirst';
	      enter = 'ts-moveFromTop ts-delay200 ts-ontop';
	      break;
	    case 31:
	      leave = 'ts-rotateBottomSideFirst';
	      enter = 'ts-moveFromBottom ts-delay200 ts-ontop';
	      break;
	    case 32:
	      leave = 'ts-flipOutRight';
	      enter = 'ts-flipInLeft ts-delay500';
	      break;
	    case 33:
	      leave = 'ts-flipOutLeft';
	      enter = 'ts-flipInRight ts-delay500';
	      break;
	    case 34:
	      leave = 'ts-flipOutTop';
	      enter = 'ts-flipInBottom ts-delay500';
	      break;
	    case 35:
	      leave = 'ts-flipOutBottom';
	      enter = 'ts-flipInTop ts-delay500';
	      break;
	    case 36:
	      leave = 'ts-rotateFall ts-ontop';
	      enter = 'ts-scaleUp';
	      break;
	    case 37:
	      leave = 'ts-rotateOutNewspaper';
	      enter = 'ts-rotateInNewspaper ts-delay500';
	      break;
	    case 38:
	      leave = 'ts-rotatePushLeft';
	      enter = 'ts-moveFromRight';
	      break;
	    case 39:
	      leave = 'ts-rotatePushRight';
	      enter = 'ts-moveFromLeft';
	      break;
	    case 40:
	      leave = 'ts-rotatePushTop';
	      enter = 'ts-moveFromBottom';
	      break;
	    case 41:
	      leave = 'ts-rotatePushBottom';
	      enter = 'ts-moveFromTop';
	      break;
	    case 42:
	      leave = 'ts-rotatePushLeft';
	      enter = 'ts-rotatePullRight ts-delay180';
	      break;
	    case 43:
	      leave = 'ts-rotatePushRight';
	      enter = 'ts-rotatePullLeft ts-delay180';
	      break;
	    case 44:
	      leave = 'ts-rotatePushTop';
	      enter = 'ts-rotatePullBottom ts-delay180';
	      break;
	    case 45:
	      leave = 'ts-rotatePushBottom';
	      enter = 'ts-rotatePullTop ts-delay180';
	      break;
	    case 46:
	      leave = 'ts-rotateFoldLeft';
	      enter = 'ts-moveFromRightFade';
	      break;
	    case 47:
	      leave = 'ts-rotateFoldRight';
	      enter = 'ts-moveFromLeftFade';
	      break;
	    case 48:
	      leave = 'ts-rotateFoldTop';
	      enter = 'ts-moveFromBottomFade';
	      break;
	    case 49:
	      leave = 'ts-rotateFoldBottom';
	      enter = 'ts-moveFromTopFade';
	      break;
	    case 50:
	      leave = 'ts-moveToRightFade';
	      enter = 'ts-rotateUnfoldLeft';
	      break;
	    case 51:
	      leave = 'ts-moveToLeftFade';
	      enter = 'ts-rotateUnfoldRight';
	      break;
	    case 52:
	      leave = 'ts-moveToBottomFade';
	      enter = 'ts-rotateUnfoldTop';
	      break;
	    case 53:
	      leave = 'ts-moveToTopFade';
	      enter = 'ts-rotateUnfoldBottom';
	      break;
	    case 54:
	      leave = 'ts-rotateRoomLeftOut ts-ontop';
	      enter = 'ts-rotateRoomLeftIn';
	      break;
	    case 55:
	      leave = 'ts-rotateRoomRightOut ts-ontop';
	      enter = 'ts-rotateRoomRightIn';
	      break;
	    case 56:
	      leave = 'ts-rotateRoomTopOut ts-ontop';
	      enter = 'ts-rotateRoomTopIn';
	      break;
	    case 57:
	      leave = 'ts-rotateRoomBottomOut ts-ontop';
	      enter = 'ts-rotateRoomBottomIn';
	      break;
	    case 58:
	      leave = 'ts-rotateCubeLeftOut ts-ontop';
	      enter = 'ts-rotateCubeLeftIn';
	      break;
	    case 59:
	      leave = 'ts-rotateCubeRightOut ts-ontop';
	      enter = 'ts-rotateCubeRightIn';
	      break;
	    case 60:
	      leave = 'ts-rotateCubeTopOut ts-ontop';
	      enter = 'ts-rotateCubeTopIn';
	      break;
	    case 61:
	      leave = 'ts-rotateCubeBottomOut ts-ontop';
	      enter = 'ts-rotateCubeBottomIn';
	      break;
	    case 62:
	      leave = 'ts-rotateCarouselLeftOut ts-ontop';
	      enter = 'ts-rotateCarouselLeftIn';
	      break;
	    case 63:
	      leave = 'ts-rotateCarouselRightOut ts-ontop';
	      enter = 'ts-rotateCarouselRightIn';
	      break;
	    case 64:
	      leave = 'ts-rotateCarouselTopOut ts-ontop';
	      enter = 'ts-rotateCarouselTopIn';
	      break;
	    case 65:
	      leave = 'ts-rotateCarouselBottomOut ts-ontop';
	      enter = 'ts-rotateCarouselBottomIn';
	      break;
	    case 66:
	      leave = 'ts-rotateSidesOut';
	      enter = 'ts-rotateSidesIn ts-delay200';
	      break;
	    case 67:
	      leave = 'ts-rotateSlideOut';
	      enter = 'ts-rotateSlideIn';
	      break;
	    case 68:
	      leave = 'ts-fade ts-ontop';
	      enter = 'ts-fade ts-delay200';
	      break;
	  }
	  /* eslint-enable */
	
	  return { enter: enter, leave: leave };
	};

/***/ },
/* 61 */
/***/ function(module, exports) {

	/*istanbul ignore next*/'use strict';
	
	/**
	 * 添加或删除 className
	 * @param {element} element 元素
	 * @param {string} classNames 样式名称
	 * @param {boolean} state 添加或删除
	 * @returns {void} 无返回
	 */
	exports.setClassNames = function (element, classNames, state) {
	  if (!element || !classNames) return;
	  if (!(classNames instanceof Array)) {
	    classNames = classNames.split(' ');
	  }
	  classNames.forEach(function (className) {
	    element.classList[state ? 'add' : 'remove'](className);
	  }, this);
	};
	
	/**
	 * 添加 className
	 * @param {element} element 元素
	 * @param {string} classNames 样式名称
	 * @returns {void} 无返回
	 */
	exports.addClass = function (element, classNames) {
	  this.setClassNames(element, classNames, true);
	};
	
	/**
	 * 删除 className
	 * @param {element} element 元素
	 * @param {string} classNames 样式名称
	 * @returns {void} 无返回
	 */
	exports.removeClass = function (element, classNames) {
	  this.setClassNames(element, classNames, false);
	};
	
	// 取浏览器的 CSS 前缀
	exports.BROWSER_PREFIX = function () {
	  var styles = window.getComputedStyle(document.documentElement, '');
	  return (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1];
	}();
	
	// css 动画解束时的事件
	exports.ANIMATION_END_EVENT_NAME = /*istanbul ignore next*/exports.BROWSER_PREFIX + 'AnimationEnd';

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	__webpack_require__(63);
	var mokit = __webpack_require__(9);
	
	module.exports = new mokit.Component({
	  template: __webpack_require__(64),
	  /*istanbul ignore next*/data: function data() {
	    return {
	      transition: new mokit.Transition(34)
	    };
	  }
	});

/***/ },
/* 63 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = "<div class=\"app\">\n  <nav class=\"navbar navbar-default navbar-inverse navbar-fixed-top\">\n    <div class=\"container-fluid\">\n      <div class=\"navbar-header\">\n        <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\"\n          aria-expanded=\"false\">\n          <span class=\"sr-only\">Toggle navigation</span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n          </button>\n          <a class=\"navbar-brand\" href=\"javascript:;\">MOKIT</a>\n      </div>\n      <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n        <ul class=\"nav navbar-nav\">\n          <li class=\"{{$route.path=='/home'?'active':''}}\"><a href=\"javascript:;\" m:link=\"/home\">HOME</a></li>\n          <li class=\"{{$route.path=='/about'?'active':''}}\"><a href=\"javascript:;\" m:link=\"/about\">ABOUT</a></li>\n          </li>\n        </ul>\n        <ul class=\"nav navbar-nav navbar-right\">\n          <li><a href=\"javascript:;\">Your Name</a></li>\n        </ul>\n      </div>\n    </div>\n  </nav>\n  <div class=\"container\">\n    <m:router-view transition=\"{{transition}}\"></m:router-view>\n  </div>\n</div>"

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	__webpack_require__(66);
	var mokit = __webpack_require__(9);
	var Hello = __webpack_require__(67);
	var info = __webpack_require__(70);
	
	module.exports = new mokit.Component({
	  components: {
	    Hello: Hello
	  },
	  template: __webpack_require__(71),
	  /*istanbul ignore next*/data: function data() {
	    return info;
	  }
	});

/***/ },
/* 66 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	__webpack_require__(68);
	var mokit = __webpack_require__(9);
	
	module.exports = new mokit.Component({
	  template: __webpack_require__(69),
	  props: {
	    name: ''
	  }
	});

/***/ },
/* 68 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = "<div class=\"hello\">\n  Hello {{name}}\n</div>"

/***/ },
/* 70 */
/***/ function(module, exports) {

	/*istanbul ignore next*/'use strict';
	
	exports.name = 'mokit';

/***/ },
/* 71 */
/***/ function(module, exports) {

	module.exports = "<div class=\"jumbotron home\">\n  <h1>\n    <m:hello name=\"{{name}}\"></m:hello>\n  </h1>\n  <p>This is an example of 'Home'</p>\n  <p><a class=\"btn btn-primary btn-lg\" href=\"javascript:;\" m:link=\"/about\" role=\"button\">Go About</a></p>\n</div>"

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';
	
	__webpack_require__(73);
	var mokit = __webpack_require__(9);
	
	module.exports = new mokit.Component({
	  template: __webpack_require__(74)
	});

/***/ },
/* 73 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 74 */
/***/ function(module, exports) {

	module.exports = "<div class=\"jumbotron about\">\n  <h1>\n    About\n  </h1>\n  <p>This is an example of 'About'</p>\n  <p><a class=\"btn btn-primary btn-lg\" href=\"javascript:;\" m:link=\"/home\" role=\"button\">Go Home</a></p>\n</div>"

/***/ }
/******/ ]);
//# sourceMappingURL=mditor.js.map