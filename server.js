// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Timestamp project START
app.get(
  "/api/timestamp/:date_string?",
  function(req, res, next) {
    req.myUnix = null;
    req.myDate = "Invalid Date";

    console.log("******* start ********", req.params.date_string);

    if (Number(req.params.date_string)) {
      console.log("unix type");
      req.myUnix = Number(req.params.date_string);
    } else if (/\d{4}-\d{2}-\d{2}/.test(req.params.date_string)) {
      console.log("string type");
      req.myUnix = Date.parse(req.params.date_string);
    } else if (typeof req.params.date_string == "undefined") {
      console.log("empty type");
      req.myUnix = Date.now();
    } else {
      console.log("none type");
    }

    if (req.myUnix !== null) {
      req.myDate = new Date(req.myUnix).toUTCString();
      req.myResponse = {
        unix: req.myUnix,
        utc: req.myDate
      };
    } else {
      req.myResponse = { error: "Invalid Date" };
    }

    console.log("unix", req.myUnix);
    console.log("date", req.myDate);

    next();
  },
  function(req, res) {
    res.json(req.myResponse);
  }
// Timestamp project END


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
