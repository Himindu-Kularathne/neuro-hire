var express = require("express");
var cors = require("cors");
var app = express();

// cors
app.use(cors());
// test endpoint


app.get("/", function (req, res) {
    res.send("Hello World!");
    }
);

// start server
app.listen(3000, function () {
    console.log("Server is running on port 3000");
});

