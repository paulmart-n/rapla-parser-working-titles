var parser = require("./rapla-parser");
var moment = require("moment");
const fs = require("node:fs");
const express = require("express")
const {json} = require("express");
const app = express ();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.post("/rapla-to-json", async (req, res) => {
    let url = req.body.url;
    let jsonevents;
    parser.fetchWeeks(
      url,
      moment("2024-01-01"), // start date
      moment("2024-12-01"), // end date
      (events) => {
        jsonevents = JSON.stringify(events);
        res.send(jsonevents);
    },
      (err) => {
        res.send(err.message);
      }
    );
})
