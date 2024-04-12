var parser = require("./rapla-parser");
var moment = require("moment");
const fs = require("node:fs");
const express = require("express")
const {json} = require("express");
const app = express ();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3050;

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.post("/rapla", async (req, res) => {
    let url = req.body.url;
    let start = req.body.start;
    let end = req.body.end;
    let jsonevents;
    parser.fetchWeeks(
      url,
      moment(end), // start date
      moment(start), // end date
      (events) => {
        jsonevents = JSON.stringify(events);
        res.send(jsonevents);
    },
      (err) => {
        res.send(err.message);
      }
    );
})
