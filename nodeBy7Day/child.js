/**
 * Created by hesy on 2017/9/30.
 */
console.log('子进程执行了')
process.on('SIGTERM', function () {
  console.log('子进程执行了')
  process.exit(0);
});


console.log('into')