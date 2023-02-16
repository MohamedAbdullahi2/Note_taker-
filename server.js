const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3001;
const pDir = path.join(__dirname, "/public");

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function (req, res) {
    res.sendFile(path.join(pDir, "notes.html"));
  });
  

  app.listen(port, function () {
    console.log(`Server listening on port ${port}. At your service!`);
  });
  
