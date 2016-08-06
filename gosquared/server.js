var express = require('express');
var app = express();

app.use(express.static('./dist'));

app.get('/', function (req, res) {
  res.send('GoSquared Profile Viewer');
});

app.listen(3000, function () {
  console.log('Hanging out on port 3000!');
});
