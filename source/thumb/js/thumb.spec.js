require("thumb.js");
describe("点赞计数测试",function(){
	it("单元测试",function(){
		expect(library.thumbCount(0)).toBe(1);
	});
});