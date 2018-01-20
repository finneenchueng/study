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

export default EventTarget