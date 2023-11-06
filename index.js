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


// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' })
})

let randomNumber = Math.floor(Math.random() * (10 - 1 + 1)) + 1
let reqUrl
const urlChecker = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

app.post('/api/shorturl', function (req, res) {
  reqUrl = req.body.url
  if (reqUrl.match(urlChecker)) {
    res.json({ original_url: reqUrl, short_url: randomNumber })
  }
  res.json({ error: 'invalid url' })
})

app.get('/api/shorturl/' + randomNumber, function (req, res) {
  res.redirect(reqUrl)
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`)
})
