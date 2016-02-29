var express = require('express');
 var app = express();

 /*compiler functions*/
function compile(code,input,callback){
var exec = require('child_process').exec;
var fs = require('fs');
fs.writeFile("code.c", code, ['utf-8'], function(){
  fs.writeFile("input", input, ['utf-8'], function(){
    var cmd = 'gcc code.c';
    exec(cmd, function(error, stdout, stderr) {
    if(error)
      callback(error, stdout, stderr);
    else{
      exec('./a.out < input',function(error, stdout, stderr){
          callback(error,stdout,stderr);
      });
    }
    });
  });
});
};

 
 /* serves main page */
 app.get("/", function(req, res) {
    res.sendfile('index.html')
 });
 
  app.get("/compile", function(req, res) {
    console.log(req.query);
    compile(req.query.code,req.query.input,function(error, stdout, stderr){
    	var result={};
  		result.stdout=stdout;
  		result.stderr=stderr;
  		if(result.stderr=='')
    		result.success=true;
  		else
    		result.success=false;
    	console.log(result);
    	res.send(result);	
    });
 });
 
 app.post("/user/add", function(req, res) { 
	/* some server side logic */
	res.send("OK");
  });
 
 /* serves all the static files */
 app.get(/^(.+)$/, function(req, res){ 
     console.log('static file request : ' + req.params);
     res.sendfile( __dirname + req.params[0]); 
 });
 
 var port = process.env.PORT || 3000;
 app.listen(port, function() {
   console.log("Listening on " + port);
 });
