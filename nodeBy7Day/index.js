/**
 * Created by Admin on 2017/9/28.
 */
var random = require('./count')
var random2 = require('./count')
const path = require('path')
var fs = require('fs')


//console.log(random)
//console.log(random2)


//console.log(process.argv.slice(2))

var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);

//console.log(bin.toString())


var cache = {};

function store(key, value) {
  cache[path.normalize(key)] = value;
}

store('foo/bar', 1);
store('../foo/bar/baz/dd/ee', 2);
console.log(cache);  // => { "foo/bar": 2 }

function factorial(n) {
  if (n === 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

//console.log(factorial(3))


function travelSync(dir,callback){
  var dirPath = fs.readdirSync(dir)
  dirPath.forEach((file) =>{
    var pathName = path.join(dir,file)
    if(fs.statSync(pathName).isDirectory()){
      travelSync(pathName,callback)
    }else{
      callback(pathName)
    }
  })
}

//travelSync('E:/cgpt/dateStation',function(name){
//  console.log(name)
//})

function travel(dir, callback, finish) {
  fs.readdir(dir, function (err, files) {
    (function next(i) {
      if (i < files.length) {
        var pathname = path.join(dir, files[i]);

        fs.stat(pathname, function (err, stats) {
          if (stats.isDirectory()) {
            travel(pathname, callback, function () {
              next(i + 1);
            });
          } else {
            callback(pathname, function () {
              next(i + 1);
            });
          }
        });
      } else {
        finish && finish();
      }
    }(0));
  });
}



//travelSync('E:/cgpt/dateStation',function(name){
//  console.log(name)
//})

var http = require('http');

http.createServer(function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text-plain' });
  response.end('Hello World\n');
}).listen(80);


var options = {
  hostname: 'www.example.com',
  port: 80,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

var request = http.request(options, function (response) {});
request.write('Hello World');
request.end()


//http.get('http://www.example.com/', function (response) {
//  var body = [];
//
//  console.log(response.statusCode);
//  console.log(response.headers);
//
//  response.on('data', function (chunk) {
//    body.push(chunk);
//  });
//
//  response.on('end', function () {
//    body = Buffer.concat(body);
//    console.log(body.toString());
//  });
//});


var url = require('url')

var parseUrl = url.parse('http://www.runoob.com/nodejs/nodejs-fs.html?id=1&name=hesy',true,true)
console.log(parseUrl)