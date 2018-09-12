/** how to import in nodejs */
const app = require("./app");
const debug = require("debug")("node-angular");
/**
 * Switch to https
 */
const http = require("http");
const fs = require('fs');

/** normalize port make sure a valid number to use
 * at the end creaSever takes a res and a req which is app from express
 * end() end passing responses
 * use Express
 * set() sets configuration
*/
const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};
/** checks what types of error occurs etc */
const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/** Output to the incoming (listening) to the requests */
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};
/** Using a custom domain so this is not needed
var sslOptions = {
  key: fs.readFileSync(__dirname + '/privatekey.pem'),
  cert: fs.readFileSync(__dirname + '/server.crt')
};
*/
const port = normalizePort(process.env.PORT || "3000");
app.set("port", 3000);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
