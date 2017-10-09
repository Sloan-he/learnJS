/**
 * Created by hesy on 2017/9/30.
 */
//function heavyCompute(n) {
//  var count = 0,
//    i, j;
//
//  for (i = n; i > 0; --i) {
//    for (j = n; j > 0; --j) {
//      count += 1;
//    }
//  }
//}
//
//var t = new Date();
//
//setTimeout(function () {
//  console.log(new Date() - t);
//}, 1000);
//
//heavyCompute(50000);

var arr = [1,2,3,4,5,6,7];
var fs =  require("fs");
//var async = function(num,cb){
//  cb(num)
//};


//function next(i, len, callback) {
//  if (i < len) {
//    fs.readFile('net.js',function(err,data){
//      if(err){
//        console.log('err, num is',arr[i],',i is',i)
//        return
//      }
//      arr[i] = arr[i]+1;
//      next(i + 1, len, callback);
//    })
//  } else {
//    callback();
//  }
//}
//
//next(0, arr.length, function () {
//  console.log(arr)
//})

//(function (i, len, count, callback) {
//  for (; i < len; ++i) {
//    (function (i) {
//      fs.readFile('net.js',function(err,data){
//        if(err){
//          console.log('err, num is',arr[i],',i is',i)
//          return
//        }
//        console.log(i)
//        arr[i] = arr[i]+1;
//        if (++count === len) {
//          callback(i);
//        }
//      })
//    }(i));
//  }
//}(0, arr.length, 0, function (i) {
//  console.log('cb i is',i)
//  console.log(arr)
//}));


function sync(fn, callback) {
  // Code execution path breaks here.
  setTimeout(function ()　{
    try {
      callback(null,fn())
    }catch (err){
      callback(err);
    }
  }, 0);
}

//var xx = function(){
//  return '333'
//}

try {
  sync(null,function(err,data){
    if(err){
      console.log(err,1)
      return
    }
    console.log('data',data)
  });
} catch (err) {
  console.log('Error: %s', err.message);
}
