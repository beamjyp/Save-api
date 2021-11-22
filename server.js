var express = require("express");
var path = require("path");
var serveStatic = require("serve-static");
app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, "/build/app")));
app.use("/:path*", serveStatic(path.join(__dirname, "/build/app")));

const api_version = `/saveomma/v1`;
app.use(api_version, require('./api/portal/api_portal'));

// var port = 3000;
var port = process.env.PORT || 80;
console.log(`server run this port: ${port}`);
app.listen(port);
