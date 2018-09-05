/*
setTimeout(function(){
  console.log('to1')
  new Promise(function(reslove){
    console.log('pro1')
    reslove()
  }).then(function(){
    console.log('then1')
  })
})
setTimeout(function(){
  console.log('to2')
  new Promise(function(reslove){
    console.log('pro2')
    reslove()
  }).then(function(){
    console.log('then2')
  })
})*/

/*console.log('golb1');

setTimeout(function() {
  console.log('timeout1');
  new Promise(function(resolve) {
    console.log('timeout1_promise');
    resolve();
  }).then(function() {
    console.log('timeout1_then')
  })
})

setImmediate(function() {
  console.log('immediate1');
  new Promise(function(resolve) {
    console.log('immediate1_promise');
    resolve();
  }).then(function() {
    console.log('immediate1_then')
  })
})



new Promise(function(resolve) {
  console.log('glob1_promise');
  resolve();
}).then(function() {
  console.log('glob1_then')
})

setTimeout(function() {
  console.log('timeout2');
  new Promise(function(resolve) {
    console.log('timeout2_promise');
    resolve();
  }).then(function() {
    console.log('timeout2_then')
  })
})

new Promise(function(resolve) {
  console.log('glob2_promise');
  resolve();
}).then(function() {
  console.log('glob2_then')
})*/

console.log('golb1');

setTimeout(function() {
  console.log('timeout1');
  process.nextTick(function() {
    console.log('timeout1_nextTick');
  })
  new Promise(function(resolve) {
    console.log('timeout1_promise');
    resolve();
  }).then(function() {
    console.log('timeout1_then')
  })
})

setImmediate(function() {
  console.log('immediate1');
  process.nextTick(function() {
    console.log('immediate1_nextTick');
  })
  new Promise(function(resolve) {
    console.log('immediate1_promise');
    resolve();
  }).then(function() {
    console.log('immediate1_then')
  })
})

process.nextTick(function() {
  console.log('glob1_nextTick');
})
new Promise(function(resolve) {
  console.log('glob1_promise');
  resolve();
}).then(function() {
  console.log('glob1_then')
})

setTimeout(function() {
  console.log('timeout2');
  process.nextTick(function() {
    console.log('timeout2_nextTick');
  })
  new Promise(function(resolve) {
    console.log('timeout2_promise');
    resolve();
  }).then(function() {
    console.log('timeout2_then')
  })
})

process.nextTick(function() {
  console.log('glob2_nextTick');
})
new Promise(function(resolve) {
  console.log('glob2_promise');
  resolve();
}).then(function() {
  console.log('glob2_then')
})

setImmediate(function() {
  console.log('immediate2');
  process.nextTick(function() {
    console.log('immediate2_nextTick');
  })
  new Promise(function(resolve) {
    console.log('immediate2_promise');
    resolve();
  }).then(function() {
    console.log('immediate2_then')
  })
})