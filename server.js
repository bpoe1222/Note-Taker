const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs');
const util = require('util');

const PORT = process.env.PORT || 3004;

fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    var allNotes = JSON.parse(data);
    app.get("/api/notes", function(req, res) {
        
        res.json(allNotes);
    });
    
    app.post("/api/notes", function(req, res) {
        
        let newNote = req.body;
        allNotes.push(newNote);
        newNotes();
        return console.log('New Note Added!')
    });
    
    app.get("/api/notes/:id", function(req,res) {
        
        res.json(allNotes[req.params.id]);
    });
    
    app.get('/notes', function(req,res) {
        res.sendFile(path.join(__dirname, "public/notes.html"));
    });
    
    
    app.get('*', function(req,res) {
        res.sendFile(path.join(__dirname, "public/index.html"));
    });
    
    function newNotes() {
        fs.writeFile("db/db.json",JSON.stringify(allNotes,'\t'),err => {
            if (err) throw err;
            return true;
        });
    }
})

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});  

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

