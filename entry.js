//引入文件读写模块fs
var fs = require('fs');
var path = require('path');
//引入http模块
var http = require("http");
//设置主机名
var hostName = '127.0.0.1';
//设置端口
var port = 3001;
//创建服务
var server = http.createServer(function(req,res){
    //编写url  其中index.html是要服务器读取的文件
    var url = req.url=='/'?'index.html':req.url;
    console.log(url)
    var filePath=path.join(__dirname, url);
    //开始文件读取，参数分别是完整的url 编码 和读取完毕执行的函数，注意前后台编码需要一致
    fs.readFile(filePath,'utf-8',function(err,data){
        //res.write服务器的相应，当成功的时候，服务器会传输一个data数据，相应结束需要end
        if(err){ 
            res.write('404,您访问的页面不存在');
            res.end();    
        }else{
            //获取后缀名
            var i = filePath.lastIndexOf('.');
            var suffix = filePath.substr( i+1, filePath.length);
            res.writeHead(200,{'Content-type':"text/"+suffix});    //通过后缀名指定mime类型
            res.write(data);
            res.end();   
        }
    });

});
server.listen(port,hostName,function(){
    console.log(`服务器运行在http://${hostName}:${port}`);
});