/**
 * Created by hesy on 2017/9/29.
 */

var net = require('net')


net.createServer(function (conn) {
  conn.on('data', function (data) {
    conn.write([
      'HTTP/1.1 200 OK',
      'Content-Type: text/plain',
      'Content-Length: 11',
      '',
      'Hello World'
    ].join('\n'));
  });
}).listen(80);

var options = {
  port: 80,
  host: 'www.example.com'
};

var client = net.connect(options, function () {
  client.write([
    'GET / HTTP/1.1',
    'User-Agent: curl/7.26.0',
    'Host: www.baidu.com',
    'Accept: */*',
    '',
    ''
  ].join('\n'));
});

client.on('data', function (data) {
  console.log(44,data.toString());
  client.end();
});