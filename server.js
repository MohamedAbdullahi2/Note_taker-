const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3001;
const pDir = path.join(__dirname, "/public");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function (req, res) {
  res.sendFile(path.join(pDir, "notes.html"));
});

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
  });
  
  app.get("/api/notes/:id", function (req, res) {
    let sNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(sNotes[Number(req.params.id)]);
  });
  
  app.get("*", function (req, res) {
    res.sendFile(path.join(pDir, "index.html"));
  });
  

  app.post("/api/notes", function (req, res) {
    console.log("I  am in post route");
    let sNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let nNote = req.body;
    let nID = sNotes.length.toString();
    nNote.id = nID;
    sNotes.push(nNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(sNotes));
  console.log("Note saved to db.json. ");
  res.json(sNotes);
});


app.delete("/api/notes/:id", function (req, res) {
  let sNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  const noteId = req.params.id;
  // use Array.filter to remove the note with the matching id
  sNotes = sNotes.filter(note => note.id !== noteId);
  // write the updated notes array back to the db.json file
  fs.writeFileSync("./db/db.json", JSON.stringify(sNotes));
  console.log(`Note with ID ${noteId} deleted from db.json.`);
  res.json(sNotes);
});



app.listen(port, function () {
  console.log(`Server listening on port ${port}. At your service!`);
});
