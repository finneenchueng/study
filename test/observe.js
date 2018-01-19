var mapleTao = {　　
	message: {},
	　　 //注册
	　　register: function(type, fn) {　　
		if (this.message[type]) {　　　　
			this.message[type].push(fn);　　
		} else {　　　　
			this.message[type] = [fn];　　
		}　　
	},
	//发布
	　　fire: function(type, opt) {　　　　
		if (!this.message[type]) return false;　　　　
		this.message[type].forEach(function(item) {　　　　　　
			item(opt);　　　　
		});　　
	},
	　　 //取消
	　　remove: function(type, fn) {　　　　
		var i = this.message[type].indexOf(fn);　　　　
		if (!this.message[type] || i == -1) return false;　　　　
		this.message[type].splice(i, 1);　　
	}
};


(function() {　　
	var maple = function() {　　　　
		console.log("i am maple");　　
	}　　 //注册事件introduce
	　　
	mapleTao.register("introduce", maple);
})();
(function() {　　
	var tao = function() {　　　　
		console.log("i am tao");　　
	}　　 //注册事件introduce
	　　
	mapleTao.register("introduce", tao);　　　　
	setTimeout(function() {　　
		mapleTao.remove("introduce", tao); //introduce在事件库中去除tao
		　　　　
		mapleTao.fire("introduce"); //触发introduce信号 结果为i am maple
		　　
	}, 0)
})();

mapleTao.fire("introduce"); //触发introduce信号 结果为i am maple，i am tao

(function() {　　
	var maple = function(obj) { //对参数处理
		　　　　
		console.log("i am maple,i am " + obj.status);　　
	}
	//注册事件status
	　　
	mapleTao.register("status", maple);
})();
(function() {　　
	var tao = function(obj) {　　　　
		console.log("i am tao,i am " + obj.name);
	}
	//注册事件status
	　　
	mapleTao.register("status", tao);
})();

mapleTao.fire("status", {
	status: "working",
	name: "studying"
}); //结果 i am maple,i am working   i am tao,i am studying



/*

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

class PraiseAct {
	constructor() {
		this.count = 0;
	}
	doCount() {
		this.count++;
		console.log(this.count);
	}
}


class ThumbsUp extends PraiseAct {
	constructor(ele_id) {
		super();
		this.init(ele_id);
		
	}
	init(ele_id){
		this.thumb_ele=document.querySelector("#"+ele_id);
		if(this.thumb_ele!=null){
			this.strong_ele=this.thumb_ele.querySelector("strong");
			this.emitEvent=new EventTarget();
			this.emitEvent.on("count", this.showCount.bind(this));
			this.thumb_ele.addEventListener('click',this.doCount.bind(this),false);
		}
		
	}
	showCount() {
		if(this.strong_ele){
			this.strong_ele.innerText=this.count;
		}
		
	}
	doCount(e) {
		this.count++;
		this.emitEvent.emit("count");
	}
}
new ThumbsUp("thumb_btn");
 */