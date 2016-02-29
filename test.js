
var test='#include<stdio.h>'+"\n"+'int main(){int a,b; scanf("%d%d",&a,&b); printf("%d",a+b);}';
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

function pr(error, stdout, stderr){
  var result={};
  result.stdout=stdout;
  result.stderr=stderr;
  if(result.stderr=='')
    result.success=true;
  else
    result.success=false;
    console.log(result);
}
compile(test,"45 60 ",pr);
