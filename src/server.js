require('dotenv').config();

const http = require('http');
const app = require('./app');
const PORT = normalizePort(process.env.PORT || '3000');

function normalizePort(val) {
  const n = parseInt(val, 10);
  if (Number.isNaN(n)) return val;   // named pipe
  if (n >= 0) return n;              // port number
  return 3000;
}
const server = http.createServer(app);
server.keepAliveTimeout = 65_000;  // keep-alive > 60s (common LB idle timeout)
server.headersTimeout   = 66_000;  // must be > keepAliveTimeout
server.requestTimeout   = 600_000; // 10 min cap per request

server.listen(PORT, onListening);
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? addr : `http://localhost:${addr.port}`;
  console.log(`▶ Server listening at ${bind} | PID ${process.pid} | NODE_ENV=${process.env.NODE_ENV || 'development'}`);
}

server.on('error', onError);
function onError(err) {
  if (err.syscall !== 'listen') throw err;
  const bind = typeof PORT === 'string' ? `Pipe ${PORT}` : `Port ${PORT}`;
  switch (err.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw err;
  }
}
//SHUTDOWN
function shutdown(signal) {
  console.log(`${signal} received — closing server…`);
  server.close((err) => {
    if (err) {
      console.error('Error during server close:', err);
      process.exit(1);
    }
    process.exit(0);
  });
}
process.on('SIGINT',  () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

// 9) Last-resort safety logs
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  shutdown('uncaughtException');
});
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
});