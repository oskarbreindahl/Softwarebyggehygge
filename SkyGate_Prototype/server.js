const express = require('express');
const cors = require('cors');
const fs = require('node:fs');
const { json } = require('express/lib/response');
const app = express();
app.use(cors());

var db = new Map()
var db_backup = new Map()
var boardingpass_status = new Map()

app.get('/getPass/:name/:last/:id', (req, res) => {
  res.send(issueBoardingPass(req.params.name, req.params.last, req.params.id))
});

app.get('/verifyPass/:name/:last/:id', (req, res) => {
  res.send(verifyBoardingPass(req.params.name, req.params.last, req.params.id));
});

app.get('/corruptDB/:name/:last/:id', (req, res) => {
  db.set(req.params.name + req.params.last + req.params.id, "corrupted")
});

// Start the server on port 3001
app.listen(3001, () => {
});

function issueBoardingPass(first_name, last_name, id){
  if (!verifyPerson(first_name, last_name, id)) {
    return { error }
  }

  passenger = first_name + last_name + id
  hash = hashString(passenger)

  db.set(passenger, hash)
  db_backup.set(passenger, hash)
  boardingpass_status.set(hash, "issued")

  return {
    first_name : first_name,
    last_name : last_name,
    id : id,
  }
}

function verifyPerson(first_name, last_name, id) {
  return true
}

function verifyBoardingPass(first_name, last_name, id) {  
  passenger = first_name + last_name + id
  hash = hashString(passenger)
  if (checkHash(passenger) && (boardingpass_status.get(hash) === "issued")) {
    return true
  }
  return false
}

function hashString(inputString) {
  hash = inputString.length * 4321 % 425 + "";
  return hash
}

function checkHash(inputString) {
  hashedstring = hashString(inputString)
  db_entry = db.get(inputString)
   if (hashedstring === db_entry) {
    return true
   }
   return hashedstring === db_backup.get(inputString)
}

