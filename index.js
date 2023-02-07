// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// respond to empty date parameter
app.get("/api", (req, res) => {
  return res.json({
    unix: new Date().valueOf(),
    utc: new Date().toUTCString(),
  });
});

// your first API endpoint...
app.get("/api/:date?", function (req, res) {
  const dateString = req.params.date;
  if (/\d{5,}/.test(dateString)) {
    dateInt = parseInt(dateString);
    return res.json({
      unix: dateInt,
      utc: new Date(dateInt).toUTCString(),
    });
  }
  const dateObject = new Date(dateString);
  if (dateObject.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  } else {
    return res.json({
      unix: dateObject.valueOf(),
      utc: dateObject.toUTCString(),
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
