require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({extended: true}))

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

const origURL = [];
const shortURL = [];
app.post('/api/shorturl', function(req, res) {
  const url = req.body.url;
  const urlFound = origURL.indexOf(url)

  if(!url.includes("https://") && !url.includes("http://"))
    return res.json({error: 'invalid url'})
  
  if (urlFound < 0) {
    origURL.push(url)
    shortURL.push(shortURL.length)
    return res.json({original_url: url, short_url: shortURL.length -1})
  }
  
 return res.json({original_url: url, short_url: shortURL[urlFound]});    
});

app.get('/api/shorturl/:shorturl', function(req, res) {
  const shorturl = parseInt(req.params.shorturl)
  const foundIndex = shortURL.indexOf(shorturl)
  console.log(shorturl)
  
  res.redirect(origURL[foundIndex])
  
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
