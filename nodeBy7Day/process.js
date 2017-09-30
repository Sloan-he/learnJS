var child_process = require('child_process');

console.log(process.argv[0])

var child = child_process.spawn(process.argv[0], ['child.js' ]);

child.kill('SIGTERM');

console.log('into parent')