import chalk from 'chalk';
import http from 'http';

const port = 8080

console.log(chalk.blue('Starting a local web server on port #%s'), port);

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<h1>Hello Node server!</h1>');
}).listen(port);