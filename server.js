var connect = require('connect');
var serveStatic = require('serve-static');

connect().use(serveStatic("dist")).listen(9090, function() {
    console.log("Serving...");
});
