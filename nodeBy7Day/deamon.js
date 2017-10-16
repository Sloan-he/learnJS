var cp = require('child_process');

var worker;


function spawn(server,config){
  console.log(1)
  worker = cp.spawn('node',[server,config])
  worker.on('exit',function(code){
    console.log('code',code)
    if(code !== 0){
      spawn(server,config)
    };
  })
}

function main(argv) {
  spawn('static.js', argv[0]);
  process.on('SIGTERM', function () {
    worker.kill();
    process.exit(0);
  });
}

main(process.argv.slice(2))