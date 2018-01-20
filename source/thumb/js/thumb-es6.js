// import EventTarget from 'event-observer.js'
// import library from 'library.js'

class LibCollector {
	constructor() {
		
	}
	thumbCount(num){
		return ++num;
	}
	
	
}
class EventTarget {
	constructor() {
		this.messages = {};
	}
	on(type, handler) {
		if (this.messages[type]) {　　　　
			this.messages[type].push(handler);　　
		} else {　　　　
			this.messages[type] = [handler];　　
		}
	}
	emit(type, opt) {
		if (!this.messages[type]) return false;　　　　
		this.messages[type].forEach(function(item) {　　　　　　
			item(opt);　　　　
		});
	}
	cancel(type, handler) {
		var i = this.messages[type].indexOf(handler);　　　　
		if (!this.messages[type] || i == -1)
			return false;　　　　
		this.messages[type].splice(i, 1);
	}
	
}
let library=new LibCollector();
class PraiseAct {
	constructor() {
		this.count = 0;
	}
	doCount() {
		this.count=library.thumbCount(this.count);
		this.doCountCallBack();
	}
	doCountCallBack(){

	}
}


class ThumbsUp extends PraiseAct {
	constructor(ele_id) {
		super();
		this.init(ele_id);
		// this.jq = jq;
	}
	init(ele_id) {
		var isLoadJq = false;
		if (typeof ele_id === 'string') {
			this.thumb_ele = document.querySelector("#" + ele_id);
		} else{
			this.thumb_ele = ele_id[0];
			isLoadJq=true;
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
			if(!isLoadJq){
				this.thumb_ele.addEventListener('click', this.doCount.bind(this), false);
			}
			
		}

	}
	toActDo(){
		this.emitEvent = new EventTarget();
		this.emitEvent.on("count", this.showCount.bind(this));			
	}
	showCount() {
		if (this.strong_ele) {
			this.strong_ele.innerText = this.count;
		}

	}
	doCountCallBack() {
		this.emitEvent.emit("count");
	}
}
// new ThumbsUp("thumb_btn");
//改成es6形式this变成undefined
(function($){
	$.fn.extend({
		startThumbAction: function() {
			let thumbsAction=new ThumbsUp($(this));
			$(this).click((e)=>{
				thumbsAction.doCount(e);
			});
		}
	});

})(jQuery);
$("#thumb_btn").startThumbAction();