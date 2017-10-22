var c= 0
var fibonacci = function (n,t) {
    c++;
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }
    var a = fibonacci(n-1,'a')
    var b = fibonacci(n-2,'b')
    return a+b
};
function dg(num){
    if(num > 0){
        return num + dg(num-1)
    }else{
        return 0
    }
}

if (require.main === module) {
    // 如果是直接执行 main.js，则进入此处
    // 如果 main.js 被其他文件 require，则此处不会执行。
    var n = Number(process.argv[2] || 20);
    console.log('fibonacci(' + n + ') is', fibonacci(n,''));
    console.log('ds('+n+') is',dg(n))
    console.log(c)
}
