"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import EventTarget from 'event-observer.js'
// import library from 'library.js'

var LibCollector = function () {
	function LibCollector() {
		_classCallCheck(this, LibCollector);
	}

	_createClass(LibCollector, [{
		key: "thumbCount",
		value: function thumbCount(num) {
			return ++num;
		}
	}]);

	return LibCollector;
}();

var EventTarget = function () {
	function EventTarget() {
		_classCallCheck(this, EventTarget);

		this.messages = {};
	}

	_createClass(EventTarget, [{
		key: "on",
		value: function on(type, handler) {
			if (this.messages[type]) {
				this.messages[type].push(handler);
			} else {
				this.messages[type] = [handler];
			}
		}
	}, {
		key: "emit",
		value: function emit(type, opt) {
			if (!this.messages[type]) return false;
			this.messages[type].forEach(function (item) {
				item(opt);
			});
		}
	}, {
		key: "cancel",
		value: function cancel(type, handler) {
			var i = this.messages[type].indexOf(handler);
			if (!this.messages[type] || i == -1) return false;
			this.messages[type].splice(i, 1);
		}
	}]);

	return EventTarget;
}();

var library = new LibCollector();

var PraiseAct = function () {
	function PraiseAct() {
		_classCallCheck(this, PraiseAct);

		this.count = 0;
	}

	_createClass(PraiseAct, [{
		key: "doCount",
		value: function doCount() {
			this.count = library.thumbCount(this.count);
			this.doCountCallBack();
		}
	}, {
		key: "doCountCallBack",
		value: function doCountCallBack() {}
	}]);

	return PraiseAct;
}();

var ThumbsUp = function (_PraiseAct) {
	_inherits(ThumbsUp, _PraiseAct);

	function ThumbsUp(ele_id) {
		_classCallCheck(this, ThumbsUp);

		var _this = _possibleConstructorReturn(this, (ThumbsUp.__proto__ || Object.getPrototypeOf(ThumbsUp)).call(this));

		_this.init(ele_id);
		// this.jq = jq;
		return _this;
	}

	_createClass(ThumbsUp, [{
		key: "init",
		value: function init(ele_id) {
			var isLoadJq = false;
			if (typeof ele_id === 'string') {
				this.thumb_ele = document.querySelector("#" + ele_id);
			} else {
				this.thumb_ele = ele_id[0];
				isLoadJq = true;
			}

			// else if (this.jq!=undefined && ele_id instanceof this.jq) {
			// 	this.thumb_ele = ele_id[0];
			// 	isLoadJq=true;
			// } else {
			// 	this.thumb_ele = ele_id;
			// }
			if (this.thumb_ele != null) {
				this.strong_ele = this.thumb_ele.querySelector("strong");
				this.toActDo();
				if (!isLoadJq) {
					this.thumb_ele.addEventListener('click', this.doCount.bind(this), false);
				}
			}
		}
	}, {
		key: "toActDo",
		value: function toActDo() {
			this.emitEvent = new EventTarget();
			this.emitEvent.on("count", this.showCount.bind(this));
		}
	}, {
		key: "showCount",
		value: function showCount() {
			if (this.strong_ele) {
				this.strong_ele.innerText = this.count;
			}
		}
	}, {
		key: "doCountCallBack",
		value: function doCountCallBack() {
			this.emitEvent.emit("count");
		}
	}]);

	return ThumbsUp;
}(PraiseAct);
// new ThumbsUp("thumb_btn");
//改成es6形式this变成undefined


if (jQuery) {
	(function ($) {
		$.fn.extend({
			startThumbAction: function startThumbAction() {
				var thumbsAction = new ThumbsUp($(this));
				$(this).click(function (e) {
					thumbsAction.doCount(e);
				});
			}
		});
	})(jQuery);
	$("#thumb_btn").startThumbAction();
}
