var proxy = require("express-http-proxy");
var express = require("express");
var app = express();

app.use(express.static(__dirname));
app.use("/external/alphavantage", proxy("https://www.alphavantage.co"));
app.use("/external/wiki", proxy("https://en.wikipedia.org"));

app.listen(3000, function(error) {
  if (error) {
    console.error('server error: ' + error);
    return;
  }

  console.info('started server on port 3000...');
});