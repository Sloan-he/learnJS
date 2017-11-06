var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;



var arr = ['1','2','3','4','5','6','7','8','9','10','11','12']
var arr2 = (function(){
    var arrLen = 1000
    var res = []
    var i = 0
    for(;i < arrLen;i++){
        var id = Math.floor(Math.random()*12+1)
        res[i] = {id:id}
    }
    return res
}())

console.log(arr2.length)


function fun1(){
    return arr.map((view,i) =>{
        return arr2.filter(function(fview){
            return fview.id === view
        })
    })
}

function fun2(){
    var tempObj = {}
    arr2.map(function(view,i){
        if(tempObj[view.id]){
            tempObj[view.id].push(view)
        }else{
            tempObj[view.id] = [view]
        }
    })
    return arr.map(function(view){
        if(tempObj[view]){
            return tempObj[view]
        }
        return []
    })
}


suite.add('fun2', function() {
    fun2()
})
.add('fun1', function() {
    fun1()
})
.on('cycle', function(event) {
    console.log(String(event.target));
})
.on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': true });


