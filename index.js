require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

let url;
let randomNumber = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
const urlChecker = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/


// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('api/shorturl', (req, res) => {
  url = req.body.url;
  if(url.match(urlChecker)){
    res.json({original_url: url, short_url: randomNumber});
  }
  res.json({ error: 'invalid url' })
})

app.get('api/shorturl/' + randomNumber, (req, res) => {
  res.redirect(url)
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
