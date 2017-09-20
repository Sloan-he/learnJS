/**
 * Created by hesy on 2017/9/20.
 */
console.log('module is',module)
console.log('-----------')
console.log('require is',require)
console.log('-----------')
console.log('exports is',exports)


function testModule(){
  console.log('ok')
}


module.exports = testModule

console.log(module)


var change = function (a) {
  a = 100;
  console.log(a); // => 100
};
var a = 10;
change(40);
console.log(a); // => 10