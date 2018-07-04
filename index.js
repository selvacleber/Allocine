let axios = require("axios");
const express = require("express");
const app = express();
var mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const uid2 = require("uid2");
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/Wordwrap",
  { useNewUrlParser: true }
);

//let api = "353f743630237bcc2f1a8c9f55f66a92";

app.get("/api/search?", function(req, res) {
  const q = "&query=" + req.query.q;
  const p = "&page=" + req.query.p;
  axios
    .get(
      "https://api.themoviedb.org/3/search/movie?api_key=353f743630237bcc2f1a8c9f55f66a92&language=fr-FR" +
        q +
        p
    )
    .then(function(response) {
      res.json(response.data.results);
    })
    .catch(function(error) {
      console.log(error);
    });
});

app.get("/api/movies/:type", function(req, res) {
  let type = req.params.type;
  const p = "&page=" + req.query.p;
  axios
    .get(
      "https://api.themoviedb.org/3/movie/" +
        type +
        "?api_key=353f743630237bcc2f1a8c9f55f66a92&language=fr-FR" +
        p
    )
    .then(function(response) {
      res.json(response.data.results);
    })
    .catch(function(error) {
      console.log(error);
    });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("server started");
});
