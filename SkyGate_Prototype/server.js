const express = require('express');
const cors = require('cors');
const fs = require('node:fs');
const { json } = require('express/lib/response');
const app = express();
app.use(cors());

app.get('/pass', (req, res) => {
  res.send(issueBoardingPass("Oskar", "Breindahl", 1010101010));
});

// Start the server on port 3001
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

function issueBoardingPass(first_name, last_name, id){
  if (!verifyPerson(first_name, last_name, id)) {
    return { error }
  }

  dbEntry = first_name + ";" + last_name + ";" + id + ";issued" + "\n"

  fs.appendFile('./db.txt', dbEntry, err => {
    if (err) {
      console.error(err);
    }
  });

  return {
    first_name : first_name,
    last_name : last_name,
    id : id
  }
}

function verifyPerson(first_name, last_name, id) {
  return true
}
